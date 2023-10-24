import { Container } from "@/components/ui/container";
import { FormWrap } from "@/components/ui/form-wrap";
import { getCurrentUser } from "@/actions/get-current-user";
import { AccessDenied } from "@/components/access-denied";
import { EditProductForm } from "../components/edit-product-form";
import getProductById from "@/actions/get-product-by-id";

interface ProductPageParams {
  productId: string;
}

export default async function EditProductsPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const currentUser = await getCurrentUser();
  const products = await getProductById(params);

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccessDenied title="Oops! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
