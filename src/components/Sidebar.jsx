import { createQueryObject } from "../helpers/helper";
import { FaListUl } from "react-icons/fa";

//  styles
import styles from "./Sidebar.module.css";

// categories
// const categories = [
//     { id: 1, type: "All" },
//     { id: 2, type: "Electronics" },
//     { id: 3, type: "Jewelery" },
//     { id: 4, type: "Men's Clothing" },
//     { id: 5, type: "Women's Clothing" },
// ];
import { categories } from "../constants/list";

function Sidebar({ query, setQuery }) {
    const categoryHandler = (e) => {
        const { tagName } = e.target;
        const category = e.target.innerText.toLowerCase();
        if (tagName !== "LI") return;
        setQuery((query) => createQueryObject(query, { category: category }));
    };
    return (
        <div className={styles.sidebar}>
            <div>
                <FaListUl />
                <p>Categories</p>
            </div>
            <ul onClick={categoryHandler}>
                {categories.map((item) => (
                    <li
                        key={item.id}
                        className={
                            item.type.toLowerCase() === query.category
                                ? styles.selected
                                : null
                        }
                    >
                        {item.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
