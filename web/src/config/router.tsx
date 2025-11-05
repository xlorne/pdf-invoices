import React from "react";
import CCBZPage from "../pages/ccbz.tsx";
import {createHashRouter} from "react-router-dom";
import App from "../App.tsx";

const routes = [
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/ccbz',
        element: <CCBZPage/>,
    },
]

export const hashRoutes = createHashRouter(routes);