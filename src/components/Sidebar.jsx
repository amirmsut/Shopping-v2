import { createQueryObject } from "../helpers/helper";
import { FaListUl } from "react-icons/fa";

function Sidebar({ setQuery }) {
    const categoryHandler = (e) => {
        const { tagName } = e.target;
        const category = e.target.innerText.toLowerCase();
        if (tagName !== "LI") return;
        setQuery((query) => createQueryObject(query, { category: category }));
    };
    return (
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
    );
}

export default Sidebar;
