// import react
import { lazy, Suspense } from 'react';

// import react router dom
import { Routes, Route } from "react-router-dom";

// lazy load components
const Loader = lazy(() => import('../components/loader'));
const Login = lazy(() => import('../pages/auth/login'));
const Dashboard = lazy(() => import('../pages/dashboard/index'));
const Users = lazy(() => import('../pages/users/index'));
const UserCreate = lazy(() => import('../pages/users/create'));
const UserEdit = lazy(() => import('../pages/users/edit'));

import PrivateRoutes from "./private";

export default function RoutesIndex() {
    // Array untuk route dengan PrivateRoutes
    const privateRoutes = [
        { path: "/dashboard", component: <Dashboard /> },
        { path: "/users", component: <Users /> },
        { path: "/users/create", component: <UserCreate /> },
        { path: "/users/edit/:id", component: <UserEdit /> },
    ];

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                {/* Private Routes */}
                {privateRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<PrivateRoutes>{component}</PrivateRoutes>}
                    />
                ))}
            </Routes>
        </Suspense>
    );
}
