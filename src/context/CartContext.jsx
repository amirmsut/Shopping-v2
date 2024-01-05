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
    // console.log(action);
    switch (action.type) {
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
