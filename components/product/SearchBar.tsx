import { FC, useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from '@/styles/searchBar.module.css'
import debounce from '@/hooks/debounce'

export type SortType = 'ASC' | 'DESC' | ''

interface SearchBarProps {
    onSearch: (keyword: string, sort: SortType) => void
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        debounce(() => onSearch(search, ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return <div className="input-group mb-3 mt-2">
        <span className="input-group-text" id="search-product"><AiOutlineSearch /></span>
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search by name"
            aria-label="Search Product"
            aria-describedby="search-product" />
        <span className="input-group-text" id="basic-addon2">
            <select className={styles.sort} onChange={(e) => onSearch(search, e.target.value as SortType)}>
                <option value={'ASC'}>Sort by price</option>
                <option value={'DESC'}>Higher</option>
                <option value={'ASC'}>Lower</option>
            </select>
        </span>

    </div>

}

export default SearchBar