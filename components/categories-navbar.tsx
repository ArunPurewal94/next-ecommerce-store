import { getCategories } from "@/actions/get-categories";
import { Category } from "@/components/category";
import { Container } from "@/components/ui/container";

export const CategoriesNavbar = async () => {
  const categories = await getCategories();

  if (!categories) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <Category key={category} label={category} />
        ))}
      </div>
    </Container>
  );
};
