import { lazy } from "react";

// Main pages
export const Home = lazy(() => import("./Home/Home"));
export const Gaming = lazy(() => import("./Gaming/Gaming"));
export const Smartphone = lazy(() => import("./Smartphones/Smartphones"));
export const Blog = lazy(() => import("./Blog/Blog"));
export const Contact = lazy(() => import("./Contact/Contact"));
export const Laptop = lazy(() => import("./Laptops/Laptops"));
export const TvMonitors = lazy(() => import("./TV-Monitors/TvMonitors"));
export const AudioSound = lazy(() => import("./Audio-sound/AudioSound"));
export const HomeAppliances = lazy(() =>
  import("./HomeAppliances/HomeAppliances")
);
export const ShoppingCart = lazy(() => import("./Shopping-Cart/ShoppingCart"));

// Checkout & Payments
export const Checkout = lazy(() => import("../Pages/checkout/Checkout"));
export const ConfirmPaymentPage = lazy(() => import("./checkout/PaymentPage"));
export const PaymentSuccess = lazy(() => import("./checkout/PaymentSuccess"));
export const PaymentFailed = lazy(() => import("./checkout/PaymentFailed"));

// User & Profile
export const AccountPage = lazy(() =>
  import("./profile/AccountPage/AccountPage")
);
export const OrdersPage = lazy(() => import("./profile/myOrders/OrdersPage"));
export const PaymentSettingsPage = lazy(() =>
  import("./profile/paymentMethod/PaymentMethodsPage")
);
export const ShippingInfoPage = lazy(() =>
  import("./profile/shippingInfo/ShippingInfoPage")
);
export const MyFavoritesPage = lazy(() =>
  import("./profile/favorite/MyFavoritesPage")
);
export const Favorites = lazy(() => import("../Pages/favoritePage/Favorites"));

// Product Pages
export const ProductPage = lazy(() => import("./ProductPage/ProductPage"));
export const CategoryProductsPage = lazy(() =>
  import("./CategoryProductsPage/CategoryProductsPage")
);
export const ResetPasswordPage = lazy(() =>
  import("./resetPassword/ResetPasswordPage")
);
export const ResetPasswordConfirmPage = lazy(() =>
  import("./resetPassword/ResetPasswordConfirmPage")
);
