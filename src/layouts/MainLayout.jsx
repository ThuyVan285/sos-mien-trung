// src/layouts/MainLayout.jsx

import Header from "./Header";


// FloatMenu đã được tích hợp vào AIPanel trong MapPage
// Sidebar (drawer bên trái) giờ là LeftPanel nằm trong MapPage
// nên MainLayout chỉ cần Header + content

export default function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header />
            <div className="layout-body">
                <main className="layout-content">{children}</main>
            </div>
        </div>
    );
}