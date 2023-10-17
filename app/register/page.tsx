import { Container } from "@/components/ui/container";
import { FormWrap } from "@/components/ui/form-wrap";
import { RegisterForm } from "./components/register-form";
import { getCurrentUser } from "@/actions/get-current-user";

export default async function RegisterPage() {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
