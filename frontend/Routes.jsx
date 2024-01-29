import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/MapList";
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
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Profile",
                element: <Profile />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Caption-Meme",
                element: <Caption_Meme />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Battle-Memes",
                element: <Battle_Memes />,
                errorElement: <ErrorPage />,
                loader: memeLoader
            }
        ]
    }
]);

export default Routes;


