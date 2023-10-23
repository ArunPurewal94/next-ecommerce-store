"use client";

import { Product } from "@prisma/client";
import { FormatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebase from "@/lib/firebase";
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

interface ManageProductClientProps {
  products: Product[];
}

export const ManageProductClient: React.FC<ManageProductClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebase);

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          toast.success("Product status changed");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error);
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Deleting Product. Please wait...");
      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
              console.log("Image Deleted", item.image);
            }
          }
        } catch (error) {
          return console.log(error);
        }
      };

      await handleImageDelete();

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success("Product Deleted!");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error);
        });
    },
    [storage, router]
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl text-slate-900 mb-5 text-center font-semibold">
        Manage Products
      </h1>
      <Table>
        <TableCaption className="text-center lg:text-right "></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price (GBP)</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Sizes</TableHead>
            <TableHead className="text-center">In Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{FormatPrice(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-center">
                {product.sizes.join(", ")}
              </TableCell>
              <TableCell>
                {product.inStock ? (
                  <Status
                    text="In Stock"
                    icon={MdDone}
                    className="bg-green-500 text-white"
                  />
                ) : (
                  <Status
                    text="Out of Stock"
                    icon={MdClose}
                    className="bg-rose-500 text-white"
                  />
                )}
              </TableCell>
              <TableCell className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => handleToggleStock(product.id, product.inStock)}
                  variant="outline"
                  size="icon"
                >
                  <MdCached />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id, product.images)}
                  variant="outline"
                  size="icon"
                >
                  <MdDelete />
                </Button>
                <Button
                  onClick={() => router.push(`/product/${product.id}`)}
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
