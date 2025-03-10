export const errorMessage = {
    UNEXPECTED_ERROR: {
        code: 500,
        title: 'Unexpected Error',
        detail: 'An unexpected error occurred. Please try again later.'
    },
    NETWORK_ERROR: {
        code: 503,
        title: 'Network Error',
        detail: 'Unable to connect to the server. Please check your internet connection.'
    },
    NOT_FOUND: {
        code: 404,
        title: 'Not Found',
        detail: (entity: string) => `${entity} not found.`
    },
    UNAUTHORIZED: {
        code: 401,
        title: 'Unauthorized',
        detail: 'You do not have permission to perform this action.'
    },
    FORBIDDEN: {
        code: 403,
        title: 'Forbidden',
        detail: 'Access to this resource is restricted.'
    },
    VALIDATION_ERROR: {
        code: 422,
        title: 'Validation Error',
        detail: (entity: string) =>
            `${entity} field is invalid. Please check your input and try again.`
    },
    SERVER_ERROR: {
        code: 500,
        title: 'Server Error',
        detail: 'The server encountered an error. Please try again later.'
    },
    TIMEOUT_ERROR: {
        code: 408,
        title: 'Timeout Error',
        detail: 'The request took too long to respond. Please try again.'
    },
    DUPLICATE_ENTRY: {
        code: 409,
        title: 'Duplicate Entry',
        detail: (entity: string) => `${entity} already exists.`
    },
    BAD_REQUEST: {
        code: 400,
        title: 'Bad Request',
        detail: 'The request was invalid. Please check your input and try again.'
    }
}
