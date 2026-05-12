// src/features/sos/SOSForm.jsx

import { useState } from "react";
import { validatePhone } from "../../utils/validators";

export default function SOSForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        support: "",
        level: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePhone(form.phone)) {
            alert("SĐT không hợp lệ");
            return;
        }

        alert("Đã gửi SOS");
    };

    return (
        <form className="glass form-box" onSubmit={handleSubmit}>
            <input
                placeholder="Họ tên"
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
            />

            <input
                placeholder="SĐT"
                onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                }
            />

            <input
                placeholder="Địa chỉ"
                onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                }
            />

            <button type="submit">Gửi SOS</button>
        </form>
    );
}