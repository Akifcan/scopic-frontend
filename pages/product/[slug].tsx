import { FC, useEffect, useState } from 'react'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product/ProductCard'
import AuctionLog from '@/components/product/AuctionLog'
import { useRouter } from 'next/router'
import { AuctionProps, ProductProps } from '@/helpers/prototypes'
import '@/helpers/prototypes'

const ProductDetail: FC = () => {

    const router = useRouter()
    const [product, setProduct] = useState<ProductProps>()
    const [auction, setAuction] = useState<AuctionProps[]>([])

    const onOfferMade = (auction: AuctionProps) => {
        setAuction(prev => [...prev, auction])
    }

    const loadProductDetails = () => {
        fetch(`/product/${router.query.slug}`.apiRequest())
            .then(res => res.json())
            .then((data: ProductProps) => {
                setProduct(data)
            })
    }

    const loadAuctionDetails = () => {
        fetch(`/auction/${router.query.slug}`.apiRequest())
            .then(res => res.json())
            .then((data: AuctionProps[]) => {
                setAuction(data)
            })
    }

    useEffect(() => {
        if (!router.query.slug) return
        loadProductDetails()
        loadAuctionDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    return <Container navigation={[{ label: 'Home', href: '/' }, { label: product ? product.name : 'Loading' }]}>
        {product && auction && (
            <div className='row'>
                <div className='col-md-6'>
                    <ProductCard product={product} height={500} />
                </div>
                <div className='col-md-6'>
                    <div className="alert alert-primary" role="alert">
                        This Auction is: <b className='text-capitalize'>{product.status}</b>
                    </div>
                    <div className="alert alert-light pb-0" role="alert">
                        <p>Start Date: <time className='fw-bold'>{new Date(product.startDate).toLocaleString()}</time></p>
                        <p>End Date: <time className='fw-bold'>{new Date(product.endDate).toLocaleString()}</time></p>
                    </div>
                    <AuctionLog onOfferMade={onOfferMade} productId={product.id} status={product.status} auction={auction} />
                </div>
            </div>
        )}
    </Container>
}

export default ProductDetail