import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from '../src/components/Layout.jsx';

// Pages
import HomeProducts from "./views/HomeProducts";
import ProductDetails from "./views/ProductDetails";
import Login from "./views/Login";
import CustomersCrud from "./views/CustomersCrud.js";

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <Layout>
                        <HomeProducts />
                    </Layout>
                }
                    path='/'
                    exact
                />

                <Route
                    element={
                        <Layout>
                            <ProductDetails />
                        </Layout>
                    }
                    path='/productDetails/:id'
                />

                <Route
                    element={
                        <Layout>
                            <CustomersCrud />
                        </Layout>
                    }
                    path='/customerCrud'
                />

                <Route
                    element={<Login />}
                    path="/login"
                />

                <Route element={<h1>Page not found</h1>} path='*    ' />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRoutes;