import React from "react";
import Categories1 from "@/registry/section/categories/categories-1/categories";
import Categories2 from "@/registry/section/categories/categories-2/categories";
import Categories3 from "@/registry/section/categories/categories-3/categories";
import Categories4 from "@/registry/section/categories/categories-4/categories";
import Categories5 from "@/registry/section/categories/categories-5/categories";
import Categories6 from "@/registry/section/categories/categories-6/categories";
import Categories7 from "@/registry/section/categories/categories-7/categories";
import CategoriesBento1 from "@/registry/section/categories/categories-bento-1/categories";
function CategoriesPage() {
  return (
    <div className="container mx-auto">
      <Categories1 />
      <Categories2 />
      <Categories3 />
      <Categories4 />
      <Categories5 />
      <Categories6 />
      <Categories7 />
      <CategoriesBento1 />
    </div>
  );
}

export default CategoriesPage;
