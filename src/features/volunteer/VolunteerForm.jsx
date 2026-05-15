// src/features/volunteer/VolunteerForm.jsx

import { useState } from "react";
import { X, User, Phone, MapPin, Heart, CheckCircle, ChevronDown, Briefcase, Clock } from "lucide-react";
import { useSOS } from "../../store/SOSContext";
import { validatePhone, required } from "../../utils/validators";

const PROVINCES = [
    "Thanh Hóa","Nghệ An","Hà Tĩnh","Quảng Bình","Quảng Trị",
    "Thừa Thiên Huế","Đà Nẵng","Quảng Nam","Quảng Ngãi","Bình Định",
    "Phú Yên","Khánh Hòa","Ninh Thuận","Bình Thuận","Gia Lai",
    "Kon Tum","Đắk Lắk","Đắk Nông","Lâm Đồng","Tỉnh/Thành khác",
];

const SKILLS = [
    { id: "firstaid",    label: "Sơ cứu y tế",     icon: "🏥" },
    { id: "rescue",      label: "Cứu hộ cứu nạn",  icon: "🚣" },
    { id: "logistics",   label: "Vận chuyển hàng",  icon: "🚚" },
    { id: "cooking",     label: "Nấu ăn",           icon: "🍲" },
    { id: "psychology",  label: "Hỗ trợ tâm lý",   icon: "💬" },
    { id: "it",          label: "Công nghệ thông tin", icon: "💻" },
    { id: "translation", label: "Phiên dịch",       icon: "🌐" },
    { id: "teaching",    label: "Dạy học",          icon: "📚" },
    { id: "driving",     label: "Lái xe",           icon: "🚗" },
    { id: "other",       label: "Kỹ năng khác",     icon: "✨" },
];

const AVAILABILITY = [
    { value: "fulltime",  label: "Toàn thời gian" },
    { value: "weekend",   label: "Cuối tuần" },
    { value: "evening",   label: "Buổi tối" },
    { value: "flexible",  label: "Linh hoạt" },
];

const initialForm = {
    name: "", phone: "", email: "", province: "",
    skills: [], availability: "", experience: "", note: "",
};

export default function VolunteerForm() {
    const { isVolunteerOpen, setIsVolunteerOpen } = useSOS();
    const [form, setForm]       = useState(initialForm);
    const [errors, setErrors]   = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isVolunteerOpen) return null;

    const set = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const toggleSkill = (id) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.includes(id)
                ? prev.skills.filter((s) => s !== id)
                : [...prev.skills, id],
        }));
        setErrors((prev) => ({ ...prev, skills: "" }));
    };

    const validate = () => {
        const e = {};
        if (!required(form.name))           e.name         = "Vui lòng nhập họ tên";
        if (!validatePhone(form.phone))     e.phone        = "Số điện thoại không hợp lệ (VD: 0901234567)";
        if (!form.province)                 e.province     = "Vui lòng chọn tỉnh/thành";
        if (form.skills.length === 0)       e.skills       = "Vui lòng chọn ít nhất một kỹ năng";
        if (!form.availability)             e.availability = "Vui lòng chọn thời gian tham gia";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        setSubmitted(true);
    };

    const handleClose = () => {
        setIsVolunteerOpen(false);
        setForm(initialForm);
        setErrors({});
        setSubmitted(false);
    };

    /* ── SUCCESS SCREEN ── */
    if (submitted) {
        return (
            <div className="sos-overlay" onClick={handleClose}>
                <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="sos-success">
                        <div className="success-icon">
                            <CheckCircle size={48} color="#22C55E" />
                        </div>
                        <h2>Đăng ký thành công!</h2>
                        <p>
                            Cảm ơn <strong>{form.name}</strong> đã đăng ký làm tình nguyện viên.
                            <br />Đội điều phối sẽ liên hệ với bạn qua số <strong>{form.phone}</strong> sớm nhất có thể.
                        </p>
                        <div className="success-info">
                            <div className="success-info-row">
                                <span>Khu vực:</span>
                                <strong>{form.province}</strong>
                            </div>
                            <div className="success-info-row">
                                <span>Kỹ năng:</span>
                                <strong>{form.skills.map((id) => SKILLS.find((s) => s.id === id)?.label).join(", ")}</strong>
                            </div>
                            <div className="success-info-row">
                                <span>Thời gian:</span>
                                <strong>{AVAILABILITY.find((a) => a.value === form.availability)?.label}</strong>
                            </div>
                        </div>
                        <button className="sos-submit-btn volunteer-submit-btn" onClick={handleClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── FORM SCREEN ── */
    return (
        <div className="sos-overlay" onClick={handleClose}>
            <div className="sos-modal volunteer-modal" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="sos-modal-header volunteer-header">
                    <div className="sos-modal-title">
                        <div className="sos-modal-icon volunteer-icon">🧑‍🚒</div>
                        <div>
                            <h2>Đăng ký Tình Nguyện Viên</h2>
                            <p>Cùng chung tay hỗ trợ đồng bào miền Trung</p>
                        </div>
                    </div>
                    <button className="sos-close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="sos-modal-body">
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                        {/* Họ tên + SĐT */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label"><User size={13} /> Họ và tên *</label>
                                <input
                                    className={`form-input ${errors.name ? "error" : ""}`}
                                    placeholder="Nguyễn Văn A"
                                    value={form.name}
                                    onChange={(e) => set("name", e.target.value)}
                                />
                                {errors.name && <p className="form-error">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label"><Phone size={13} /> Số điện thoại *</label>
                                <input
                                    className={`form-input ${errors.phone ? "error" : ""}`}
                                    placeholder="0901 234 567"
                                    value={form.phone}
                                    onChange={(e) => set("phone", e.target.value)}
                                />
                                {errors.phone && <p className="form-error">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Email + Tỉnh */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">✉️ Email (tuỳ chọn)</label>
                                <input
                                    className="form-input"
                                    placeholder="email@example.com"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => set("email", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><MapPin size={13} /> Tỉnh/Thành phố *</label>
                                <div className="form-select-wrap">
                                    <select
                                        className={`form-input form-select ${errors.province ? "error" : ""}`}
                                        value={form.province}
                                        onChange={(e) => set("province", e.target.value)}
                                    >
                                        <option value="">-- Chọn tỉnh/thành --</option>
                                        {PROVINCES.map((p) => (<option key={p}>{p}</option>))}
                                    </select>
                                    <ChevronDown size={14} className="select-arrow" />
                                </div>
                                {errors.province && <p className="form-error">{errors.province}</p>}
                            </div>
                        </div>

                        {/* Kỹ năng */}
                        <div className="form-group">
                            <label className="form-label"><Briefcase size={13} /> Kỹ năng của bạn * <span style={{fontWeight:400, opacity:0.7}}>(chọn nhiều)</span></label>
                            <div className="skill-grid">
                                {SKILLS.map((skill) => (
                                    <button
                                        key={skill.id}
                                        type="button"
                                        className={`skill-btn ${form.skills.includes(skill.id) ? "skill-btn-active" : ""}`}
                                        onClick={() => toggleSkill(skill.id)}
                                    >
                                        <span>{skill.icon}</span>
                                        {skill.label}
                                    </button>
                                ))}
                            </div>
                            {errors.skills && <p className="form-error">{errors.skills}</p>}
                        </div>

                        {/* Thời gian tham gia */}
                        <div className="form-group">
                            <label className="form-label"><Clock size={13} /> Thời gian có thể tham gia *</label>
                            <div className="availability-grid">
                                {AVAILABILITY.map((a) => (
                                    <button
                                        key={a.value}
                                        type="button"
                                        className={`availability-btn ${form.availability === a.value ? "availability-btn-active" : ""}`}
                                        onClick={() => set("availability", a.value)}
                                    >
                                        {a.label}
                                    </button>
                                ))}
                            </div>
                            {errors.availability && <p className="form-error">{errors.availability}</p>}
                        </div>

                        {/* Kinh nghiệm */}
                        <div className="form-group">
                            <label className="form-label"><Heart size={13} /> Kinh nghiệm tình nguyện (tuỳ chọn)</label>
                            <input
                                className="form-input"
                                placeholder="VD: Đã tham gia cứu trợ lũ lụt 2023..."
                                value={form.experience}
                                onChange={(e) => set("experience", e.target.value)}
                            />
                        </div>

                        {/* Ghi chú */}
                        <div className="form-group">
                            <label className="form-label">Ghi chú thêm (tuỳ chọn)</label>
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Thông tin thêm bạn muốn chia sẻ..."
                                value={form.note}
                                onChange={(e) => set("note", e.target.value)}
                                rows={2}
                            />
                        </div>

                        {/* Footer */}
                        <div className="sos-modal-footer" style={{ marginTop: "4px" }}>
                            <button type="button" className="sos-cancel-btn" onClick={handleClose}>Huỷ</button>
                            <button type="submit" className="sos-submit-btn volunteer-submit-btn" disabled={loading}>
                                {loading ? <span className="loading-spinner"></span> : "🧑‍🚒 Đăng ký ngay"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
