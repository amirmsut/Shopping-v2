import React from "react";
import { Link } from "react-router-dom";
import { TbShoppingBagCheck, TbListDetails } from "react-icons/tb";
import { shortenText } from "../helpers/helper";

// styles
import styles from "./Card.module.css";

function Card({ data }) {
    const { id, title, image, price } = data;

    return (
        <div className={styles.card}>
            <img src={image} alt={title} />
            <h3>{shortenText(title)}</h3>
            <p>{price} $</p>
            <div className={styles.actions}>
                <Link to={`/products/${id}`}>
                    <TbListDetails />
                </Link>
                <div className="">
                    <button>
                        <TbShoppingBagCheck />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
