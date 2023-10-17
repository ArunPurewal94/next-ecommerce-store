"use client";

import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ItemContent } from "./item-content";
import { FormatPrice } from "@/lib/format-price";
import { useRouter } from "next/navigation";

export const CartClient = () => {
  const { cartProducts, clearWholeCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-5">Your cart is empty!</h1>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-2 hover:text-slate-900 transition mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-slate-900 mt-5 text-center font-semibold">
        Your Shopping Cart
      </h1>
      <div className="mt-5">
        <Table>
          <TableCaption className="text-center lg:text-right text-xl font-semibold">
            Subtotal: {FormatPrice(cartTotalAmount)}
          </TableCaption>
          <TableCaption className="text-center lg:text-right ">
            Delivery Fees if any will be calculated at checkout
          </TableCaption>
          <TableCaption className="text-center lg:text-right ">
            <Link className="hover:underline" href={"/"}>
              Continue Shopping?
            </Link>
          </TableCaption>
          <TableCaption className="text-right">
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full lg:w-1/3"
            >
              Checkout
            </Button>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartProducts &&
              cartProducts.map((item) => (
                <ItemContent
                  key={item.selectedImage.color + item.name}
                  item={item}
                />
              ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <Button
                  onClick={clearWholeCart}
                  variant="outline"
                  className="flex items-center text-red-600 font-bold gap-1 w-full"
                >
                  <span className="hidden md:flex">
                    <BsTrash />
                  </span>
                  <span className="text-center">Clear Cart</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
