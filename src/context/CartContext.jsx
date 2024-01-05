import { Children, createContext, useContext, useReducer } from "react";

// helpers
import { sumProducts } from "../helpers/helper";

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    checkout: false,
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        //
        // ADD_ITEM
        case "ADD_ITEM":
            if (
                !state.selectedItems.find(
                    (item) => item.id === action.payload.id
                )
            ) {
                state.selectedItems.push({ ...action.payload, quantity: 1 });
            }
            return {
                // selectedItems: [...state.selectedItems],
                ...state,
                ...sumProducts(state.selectedItems),
                checkout: false,
            };
        // REMOVE_ITEM
        case "REMOVE_ITEM":
            const newSelectedItems = state.selectedItems.filter(
                (item) => item.id !== action.payload.id
            );
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumProducts(newSelectedItems),
            };

        // INCREASE
        case "INCREASE":
            const increaseIndex = state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            state.selectedItems[index].quantity++;
            return {
                ...state,
                ...sumProducts(state.selectedItems),
            };

        // DECREASE
        case "DECREASE":
            const decreaseIndex = state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            state.selectedItems[index].quantity--;
            return {
                ...state,
                ...sumProducts(state.selectedItems),
            };

        // Checkout
        case "CHECKOUT":
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true,
            };

        default:
            throw new Error("Invalid Actions!");
            break;
    }
};

const CartContext = createContext();

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={{ state: state, dispatch: dispatch }}>
            {/* <CartContext.Provider value={{ state, dispatch }}> */}
            {children}
        </CartContext.Provider>
    );
}

const useCart = () => {
    const { state, dispatch } = useContext(CartContext);
    return [state, dispatch];
};

export default CartProvider;
export { useCart };
