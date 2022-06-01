String.prototype.apiRequest = function (): string {
    return process.env.NEXT_PUBLIC_API_HOST! + this
}

export { }