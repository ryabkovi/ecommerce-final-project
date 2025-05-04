import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import CreateAccount from "./Components/forms/signup/CreateAccount.jsx";
import * as Pages from "./Components/Pages/pageIndex.js";
import { NavigationBar, Footer } from "./Components/section/sectionIndex.js";

function Root() {
  return (
    <>
      <Header />
      <NavigationBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Pages.Home />} />
        <Route path="gaming" element={<Pages.Gaming />} />
        <Route path="smartphones" element={<Pages.Smartphone />} />
        <Route path="blog" element={<Pages.Blog />} />
        <Route path="contact" element={<Pages.Contact />} />
        <Route path="laptops" element={<Pages.Laptop />} />
        <Route path="tvs-monitors" element={<Pages.TvMonitors />} />
        <Route path="audio-sound" element={<Pages.AudioSound />} />
        <Route path="home-appliances" element={<Pages.HomeAppliances />} />
        <Route path="shopping-cart" element={<Pages.ShoppingCart />} />
        <Route path="checkout" element={<Pages.Checkout />} />
        <Route path="checkout/payment" element={<Pages.ConfirmPaymentPage />} />
        <Route path="payment-success" element={<Pages.PaymentSuccess />} />
        <Route path="payment-failed" element={<Pages.PaymentFailed />} />
        <Route path="favorites" element={<Pages.Favorites />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="account" element={<Pages.AccountPage />} />
        <Route path="MyOrder" element={<Pages.OrdersPage />} />
        <Route path="payment-method" element={<Pages.PaymentSettingsPage />} />
        <Route path="shipping-info" element={<Pages.ShippingInfoPage />} />
        <Route path="my-favorite" element={<Pages.MyFavoritesPage />} />
        <Route path="product/:id" element={<Pages.ProductPage />} />
        <Route
          path="category/:categoryId"
          element={<Pages.CategoryProductsPage />}
        />
      </Route>
      <Route path="/reset-password" element={<Pages.ResetPasswordPage />} />
      <Route
        path="/reset-password-confirm"
        element={<Pages.ResetPasswordConfirmPage />}
      />
    </Routes>
  );
}

export default App;
