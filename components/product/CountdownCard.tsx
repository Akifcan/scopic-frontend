import { FC } from 'react'

interface CountdownCardProps {
    duration: number
    label: 'day' | 'hour' | 'minute' | 'second'
}

const CountdownCard: FC<CountdownCardProps> = ({ duration, label }) => {
    return <div className='p-3 bg-primary text-light text-center rounded flex-fill'>
        <p>{duration}</p>
        <p>{label}</p>
    </div>
}

export default CountdownCard