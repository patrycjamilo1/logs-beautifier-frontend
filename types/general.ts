export interface Pagination<T> {
    page: number;
    limit: number;
    totalRows: number;
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