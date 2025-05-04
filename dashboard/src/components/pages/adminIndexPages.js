import { lazy } from "react";

export const Dashboard = lazy(() => import("./privatePages/Dashboard"));
export const Categories = lazy(() => import("./privatePages/Categories"));
export const Products = lazy(() => import("./privatePages/Products"));
export const Orders = lazy(() => import("./privatePages/Orders"));
export const Manager = lazy(() => import("./privatePages/Managers"));
export const Login = lazy(() => import("./publicPages/Login"));
export const Users = lazy(() => import("./privatePages/Users"));
export const Feedback = lazy(() => import("./privatePages/Feedback"));
