export type TApiResponseMeta = {
    requestId: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    url: string
    timestamp: string
    ip?: 'string'
    rate_limit?: {
        limit: number
        remaining: number
    }
    additional?: unknown
}
export type TApiResponseError = {
    code: string
    title: string
    detail: string
    source?: {
        pointer?: string
        parameter?: string
    }
    trace?: object | null
}
export type TApiResponse = {
    meta: TApiResponseMeta | null
    errors: TApiResponseError[] | null
    data: unknown
}
