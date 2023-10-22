import { Container } from "@/components/ui/container";
import { ProductDetails } from "../components/product-details";
import getProductById from "@/actions/get-product-by-id";
import { AccessDenied } from "@/components/access-denied";

interface ProductPageParams {
  productId: string;
}

export default async function ProductPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const product = await getProductById(params);

  if (!product) {
    return <AccessDenied title="No product found.." />;
  }

  return (
    <div className="m-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
}
