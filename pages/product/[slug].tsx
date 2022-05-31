import { FC } from 'react'
import Avatar from '@/components/common/Avatar'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product/ProductCard'
import { RiAuctionLine } from 'react-icons/ri'
import AuctionLog from '@/components/product/AuctionLog'

const ProductDetail: FC = () => {
    return <Container navigation={[{ label: 'Home', href: '/' }, { label: 'Product Name' }]}>
        <div className='row'>
            <div className='col-md-6'>
                <ProductCard height={500} />
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
    </Container>
}

export default ProductDetail