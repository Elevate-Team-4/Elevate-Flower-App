declare type DataBaseProbs = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare type ErrorResponse = {
  error: string;
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
