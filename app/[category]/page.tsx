import { Fragment } from "react";
import { Banner } from "@/components/banner";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/app/product/components/product-card";
import getProducts from "@/actions/get-products";
import { AccessDenied } from "@/components/access-denied";
import { useSearchParams } from "next/dist/client/components/navigation";

export default async function Home() {
  const searchParams = useSearchParams(); // needs to be in a client component but can't use getProducts in client component only server component
  const category = searchParams?.get("category") as string;

  const products = await getProducts({
    cateogry: category === "All" ? null : category,
  });

  const productsFiltered = products.filter((product) => {
    if (category === "All") {
      return product;
    } else {
      return product.category === category;
    }
  });

  if (productsFiltered.length === 0) {
    return (
      <AccessDenied title="No products found...Click all to clear filters." />
    );
  }

  return (
    <div>
      <Container>
        <div>
          <Banner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 m-8">
          {productsFiltered.map((product) => {
            return (
              <Fragment key={product.id}>
                <ProductCard data={product} />
              </Fragment>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
