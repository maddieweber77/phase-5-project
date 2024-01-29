import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MapList from "./pages/MapList";
import Login from "./pages/SignIn";
import Profile from "./pages/Profile";

async function memeLoader() {
    const restaurants = await fetch("http://localhost:3000/restaurants")
    const users = await fetch("http://localhost:3000/users")
    return [await restaurants.json(), await users.json()]

}
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Login />,
                errorElement: <ErrorPage />
            },
            {
                path: "/MapList",
                element: <MapList />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Profile",
                element: <Profile />,
                errorElement: <ErrorPage />
            }
        ]
    }
]);

export default Routes;


