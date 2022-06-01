import { FC } from 'react'
import { RiAuctionLine } from 'react-icons/ri'
import Avatar from '../common/Avatar'
import styles from '@/styles/auction.module.css'
import { useAuth } from '@/hooks/useAuth'
import { AuctionProps } from '@/helpers/prototypes'
import TimeAgo from 'timeago-react'

interface AuctionLogProps {
    auction: AuctionProps[],
    status: 'active' | 'not-start' | 'end'
}

const AuctionLog: FC<AuctionLogProps> = ({ auction, status }) => {

    const { user } = useAuth()

    return <fieldset className='bg-white p-2 pb-0 bg-light rounded'>
        <legend className='fw-bold'>Bid Logs</legend>
        <ul className={`list-group ${styles.logs}`}>
            {auction.map(item => {
                return <li key={item.id} className='list-group-item d-flex align-items-center'><Avatar src={item.avatarSrc} alt={item.name} /> {item.name} bids - <b>{item.bid}$</b> - <time><TimeAgo
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
            <div className="input-group my-2">
                <span className="input-group-text" id="amount">@</span>
                <input type="number" className="form-control" placeholder="Your amount" aria-label="Amount" aria-describedby="amount" />
                <button title='Send your bid' className="input-group-text" id="amount"><RiAuctionLine /></button>
            </div>
        )}
    </fieldset>

}

export default AuctionLog