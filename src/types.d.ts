export interface AuthRequest extends Request {
    user: {
        id: number;
    };
}

export interface Student {
    token: string,

    barcode: number,
    name: string,
    surname: string,

    group: {
        name: string
    }
}

export interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}