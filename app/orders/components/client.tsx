"use client";

import { Order, User } from "@prisma/client";
import { FormatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdDone, MdRemoveRedEye } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { HiMiniClock } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Status } from "@/components/ui/status";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

interface OrderClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

export const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  const router = useRouter();

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-5 text-center font-semibold">Your Orders</h1>
      <Table>
        <TableCaption className="text-center lg:text-right "></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount (GBP)</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{FormatPrice(order.amount / 100)}</TableCell>
              <TableCell className="capitalize">
                {order.status === "pending" && (
                  <Status
                    text="Pending"
                    icon={HiMiniClock}
                    className="bg-orange-500 text-white"
                  />
                )}
                {order.status === "complete" && (
                  <Status
                    text="Complete"
                    icon={MdDone}
                    className="bg-green-500 text-white"
                  />
                )}
              </TableCell>
              <TableCell>{moment(order.createdDate).fromNow()}</TableCell>
              <TableCell>
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
              </TableCell>

              <TableCell className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => {
                    router.push(`/order/${order.id}`);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <MdRemoveRedEye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
