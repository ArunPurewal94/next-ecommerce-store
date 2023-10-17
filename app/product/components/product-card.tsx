"use client";

import { FormatPrice } from "@/lib/format-price";
import { TruncateText } from "@/lib/truncate-text";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border border-slate-200 bg-slate-50 rounded p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            priority
            fill
            sizes="(max-width: 768px) 100vw"
            className="w-full h-full object-contain"
            src={data.images[0].image}
            alt={data.name}
          />
        </div>
        <div className="mt-4 uppercase">{TruncateText(data.name)}</div>
        <div>{FormatPrice(data.price)}</div>
      </div>
    </div>
  );
};
