import { FC, useState, useEffect } from 'react'
import Container from '@/components/common/Container'
import Pagination from '@/components/common/Pagination'
import ProductCard from '@/components/product/ProductCard'
import SearchBar, { SortType } from '@/components/product/SearchBar'
import '@/helpers/prototypes'
import { PaginationProps, ProductProps } from '@/helpers/prototypes'


const Home: FC = () => {


  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [products, setProducts] = useState<ProductProps[]>()

  const [sort, setSort] = useState<SortType>("ASC")
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    fetch(`/product?keyword=${keyword}&sort=${sort}&page=${currentPage}`.apiRequest())
      .then(res => res.json())
      .then((data: PaginationProps<ProductProps[]>) => {
        setProducts(data.data)
        setTotalPage(data.total)
      })
  }, [currentPage, sort, keyword])


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const onSearch = (keyword: string, sort: SortType) => {
    setCurrentPage(1)
    setKeyword(keyword)
    setSort(sort)
  }

  return <Container>
    <SearchBar onSearch={onSearch} />
    {products && (
      <main className='row' style={{ rowGap: "1rem" }}>
        {products.map(item => {
          return <div key={item.id} className='col-md-3'>
            <ProductCard product={item} />
          </div>
        })}
      </main>
    )}
    <div className='d-flex align-items-center justify-content-center my-5'>
      <Pagination currentPage={currentPage} onPageChange={(page) => {
        setCurrentPage(page)
      }} max={5} totalPage={totalPage} />
    </div>

  </Container>
}

export default Home
