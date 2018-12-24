export interface IComment {
    userImage?: string;
    userName: string;
    commentId: number;
    rating: number;
    date: Date;
    message: string;
}

export interface IAddComment {
    preferenceId: number;
    date: Date;
    message: string;
}

export interface IResponse<T> {
    count: number;
    results: Array<T>;
}