/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import styles from '@/styles/avatar.module.css'

interface AvatarProps {
    src: string
    alt: string
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
    return <div className={styles.avatar}>
        <img src={src} alt={alt} />
    </div>
}

export default Avatar