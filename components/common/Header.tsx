import { FC, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const Header: FC = () => {

    const { user } = useAuth()

    useEffect(() => {
        console.log(user);
    }, [user])



    return <nav className="navbar navbar-expand-lg navbar-light bg-light container">
        <div className="container-fluid">
            <Link passHref={true} href='/'>
                <a className="navbar-brand" href="#">Auction</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link passHref={true} href='/'>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </Link>
                    {!user && (
                        <Link passHref={true} href='/sign-in'>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign In</a>
                            </li>
                        </Link>
                    )}
                    {user && (
                        <Link passHref={true} href='/settings'>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Settings</a>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    </nav>
}

export default Header
