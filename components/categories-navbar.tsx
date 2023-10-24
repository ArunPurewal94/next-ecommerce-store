import { getCategories } from "@/actions/get-categories";
import { Category } from "@/components/category";
import { Container } from "@/components/ui/container";

interface CategoriesNavbarProps {}

export const CategoriesNavbar = async ({}: CategoriesNavbarProps) => {
  const categories = await getCategories();

  if (!categories) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-evenly overflow-x-auto">
        {categories.map((category) => (
          <Category key={category} label={category} />
        ))}
      </div>
    </Container>
  );
};
