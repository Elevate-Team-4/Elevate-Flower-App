// All categories response type
export type AllCategory = {
  categories: Categories[];
};

type Categories = {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: true;
  productsCount: number;
} & DataBaseProbs;
