import { Container } from "@/components/ui/container";
import { FormWrap } from "@/components/ui/form-wrap";
import { getCurrentUser } from "@/actions/get-current-user";
import { AccessDenied } from "@/components/access-denied";
import { EditProductForm } from "./components/edit-product-form";

export default async function AddProductsPage() {
  const currentUser = await getCurrentUser();

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
