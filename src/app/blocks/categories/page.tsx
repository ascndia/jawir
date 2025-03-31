import React from "react";
import Categories1 from "@/registry/section/categories/categories-1/categories";
import Categories2 from "@/registry/section/categories/categories-2/categories";
import Categories3 from "@/registry/section/categories/categories-3/categories";
import Categories4 from "@/registry/section/categories/categories-4/categories";
import Categories5 from "@/registry/section/categories/categories-5/categories";
import Categories6 from "@/registry/section/categories/categories-6/categories";
import Categories7 from "@/registry/section/categories/categories-7/categories";
import Categories8 from "@/registry/section/categories/categories-8/categories";
import CategoriesBento1 from "@/registry/section/categories/categories-bento-1/categories";
import CategoriesPill1 from "@/registry/section/categories/categories-pill-1/categories";
import CategoriesPill2 from "@/registry/section/categories/categories-pill-2/categories";
import CategoriesImage1 from "@/registry/section/categories/categories-image-1/categories";
import CategoriesImage2 from "@/registry/section/categories/categories-image-2/categories";
import CategoriesCarousel1 from "@/registry/section/categories/categories-carousel-1/categories";
import CategoriesCarousel2 from "@/registry/section/categories/categories-carousel-2/categories";
import Categories9 from "@/registry/section/categories/categories-9/categories";
function CategoriesPage() {
  return (
    <div className="container mx-auto">
      <CategoriesPill1 />
      <CategoriesPill2 />
      <CategoriesCarousel1/>
      <CategoriesCarousel2/>
      <CategoriesImage1/>
      <CategoriesImage2/>
      <Categories1 />
      <Categories2 />
      <Categories3 />
      <Categories4 />
      <Categories5 />
      <Categories6 />
      <Categories7 />
      <Categories8 />
      <Categories9/>
      <CategoriesBento1 />
    </div>
  );
}

export default CategoriesPage;
