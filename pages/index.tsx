import { FC, useState } from 'react'
import Container from '@/components/common/Container'
import Pagination from '@/components/common/Pagination'
import ProductCard from '@/components/product/ProductCard'

const Home: FC = () => {

  const [currentPage, setCurrentPage] = useState(6)


  return <Container>
    <ProductCard /> <br />
    <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} max={5} totalPage={50} />
  </Container>
}

export default Home
