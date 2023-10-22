import getOrderById from "@/actions/get-order-by-id";
import { Container } from "@/components/ui/container";
import { OrderDetails } from "../components/order-details";
import { AccessDenied } from "@/components/access-denied";

interface OrderPageProps {
  orderId: string;
}

export default async function OrderPage({
  params,
}: {
  params: OrderPageProps;
}) {
  const order = await getOrderById(params);

  if (!order)
    return <AccessDenied title="Oops! Looks there is no Order with that ID." />;

  return (
    <div>
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
