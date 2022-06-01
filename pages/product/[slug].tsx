import { FC, useEffect, useState } from 'react'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product/ProductCard'
import AuctionLog from '@/components/product/AuctionLog'
import { useRouter } from 'next/router'
import { ProductProps } from '@/helpers/prototypes'
import '@/helpers/prototypes'


const ProductDetail: FC = () => {

    const router = useRouter()
    const [product, setProduct] = useState<ProductProps>()

    useEffect(() => {
        if (!router.query.slug) return
        fetch(`/product/${router.query.slug}`.apiRequest())
            .then(res => res.json())
            .then((data: ProductProps) => {
                setProduct(data)
            })
    }, [router])

    return <Container navigation={[{ label: 'Home', href: '/' }, { label: product ? product.name : 'Loading' }]}>
        {product && (
            <div className='row'>
                <div className='col-md-6'>
                    <ProductCard product={product} height={500} />
                </div>
                <div className='col-md-6'>
                    <div className="alert alert-primary" role="alert">
                        This Auction Not Start Yet
                    </div>
                    <div className="alert alert-light pb-0" role="alert">
                        <p>Start Date: <time className='fw-bold'>31/05/2022</time></p>
                        <p>End Date: <time className='fw-bold'>31/06/2022</time></p>
                    </div>
                    <AuctionLog />
                </div>
            </div>
        )}
    </Container>
}

export default ProductDetail