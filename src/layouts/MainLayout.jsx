// src/layouts/MainLayout.jsx

import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatMenu from "./FloatMenu";

export default function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header />

            <div className="layout-body">
                <Sidebar />

                <main className="layout-content">{children}</main>
            </div>

            <FloatMenu />
        </div>
    );
}