import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import Login from "./pages/1Login";
import MapList from "./pages/3MapList";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/api/Login",
                element: <Login />,
                errorElement: <ErrorPage />
            },
            {
                path: "/api/MapList",
                element: <MapList />,
                errorElement: <ErrorPage />
            },
            {
                path: "/api/Profile",
                element: <Profile />,
                errorElement: <ErrorPage />
            }
        ]
    }
]);

export default Routes;
