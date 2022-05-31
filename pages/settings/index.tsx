import { FC } from 'react'
import Container from '@/components/common/Container'

const Settings: FC = () => {
    return <Container navigation={[
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'Settings',
        },
    ]}>
    </Container>
}

export default Settings 