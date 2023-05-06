import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import DistributorPage from "./pages/DistributorPage";
import Retailers from "./pages/Retailers";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                { path: 'distributor', element: <DistributorPage /> },
                { path: 'retailers', element: <Retailers /> },
                { path: 'customers', element: <Customers /> },
                { path: 'transactions', element: <Transactions /> },
                {path: 'profile',element: <Profile/>}
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
            index: true
        },

        {
            path: 'logout',
            element: <Logout />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />,  },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/login" replace />,
            index: true
        }
    ]);

    return routes;
}
