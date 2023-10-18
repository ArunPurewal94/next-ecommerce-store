import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buff = await buffer(req);
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing Stripe Signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).send("Webhook Error" + error);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: {
            paymentIntentId: charge.payment_intent,
          },
          data: {
            status: "complete",
            address: {
              set: {
                city: charge.shipping?.address.city,
                country: charge.shipping?.address.country,
                line1: charge.shipping?.address.line1,
                line2: charge.shipping?.address.line2,
                post_code: charge.shipping?.address.postal_code,
                state: charge.shipping?.address.state,
              },
            },
          },
        });
      }
      break;

    default:
      console.log("Unhandled event type" + event.type);
  }

  res.json({ received: true });
}
