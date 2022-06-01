import { FC, useEffect, useState } from 'react'

interface PaginationProps {
    currentPage: number,
    max: number,
    totalPage: number,
    onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ currentPage, max, totalPage, onPageChange }) => {

    const [next, setNext] = useState<number[]>([])
    const [prev, setPrev] = useState<number[]>([])

    useEffect(() => {

        const nextArray = []
        const prevArray = []

        const totalPageArray = Array.from({ length: totalPage }, (_, i) => i)

        for (let i = 0; i < max; i++) {
            if (totalPageArray[currentPage + i]) {
                nextArray.push(totalPageArray[currentPage + i]);
            }
        }
        for (let i = 1; i < max; i++) {
            if (totalPageArray[currentPage - i]) {
                prevArray.push(totalPageArray[currentPage - i]);
            }
        }

        setNext(nextArray);
        setPrev(prevArray.reverse())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPage, currentPage])

    const prevPage = () => {
        if (currentPage <= 1) return
        onPageChange(currentPage - 1)
    }

    const nextPage = () => {
        if (currentPage >= totalPage) return
        onPageChange(currentPage + 1)
    }

    return <nav aria-label={`Change page. Current Page Is: ${currentPage}. Total page is ${totalPage}`}>
        <ul className="pagination">
            <li onClick={prevPage} className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><a className="page-link" href="#">Previous</a></li>
            {prev.map(item => {
                return <li onClick={() => onPageChange(item)} key={item} className="page-item"><a className="page-link" href="#">{item}</a></li>
            })}
            <li className="page-item active"><a className="page-link" href="#">{currentPage}</a></li>
            {next.map(item => {
                return <li key={item} onClick={() => onPageChange(item + 1)} className="page-item"><a className="page-link" href="#">{item + 1}</a></li>
            })}
            <li onClick={nextPage} className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}><a className="page-link" href="#">Next</a></li>
        </ul>
    </nav>
}

export default Pagination
