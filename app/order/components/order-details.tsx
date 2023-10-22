"use client";

import { Status } from "@/components/ui/status";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormatPrice } from "@/lib/utils";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdDone, MdLockClock } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { ItemContent } from "./item-content";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className="p-8 m-auto flex flex-col gap-2">
      <h1 className="text-2xl text-slate-900 mt-5 text-center font-semibold mb-5">
        Order Details
      </h1>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Order: </span>
          <span>{order.id}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Amount: </span>
          <span className="font-bold">{FormatPrice(order.amount / 100)}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Payment Status: </span>
          <span className="capitalize">
            {order.status === "pending" ? (
              <Status
                text="Pending"
                icon={MdLockClock}
                className="bg-orange-500 text-white"
              />
            ) : order.status === "complete" ? (
              <Status
                text="Complete"
                icon={MdDone}
                className="bg-green-500 text-white"
              />
            ) : (
              <></>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Delivery Status: </span>
          <span className="capitalize">
            {order.deliveryStatus === "pending" && (
              <Status
                text="Pending"
                icon={MdDone}
                className="bg-orange-700 text-white"
              />
            )}
            {order.deliveryStatus === "dispatched" && (
              <Status
                text="Out for Delivery"
                icon={TbTruckDelivery}
                className="bg-indigo-500 text-white"
              />
            )}
            {order.deliveryStatus === "delivered" && (
              <Status
                text="Delivered"
                icon={MdDone}
                className="bg-green-500 text-white"
              />
            )}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Date:</span>
          <span>{moment(order.createdDate).fromNow()}</span>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Products Ordered</h2>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products &&
              order.products.map((item) => {
                return <ItemContent key={item.id} item={item} />;
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
