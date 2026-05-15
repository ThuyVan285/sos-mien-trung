// src/features/sos/SOSForm.jsx

import { useState } from "react";
import { X, AlertTriangle, User, Phone, MapPin, Heart, ChevronDown, CheckCircle } from "lucide-react";
import { validatePhone, required } from "../../utils/validators";
import { useSOS } from "../../store/SOSContext";

const SUPPORT_TYPES = ["Lương thực", "Y tế", "Di tản", "Nước uống", "Chỗ ở", "Khác"];
const LEVELS = [
    { value: "high",   label: "Khẩn cấp - Nguy hiểm tính mạng", color: "#FF4D4F" },
    { value: "medium", label: "Trung bình - Cần hỗ trợ sớm",    color: "#FACC15" },
    { value: "low",    label: "Thấp - Có thể chờ",               color: "#22C55E" },
];

const PROVINCES = [
    "Thanh Hóa","Nghệ An","Hà Tĩnh","Quảng Bình","Quảng Trị",
    "Thừa Thiên Huế","Đà Nẵng","Quảng Nam","Quảng Ngãi","Bình Định",
    "Phú Yên","Khánh Hòa","Ninh Thuận","Bình Thuận","Gia Lai",
    "Kon Tum","Đắk Lắk","Đắk Nông","Lâm Đồng",
];

// Toạ độ gần đúng theo tỉnh
const PROVINCE_COORDS = {
    "Thanh Hóa":        [19.8, 105.8],
    "Nghệ An":          [18.7, 105.7],
    "Hà Tĩnh":          [18.3, 105.9],
    "Quảng Bình":       [17.5, 106.3],
    "Quảng Trị":        [16.7, 107.2],
    "Thừa Thiên Huế":   [16.4, 107.6],
    "Đà Nẵng":          [16.05, 108.2],
    "Quảng Nam":        [15.6, 108.0],
    "Quảng Ngãi":       [15.1, 108.8],
    "Bình Định":        [14.2, 109.0],
    "Phú Yên":          [13.1, 109.3],
    "Khánh Hòa":        [12.2, 109.2],
    "Ninh Thuận":       [11.6, 108.9],
    "Bình Thuận":       [11.1, 108.1],
    "Gia Lai":          [13.8, 108.1],
    "Kon Tum":          [14.4, 108.0],
    "Đắk Lắk":         [12.7, 108.1],
    "Đắk Nông":         [12.0, 107.7],
    "Lâm Đồng":         [11.9, 108.4],
};

const initialForm = {
    name: "", phone: "", province: "", address: "",
    supportType: "", level: "high", note: "",
};

export default function SOSForm() {
    const { setIsFormOpen, addSOSRequest } = useSOS();
    const [form, setForm]     = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]     = useState(false);

    const set = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!required(form.name))        e.name        = "Vui lòng nhập họ tên";
        if (!validatePhone(form.phone))  e.phone       = "Số điện thoại không hợp lệ (VD: 0901234567)";
        if (!form.province)              e.province    = "Vui lòng chọn tỉnh/thành";
        if (!required(form.address))     e.address     = "Vui lòng nhập địa chỉ cụ thể";
        if (!form.supportType)           e.supportType = "Vui lòng chọn loại hỗ trợ";
        if (!form.level)                 e.level       = "Vui lòng chọn mức độ khẩn cấp";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }

        setLoading(true);
        // Giả lập gọi API (thay bằng axios khi có backend)
        await new Promise((r) => setTimeout(r, 800));

        const coords = PROVINCE_COORDS[form.province] || [16.0, 108.0];
        addSOSRequest({
            name:        form.name,
            phone:       form.phone,
            province:    form.province,
            address:     `${form.address}, ${form.province}`,
            supportType: form.supportType,
            level:       form.level,
            note:        form.note,
            lat:         coords[0] + (Math.random() - 0.5) * 0.3,
            lng:         coords[1] + (Math.random() - 0.5) * 0.3,
        });

        setLoading(false);
        setSubmitted(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setForm(initialForm);
        setErrors({});
        setSubmitted(false);
    };

    // --- SUCCESS SCREEN ---
    if (submitted) {
        return (
            <div className="sos-overlay" onClick={handleClose}>
                <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="sos-success">
                        <div className="success-icon">
                            <CheckCircle size={48} color="#22C55E" />
                        </div>
                        <h2>Đã gửi SOS thành công!</h2>
                        <p>Yêu cầu của bạn đã được ghi nhận và hiển thị trên bản đồ.<br />Đội cứu trợ sẽ liên hệ sớm nhất có thể.</p>
                        <div className="success-info">
                            <div className="success-info-row">
                                <span>Họ tên:</span>
                                <strong>{form.name}</strong>
                            </div>
                            <div className="success-info-row">
                                <span>Khu vực:</span>
                                <strong>{form.province}</strong>
                            </div>
                            <div className="success-info-row">
                                <span>Hỗ trợ:</span>
                                <strong>{form.supportType}</strong>
                            </div>
                        </div>
                        <button className="sos-submit-btn" onClick={handleClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- FORM SCREEN ---
    return (
        <div className="sos-overlay" onClick={handleClose}>
            <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sos-modal-header">
                    <div className="sos-modal-title">
                        <div className="sos-modal-icon">🚨</div>
                        <div>
                            <h2>Gửi tín hiệu SOS</h2>
                            <p>Điền thông tin để được hỗ trợ nhanh nhất</p>
                        </div>
                    </div>
                    <button className="sos-close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="sos-modal-body">
                    {/* Mức độ khẩn cấp - chọn đầu tiên */}
                    <div className="form-group">
                        <label className="form-label">
                            <AlertTriangle size={13} /> Mức độ khẩn cấp
                        </label>
                        <div className="level-options">
                            {LEVELS.map((lv) => (
                                <button
                                    key={lv.value}
                                    type="button"
                                    className={`level-btn ${form.level === lv.value ? "active" : ""}`}
                                    style={form.level === lv.value
                                        ? { borderColor: lv.color, background: `${lv.color}18`, color: lv.color }
                                        : {}}
                                    onClick={() => set("level", lv.value)}
                                >
                                    <span className="level-dot" style={{ background: lv.color }}></span>
                                    {lv.label}
                                </button>
                            ))}
                        </div>
                        {errors.level && <p className="form-error">{errors.level}</p>}
                    </div>

                    {/* Họ tên + SĐT */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label"><User size={13} /> Họ và tên</label>
                            <input
                                className={`form-input ${errors.name ? "error" : ""}`}
                                placeholder="Nguyễn Văn A"
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                            />
                            {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label"><Phone size={13} /> Số điện thoại</label>
                            <input
                                className={`form-input ${errors.phone ? "error" : ""}`}
                                placeholder="0901 234 567"
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                            />
                            {errors.phone && <p className="form-error">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Tỉnh + Loại hỗ trợ */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label"><MapPin size={13} /> Tỉnh/Thành phố</label>
                            <div className="form-select-wrap">
                                <select
                                    className={`form-input form-select ${errors.province ? "error" : ""}`}
                                    value={form.province}
                                    onChange={(e) => set("province", e.target.value)}
                                >
                                    <option value="">-- Chọn tỉnh/thành --</option>
                                    {PROVINCES.map((p) => (
                                        <option key={p}>{p}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow" />
                            </div>
                            {errors.province && <p className="form-error">{errors.province}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label"><Heart size={13} /> Loại hỗ trợ cần</label>
                            <div className="form-select-wrap">
                                <select
                                    className={`form-input form-select ${errors.supportType ? "error" : ""}`}
                                    value={form.supportType}
                                    onChange={(e) => set("supportType", e.target.value)}
                                >
                                    <option value="">-- Chọn loại hỗ trợ --</option>
                                    {SUPPORT_TYPES.map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow" />
                            </div>
                            {errors.supportType && <p className="form-error">{errors.supportType}</p>}
                        </div>
                    </div>

                    {/* Địa chỉ cụ thể */}
                    <div className="form-group">
                        <label className="form-label"><MapPin size={13} /> Địa chỉ cụ thể</label>
                        <input
                            className={`form-input ${errors.address ? "error" : ""}`}
                            placeholder="Số nhà, thôn/xóm, xã/phường..."
                            value={form.address}
                            onChange={(e) => set("address", e.target.value)}
                        />
                        {errors.address && <p className="form-error">{errors.address}</p>}
                    </div>

                    {/* Ghi chú */}
                    <div className="form-group">
                        <label className="form-label">Ghi chú thêm (tuỳ chọn)</label>
                        <textarea
                            className="form-input form-textarea"
                            placeholder="Mô tả tình trạng hiện tại, số người cần hỗ trợ..."
                            value={form.note}
                            onChange={(e) => set("note", e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="sos-modal-footer">
                    <button className="sos-cancel-btn" onClick={handleClose}>
                        Huỷ
                    </button>
                    <button
                        className="sos-submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>🚨 Gửi SOS ngay</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}