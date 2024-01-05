import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

// styles
import styles from "./ProductPage.module.css";

// helpers
import {
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

    return (
        <>
            {/* Search box */}
            <SearchBox
                search={search}
                setSearch={setSearch}
                setQuery={setQuery}
            />

            {/* Content */}
            <div className={styles.container}>
                <div className={styles.products}>
                    {!displayed.length && <Loader />}
                    {displayed.map((p) => (
                        <Card key={p.id} data={p} />
                    ))}
                </div>

                {/* Sidebar */}
                <Sidebar setQuery={setQuery} />
            </div>
        </>
    );
};
export default ProductPage;
