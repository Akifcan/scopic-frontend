import { FC, useState, useEffect } from 'react'
import Container from '@/components/common/Container'
import { MdApproval } from 'react-icons/md'
import { useAuth } from '@/hooks/useAuth'

const Settings: FC = () => {

    // Formula: 400 + (400 * 10) / 100

    const [autoBidAmount, setAutoBidAmount] = useState(0)
    const { user, updateUser } = useAuth()

    useEffect(() => {
        if (!user) return
        setAutoBidAmount(user.autoBidAmount)
    }, [user])

    const [currentAlertMessage, setCurrentAlertMessage] = useState<string>()

    useEffect(() => {
        if (autoBidAmount >= 101) {
            setCurrentAlertMessage('Please enter maximum 100%')
            setAutoBidAmount(100)
        }
        if (autoBidAmount < 0) {
            setCurrentAlertMessage('Please do not enter lower than 0%')
            setAutoBidAmount(0)
        }
    }, [autoBidAmount])

    useEffect(() => {
        if (currentAlertMessage) {
            setTimeout(() => {
                setCurrentAlertMessage(undefined)
            }, 3000);
        }
    }, [currentAlertMessage])

    const changeAutoBidAmount = () => {
        updateUser!({ ...user!, autoBidAmount })
        setCurrentAlertMessage('Your automatic bid approved')
    }

    return <Container navigation={[
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'Settings',
        },
    ]}>
        {currentAlertMessage && (
            <div className="alert alert-primary" role="alert">
                {currentAlertMessage}
            </div>
        )}
        <section>
            <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">Automatic Bid Amount</span>
                <input value={autoBidAmount}
                    onChange={(e) => setAutoBidAmount(+e.target.value)}
                    type="number" min={"0"} max="100" className="form-control" placeholder="Your Bid" aria-label="Username" aria-describedby="basic-addon1" />
                <span className="input-group-text" id="basic-addon1">%</span>
                <button onClick={changeAutoBidAmount} type="button" className="btn btn-primary"><MdApproval fontSize={'1.4rem'} /> Approve</button>
            </div>
            <p className='text-success'>This amount will run when you active automatic bid.</p>
        </section>
    </Container>
}

export default Settings 