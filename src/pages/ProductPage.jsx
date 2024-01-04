import Card from "../components/Card";
import { useProducts } from "../context/ProductContext";
import Loader from "../components/Loader";

// styles
import styles from "./ProductPage.module.css";

const ProductPage = () => {
    const products = useProducts();
    console.log(products);

    return (
        <div className={styles.container}>
            <div className={styles.products}>
                {!products.length && <Loader />}
                {products.map((p) => (
                    <Card key={p.id} data={p} />
                ))}
            </div>
            <div>Side bar</div>
        </div>
    );
};
export default ProductPage;
