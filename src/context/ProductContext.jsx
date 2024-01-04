import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";

const ProductContext = createContext();

function ProductProvider({ children }) {
    //useState
    const [products, setProducts] = useState([]);

    // useEffect
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await api.get("/products");
                // setProducts(response);
                setProducts(await api.get("/products"));
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
