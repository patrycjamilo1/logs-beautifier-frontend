export interface Pagination<T> {
    skip: number;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: T;
}

export interface LogsModel {
    _id: string;
    level: string;
    type: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}