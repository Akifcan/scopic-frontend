import { FC, useState } from 'react'
import Container from '@/components/common/Container'
import Pagination from '@/components/common/Pagination'
import ProductCard from '@/components/product/ProductCard'
import SearchBar, { SortType } from '@/components/product/SearchBar'

const Home: FC = () => {

  const [currentPage, setCurrentPage] = useState(6)

  const onSearch = (keyword: string) => {
    console.log(keyword);
  }

  return <Container>
    <SearchBar onSearch={onSearch} />
    <main className='row' style={{ rowGap: "1rem" }}>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
      <div className='col-md-3'>
        <ProductCard />
      </div>
    </main>
    <div className='d-flex align-items-center justify-content-center my-5'>
      <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} max={5} totalPage={50} />
    </div>
  </Container>
}

export default Home
