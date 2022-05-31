import { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from '@/styles/searchBar.module.css'

const SearchBar: FC = () => {
    return <div className="input-group mb-3">
        <span className="input-group-text" id="search-product"><AiOutlineSearch /></span>
        <input type="text" className="form-control" placeholder="Search by name" aria-label="Search Product" aria-describedby="search-product" />
        <span className="input-group-text" id="basic-addon2">
            <select className={styles.sort}>
                <option selected disabled>Sort by price</option>
                <option>Higher</option>
                <option>Lower</option>
            </select>
        </span>

    </div>

}

export default SearchBar