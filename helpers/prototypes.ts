export interface PaginationProps<T> {
    total: number,
    data: T
}

export interface ProductProps {
    id: number,
    description: string,
    endDate: string,
    imageUrl: string,
    name: string,
    price: number,
    startDate: Date,
    status: 'active' | 'not-start' | 'end'
}

export interface AuctionProps {
    id: number,
    bid: number,
    name: string,
    avatarSrc: string,
    createdAt: Date
}

String.prototype.apiRequest = function (): string {
    return process.env.NEXT_PUBLIC_API_HOST! + this
}

export { }