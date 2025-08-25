"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { getAllCategories } from "@/app/[locale]/dashboard/categories/_apis/all-categories";
import { Categories } from "@/lib/types/category";

type CategoryContextType = {
  searchCategoryList: Categories[];
  setSearchCategoryList: React.Dispatch<React.SetStateAction<Categories[]>>;
  searchCategory: (searchValue: string) => Promise<Categories[]>;
  searchValue: string | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  // state
  const [searchCategoryList, setSearchCategoryList] = useState<Categories[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  // functions
  async function searchCategory(searchValue: string): Promise<Categories[]> {
    const payload = await getAllCategories();

    const filteredCategories = payload.categories.filter((category) =>
      category.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSearchCategoryList(filteredCategories || []);

    return filteredCategories || [];
  }

  return (
    <CategoryContext.Provider
      value={{
        searchCategoryList,
        setSearchCategoryList,
        searchCategory,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useContextContext must be used within an Category Provider");
  }
  return context;
};
