import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

// Pages
import HomeProducts from "./views/HomeProducts";
import ProductDetails from "./views/ProductDetails";

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeProducts />} path='/' exact />
                <Route element={<ProductDetails />} path='/productDetails/:id' />
                <Route element={<h1>Page not found</h1>} path='*' />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRoutes;