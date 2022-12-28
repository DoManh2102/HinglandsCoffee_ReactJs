import AdminLayout from "../components/Layout/AdminLayout/AdminLayout";
import ManageCategory from "../components/Layout/AdminLayout/ManageCategory/ManageCategory";
import ManageProduct from "../components/Layout/AdminLayout/ManageProduct/ManageProduct";
import ManageAdmin from "../components/Layout/AdminLayout/ManageUser/ManageAdmin";
import Dashboard from "../components/Layout/AdminLayout/Dashboard/Dashboard";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ManageClient from "../components/Layout/AdminLayout/ManageUser/ManageClient";
import ManagetNews from "../components/Layout/AdminLayout/ManagetNews/ManagetNews";
import DefaultLayout from "../components/Layout/DefaultLayout/DefaultLayout";
import ManageOrders from "../components/Layout/AdminLayout/ManageOrders/ManageOrders";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import ProductSearch from "../components/ProductSearch/ProductSearch";
import Menu from "../components/ProductDetailt/Menu";

const publicRouter = [
    { path: '/', component: HomePage },
    { path: '/product/:id', component: ProductPage, },
    { path: '/menu', component: Menu, },
    { path: '/category/:id', component: CategoryPage },
    { path: '/productSearch/:name', component: ProductSearch },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/managementAdmin', component: ManageAdmin, layout: AdminLayout },
    { path: '/managementClient', component: ManageClient, layout: AdminLayout },
    { path: '/managementProduct', component: ManageProduct, layout: AdminLayout },
    { path: '/managementCategory', component: ManageCategory, layout: AdminLayout },
    { path: '/managementNews', component: ManagetNews, layout: AdminLayout },
    { path: '/managementOrder', component: ManageOrders, layout: AdminLayout },
    { path: '/cart', component: Cart, },
]

const privateRouter = []

export { publicRouter, privateRouter }