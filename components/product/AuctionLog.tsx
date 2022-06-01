import { FC, useState } from 'react'
import { RiAuctionLine } from 'react-icons/ri'
import Avatar from '../common/Avatar'
import styles from '@/styles/auction.module.css'
import { useAuth } from '@/hooks/useAuth'
import { AuctionProps } from '@/helpers/prototypes'
import TimeAgo from 'timeago-react'
import '@/helpers/prototypes'

interface AuctionLogProps {
    auction: AuctionProps[],
    status: 'active' | 'not-start' | 'end',
    productId: number,
    onOfferMade: (auction: AuctionProps) => void
}

const AuctionLog: FC<AuctionLogProps> = ({ auction, status, productId, onOfferMade }) => {

    const { user } = useAuth()
    const [bid, setBid] = useState<number>(0)

    const [errorAlert, setErrorAlert] = useState<string>()

    const makeOffer = async () => {
        setErrorAlert(undefined)
        const response = await fetch('/auction'.apiRequest(), {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "product": { "id": productId },
                bid,
                "name": user?.name,
                "avatarSrc": user?.avatarSrc
            })
        })
        const data = await response.json()

        if (response.status === 201) {
            onOfferMade(data)
        } else {
            setErrorAlert(data.message)
        }
    }

    return <fieldset className='bg-white p-2 pb-0 bg-light rounded'>
        <legend className='fw-bold'>Bid Logs</legend>
        <ul className={`list-group ${styles.logs}`}>
            {auction.map(item => {
                return <li key={item.id} className='text-capitalize list-group-item d-flex align-items-center'><Avatar src={item.avatarSrc} alt={item.name} /> {item.name} bids - <b>{item.bid}$</b> - <time><TimeAgo
                    datetime={item.createdAt}
                /></time> </li>
            })}
        </ul>
        {status !== 'active' && (
            <div className="alert alert-primary" role="alert">
                Status of this auction: <b className='text-capitalize'>{status}</b>
            </div>
        )}
        {!user && (
            <div className="alert alert-primary" role="alert">
                Please login for join auction.
            </div>
        )}
        {user && status === "active" && (
            <>
                {errorAlert && (
                    <div className="alert alert-warning my-2" role="alert">
                        {errorAlert}
                    </div>
                )}
                <div className="input-group my-2">

                    <span className="input-group-text" id="amount">@</span>
                    <input
                        value={bid}
                        onChange={(e) => setBid(+e.target.value)}
                        type="number" className="form-control" placeholder="Your amount" aria-label="Amount" aria-describedby="amount" />
                    <button
                        onClick={makeOffer}
                        disabled={bid <= 0 ? true : false} title='Send your bid' className="input-group-text" id="amount"><RiAuctionLine /></button>
                </div>
            </>
        )}
    </fieldset>

}

export default AuctionLog