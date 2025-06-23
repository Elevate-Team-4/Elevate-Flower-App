declare type ErrorResponse = {
  error: string;
  code?: string;
  message?: string;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

//^ the user response after a successful login
declare type ApplicationUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo?: string;
  role: string;
  wishlist: string[];
  addresses: string[];
  createdAt: string;
};

declare type LoginResponse = {
  message?: string;
  user: ApplicationUser;
  token: string;
};
declare type DataBaseProbs = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
} & T;

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
