import React from "react";
import CCBZPage from "../pages/ccbz.tsx";
import CLFPage from "../pages/clf.tsx";
import FYPage from "../pages/fy.tsx";
import PZPage from "../pages/pz.tsx";
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
    {
        path: '/clf',
        element: <CLFPage/>,
    },
    {
        path: '/fy',
        element: <FYPage/>,
    },
    {
        path: '/pz',
        element: <PZPage/>,
    }
]

export const hashRoutes = createHashRouter(routes);