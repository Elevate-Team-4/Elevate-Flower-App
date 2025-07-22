declare type DataBaseProbs = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
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

declare type ErrorResponse = {
  error: string;
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

declare type CommonSearchParams = {
  // ! Pagination and projection
  limit?: number; // Number of items per page (for pagination)
  page?: number; // Current page number (for pagination)
  sort?: string; // Sorting criteria, e.g., 'price,-title'
  fields?: string; // Comma-separated list of fields to include in the response
  keyword?: string; // Search keyword for full-text search
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
