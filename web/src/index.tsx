import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { hashRoutes } from "./config/router.tsx";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <ConfigProvider
                locale={zhCN}
            >
                <RouterProvider
                    router={hashRoutes}
                />
            </ConfigProvider>
        </React.StrictMode>,
    );
}
