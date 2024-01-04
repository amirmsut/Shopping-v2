import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";

// styles
import styles from "./ProductPage.module.css";
import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";

// helpers
import {
    createQueryObject,
    filterProducts,
    getInitialQuery,
    searchProducts,
} from "../helpers/helper";

const ProductPage = () => {
    const products = useProducts();

    const [search, setSearch] = useState("");
    const [displayed, setDisplayed] = useState([]);
    const [query, setQuery] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setDisplayed(products);
        setQuery(getInitialQuery(searchParams));
    }, [products]);

    useEffect(() => {
        setSearchParams(query);
        setSearch(query.search || "");
        let finalProducts = searchProducts(products, query.search);
        finalProducts = filterProducts(finalProducts, query.category);
        setDisplayed(finalProducts);
    }, [query]);

    const searchHandler = () => {
        setQuery((query) => createQueryObject(query, { search: search }));
    };

    const categoryHandler = (e) => {
        const { tagName } = e.target;
        const category = e.target.innerText.toLowerCase();
        if (tagName !== "LI") return;
        setQuery((query) => createQueryObject(query, { category: category }));
    };
    return (
        <>
            {/* Search box */}
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value.toLowerCase().trim())
                    }
                />
                <button onClick={searchHandler}>
                    <ImSearch />
                </button>
            </div>

            {/* Content */}
            <div className={styles.container}>
                <div className={styles.products}>
                    {!displayed.length && <Loader />}
                    {displayed.map((p) => (
                        <Card key={p.id} data={p} />
                    ))}
                </div>

                {/* Sidebar */}
                <div>
                    <div>
                        <FaListUl />
                        <p>Categories</p>
                    </div>
                    <ul onClick={categoryHandler}>
                        <li>All</li>
                        <li>Electronics</li>
                        <li>Jewelery</li>
                        <li>Men's Clothing</li>
                        <li>Women's Clothing</li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default ProductPage;
