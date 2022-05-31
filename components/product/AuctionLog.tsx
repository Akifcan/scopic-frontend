import { FC } from 'react'
import { RiAuctionLine } from 'react-icons/ri'
import Avatar from '../common/Avatar'
import styles from '@/styles/auction.module.css'
import { useAuth } from '@/hooks/useAuth'

const AuctionLog: FC = () => {

    const { user } = useAuth()

    return <fieldset className='bg-white p-2 pb-0 bg-light rounded'>
        <legend className='fw-bold'>Bid Logs</legend>
        <ul className={`list-group ${styles.logs}`}>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
            <li className='list-group-item d-flex align-items-center'><Avatar src='https://randomuser.me/api/portraits/men/32.jpg' alt='demo' /> Akifcan Kara bids - <b>10$</b> - <time>1 day ago</time> </li>
        </ul>
        {!user && (
            <div className="alert alert-primary" role="alert">
                Please login for join auction.
            </div>
        )}
        {user && (
            <div className="input-group my-2">
                <span className="input-group-text" id="amount">@</span>
                <input type="number" className="form-control" placeholder="Your amount" aria-label="Amount" aria-describedby="amount" />
                <button title='Send your bid' className="input-group-text" id="amount"><RiAuctionLine /></button>
            </div>
        )}
    </fieldset>

}

export default AuctionLog