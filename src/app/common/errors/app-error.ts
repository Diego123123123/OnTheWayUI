export class AppError {
    constructor(public originalError?: any) {}
}

/**
 * 400 Unauthorized
 */
export class BadRequest extends AppError {}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends AppError {
}

/**
 * 404 Not Found
 */
export class NotFoundError extends AppError {}

/**
 * 500 Internal Server
 */
export class InternalServerError extends AppError {}

/**
 * 501 Internal Server
 */
export class NotImplementedError extends AppError {}

/**
 * 550 Permission Denied
 */
export class PermissionDeniedError extends AppError {}
