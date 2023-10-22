import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
      console.log(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col md:flex-row gap-2 items-center justify-between p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-800 text-slate-800 font-semibold"
        : "border-transparent text-slate-500"
    }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};
