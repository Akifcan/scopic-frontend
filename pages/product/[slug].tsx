import { FC, useEffect, useState, useRef, useId } from 'react'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product/ProductCard'
import AuctionLog from '@/components/product/AuctionLog'
import { useRouter } from 'next/router'
import { AuctionProps, ProductProps } from '@/helpers/prototypes'
import '@/helpers/prototypes'
import { BsFillTrashFill } from 'react-icons/bs';
import { useAuth } from '@/hooks/useAuth'
import CountdownCard from '@/components/product/CountdownCard'
import { RiVoiceprintFill } from 'react-icons/ri'

const ProductDetail: FC = () => {

    const router = useRouter()
    const [product, setProduct] = useState<ProductProps>()
    const [auction, setAuction] = useState<AuctionProps[]>([])
    const [notificationActive, setNotificationActive] = useState(false)
    const [isAutoBidEnable, setAutobidEnable] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const id = useId()

    const [countdown, setCountdown] = useState<{
        day: number,
        hour: number,
        minute: number,
        second: number
    }>()

    const { user, socket } = useAuth()

    const handleSocket = (roomId: number) => {
        if (!socket) return
        socket.emit('join', roomId)

        socket.on('newBid', (data: AuctionProps) => {
            setAuction(prev => [data, ...prev])
            buttonRef.current?.click()
        })
    }

    useEffect(() => {
        if (!product) return
        handleSocket(product!.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, router.asPath])

    useEffect(() => {
        if (!product) return
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const endDate = new Date(product.endDate).getTime()
            const distance = endDate - now
            if (distance === 0) {
                setProduct({ ...product, status: 'end' })
                setCountdown(undefined)
                clearInterval(interval)
                return
            }
            setCountdown({
                day: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                second: Math.floor((distance % (1000 * 60)) / 1000)
            })
        }, 1000)
    }, [product])

    const onOfferMade = (auction: AuctionProps) => {
        setAuction(prev => [auction, ...prev])
        socket?.emit('bid', auction)
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

    const deleteProduct = async () => {
        if (!product) return
        if (!user) return
        const response = await fetch(`/product/${product.id}`.apiRequest(), { method: 'DELETE', headers: { 'role': user.role } })
        if (response.status === 200) {
            router.push('/')
        }
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
                <audio key={id} src='/notification.mp3' controls ref={audioRef} hidden />
                <div className='col-md-6'>
                    {user?.role === 'admin' && (
                        <>
                            <div className="modal fade" id="approveDeleteModal" tabIndex={-1} aria-labelledby="Approve Delete" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="approveDeleteModal">Delete this product</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, back</button>
                                            <button onClick={deleteProduct} type="button" data-bs-dismiss="modal" className="btn btn-primary">Yes. Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-danger mb-2' data-bs-toggle="modal" data-bs-target="#approveDeleteModal">
                                <BsFillTrashFill />
                            </button>
                        </>
                    )}
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
                    <button className='btn btn-primary text-white' ref={buttonRef} onClick={(e) => {
                        if (e.isTrusted) {
                            setNotificationActive(prev => !prev)
                        }
                        audioRef.current?.play()
                    }}>
                        <RiVoiceprintFill /> &nbsp;
                        {notificationActive ? "Close" : "Open"} Notification Sound
                    </button>
                    {isAutoBidEnable && (
                        <div className="alert alert-primary my-4" role="alert">
                            Auto Bid Active
                        </div>
                    )}
                    {countdown && product.status === 'active' && (
                        <div className='d-flex my-3 flex-wrap' style={{ gap: "1rem" }}>
                            <CountdownCard duration={countdown.day} label='day' />
                            <CountdownCard duration={countdown.hour} label='hour' />
                            <CountdownCard duration={countdown.minute} label='minute' />
                            <CountdownCard duration={countdown.second} label='second' />
                        </div>
                    )}
                    <AuctionLog onOfferMade={onOfferMade} productId={product.id} status={product.status} auction={auction} />
                    <div className="form-check bg-white px-5 py-3">
                        <input
                            onChange={(e) => {
                                setAutobidEnable(e.target.checked)
                            }}
                            className="form-check-input" type="checkbox" value="" id="enableAutoBid" />
                        <label className="form-check-label" htmlFor="enableAutoBid">
                            Enable Auto Bid <b>{user?.autoBidAmount}%</b>
                        </label>
                    </div>
                </div>
            </div>
        )}
    </Container >
}

export default ProductDetail