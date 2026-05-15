// src/components/panels/FilterPanel.jsx

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const provinces = [
    "Tất cả tỉnh/thành",
    "Thanh Hóa", "Nghệ An", "Hà Tĩnh",
    "Quảng Trị", "Quảng Ngãi", "Gia Lai",
    "Đắk Lắk", "Khánh Hòa", "Lâm Đồng",
    "Đà Nẵng", "Huế",
];

export default function FilterPanel() {
    const [province, setProvince] = useState("");
    const [status, setStatus] = useState("");
    const [supportType, setSupportType] = useState("");

    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label>Tỉnh/Thành</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)}>
                    {provinces.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Tất cả trạng thái</option>
                    <option value="urgent">Khẩn cấp</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="helping">Đang hỗ trợ</option>
                    <option value="done">Hoàn thành</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Loại hỗ trợ</label>
                <select value={supportType} onChange={(e) => setSupportType(e.target.value)}>
                    <option>Tất cả loại hỗ trợ</option>
                    <option>Y tế</option>
                    <option>Lương thực</option>
                    <option>Di tản</option>
                    <option>Nước uống</option>
                </select>
            </div>

            <button className="filter-advanced-btn" onClick={() => alert("Chức năng bộ lọc nâng cao sẽ được cập nhật sớm!")}>
                <SlidersHorizontal size={15} />
                Bộ lọc nâng cao
            </button>
        </div>
    );
}