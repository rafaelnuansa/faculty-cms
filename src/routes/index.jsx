// src/routes/RoutesIndex.jsx

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './private';
import Loader from '../components/loader';
import Login from '../pages/auth/login';
import Dashboard from '../pages/dashboard/index';
import Users from '../pages/users/index';
import UserCreate from '../pages/users/create';
import UserEdit from '../pages/users/edit';
import Faculties from '../pages/faculties/index';
import FacultyCreate from '../pages/faculties/create';
import FacultyEdit from '../pages/faculties/edit';
import NotFound from '../pages/errors/404';

// Define route constants
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/edit/:id',
  FACULTIES: '/faculties',
  FACULTIES_CREATE: '/faculties/create',
  FACULTIES_EDIT: '/faculties/edit/:id',
};

export default function RoutesIndex() {
    // Array for routes with PrivateRoutes
    const privateRoutes = [
        { path: ROUTES.HOME, component: <Dashboard /> },
        { path: ROUTES.DASHBOARD, component: <Dashboard /> },
        { path: ROUTES.USERS, component: <Users /> },
        { path: ROUTES.USER_CREATE, component: <UserCreate /> },
        { path: ROUTES.USER_EDIT, component: <UserEdit /> },
        { path: ROUTES.FACULTIES, component: <Faculties /> },
        { path: ROUTES.FACULTIES_CREATE, component: <FacultyCreate /> },
        { path: ROUTES.FACULTIES_EDIT, component: <FacultyEdit /> },
    ];

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                {privateRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<PrivateRoutes>{component}</PrivateRoutes>}
                    />
                ))}
                {/* Catch-All Route for 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
