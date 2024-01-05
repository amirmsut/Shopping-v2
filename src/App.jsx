import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./Layout/Layout";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import PageNotFound from "./pages/404";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";

function App() {
    return (
        <CartProvider>
            <ProductProvider>
                <Layout>
                    <Routes>
                        <Route
                            index
                            element={<Navigate to="/products" replace />}
                        />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/products/:id" element={<DetailsPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                </Layout>
            </ProductProvider>
        </CartProvider>
    );
}

export default App;
