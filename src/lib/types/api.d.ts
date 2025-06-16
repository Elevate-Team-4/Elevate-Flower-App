/* eslint-disable @typescript-eslint/no-explicit-any */
declare type SuccessfulResponse<T> = {
    message: 'success';
} & T;

declare type ErrorResponse = {
    error: string;
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
    wishlist: any[]; //todo <= This needs to be edited
    addresses: any[]; //todo <= This needs to be edited
    createdAt: string;
};

declare type LoginResponse = {
    message?: string;
    user:ApplicationUser ;
    token: string;
};
