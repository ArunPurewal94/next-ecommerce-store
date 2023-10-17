import { Container } from "@/components/ui/container";
import { ProductDetails } from "../components/product-details";
import { products } from "@/lib/products";

interface ProductPageProps {
  productId: string;
}

export default function ProductPage({ params }: { params: ProductPageProps }) {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div className="m-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
}
