import { Fragment } from "react";
import { Banner } from "@/components/banner";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/app/product/components/product-card";
import getProducts, { ProductParams } from "@/actions/get-products";
import { AccessDenied } from "@/components/access-denied";

interface HomeProps {
  searchParams: ProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
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
          {products.map((product) => {
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
