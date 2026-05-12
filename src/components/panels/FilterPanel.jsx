// src/components/panels/FilterPanel.jsx

const provinces = [
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Trị",
    "Quảng Ngãi",
    "Gia Lai",
    "Đắk Lắk",
    "Khánh Hòa",
    "Lâm Đồng",
    "Đà Nẵng",
    "Huế",
];

export default function FilterPanel() {
    return (
        <div className="filter-panel glass">
            <select>
                <option>Tỉnh/Thành</option>

                {provinces.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>

            <select>
                <option>Trạng thái</option>
                <option>Urgent</option>
                <option>Pending</option>
                <option>Helping</option>
                <option>Done</option>
            </select>

            <select>
                <option>Loại hỗ trợ</option>
                <option>Y tế</option>
                <option>Lương thực</option>
                <option>Di tản</option>
            </select>
        </div>
    );
}