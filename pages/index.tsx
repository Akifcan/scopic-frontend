import { FC, useState, useEffect } from 'react'
import Container from '@/components/common/Container'
import Pagination from '@/components/common/Pagination'
import ProductCard from '@/components/product/ProductCard'
import SearchBar, { SortType } from '@/components/product/SearchBar'
import '@/helpers/prototypes'
import useSWR, { useSWRConfig } from 'swr'
import fetcher from '@/helpers/fetcher'
import { PaginationProps, ProductProps } from '@/helpers/prototypes'


const Home: FC = () => {

  const { mutate } = useSWRConfig()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState<number>()


  const { data } = useSWR<PaginationProps<ProductProps[]>>(`/product?page=${currentPage}`.apiRequest(), fetcher)


  useEffect(() => {
    if (!data) return
    if (!totalPage) {
      setTotalPage(data.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSearch = (keyword: string) => {
    console.log(keyword);
  }

  return <Container>
    <SearchBar onSearch={onSearch} />
    {data && (
      <>
        <main className='row' style={{ rowGap: "1rem" }}>
          {data.data.map(item => {
            return <div key={item.id} className='col-md-3'>
              <ProductCard product={item} />
            </div>
          })}
        </main>
        {totalPage && (
          <div className='d-flex align-items-center justify-content-center my-5'>
            <Pagination currentPage={currentPage} onPageChange={(page) => {
              setCurrentPage(page)
              mutate(`/product?page=${currentPage}`.apiRequest());
            }} max={5} totalPage={totalPage + 1} />
          </div>
        )}
      </>
    )}
  </Container>
}

export default Home
