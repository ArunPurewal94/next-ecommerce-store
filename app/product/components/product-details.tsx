"use client";

import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SetQuantity } from "./set-quantity";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./product-image";
import { SetColor } from "./set-color";
import { SetSize } from "./set-size";
import { useCart } from "@/hooks/use-cart";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  selectedImage: SelectedImageType;
  selectedSize: string;
  quantity: number;
  price: number;
};

export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    selectedImage: { ...product.images[0] },
    selectedSize: "",
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 15) {
      return null;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return null;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  const handleColorSelect = useCallback((value: SelectedImageType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImage: value };
    });
  }, []);

  const handleSizeSelect = (size: string) => {
    setCartProduct({
      ...cartProduct,
      selectedSize: size,
    });
  };

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div>
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="mt-3 text-justify">{product.description}</div>
        <Separator />
        <div>
          <span className="font-semibold uppercase">Price:</span> £
          {product.price}
        </div>
        <Separator />
        <div>
          <span className="font-semibold uppercase">Category:</span>{" "}
          {product.category}
        </div>
        <div
          className={`${
            product.inStock ? "text-teal-500" : "text-red-600"
          } font-semibold`}
        >
          {product.inStock ? "In Stock" : "Out Of Stock"}
        </div>
        <Separator />
        <SetSize
          sizes={product.sizes}
          cartProduct={cartProduct}
          handleSizeSelect={handleSizeSelect}
        />

        <Separator />
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Separator />
        <SetQuantity
          cartProduct={cartProduct}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => handleAddProductToCart(cartProduct)}
            className="w-full"
            disabled={!product.inStock}
          >
            Add To Cart
          </Button>
          {isProductInCart && (
            <Button
              variant="outline"
              className="w-full border-teal-400"
              onClick={() => router.push("/cart")}
            >
              View Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
