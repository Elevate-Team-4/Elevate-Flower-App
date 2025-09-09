declare type SearchParamOcassion = {
  name?: string;
  slug?: string;
  image?: string;
  isSuperAdmin?: boolean;
  productsCount?: number;
} & CommonSearchParams;
import { occasion } from "./occasions.d";
// Single occasion
export type occasion = {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
} & DataBaseProbs;

// array of occasion
export type occasions = {
  occasions: occasion[];
};

// Ocassions Search Param Type
declare type SearchParamOcassion = {
  name?: string;
  slug?: string;
  image?: string;
  isSuperAdmin?: boolean;
  productsCount?: number;
} & CommonSearchParams;
