import Card from "../components/Card";
import { useProducts } from "../context/ProductContext";

import styles from "./ProductPage.module.css";

const ProductPage = () => {
    const products = useProducts();
    console.log(products);

    return (
        <div className={styles.container}>
            <div className={styles.products}>
                {!products.length && <p>loading...</p>}
                {products.map((p) => (
                    <Card key={p.id} data={p} />
                ))}
            </div>
            <div>Side bar</div>
        </div>
    );
};
export default ProductPage;
