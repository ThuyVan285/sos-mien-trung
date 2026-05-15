// src/features/donation/DonationForm.jsx

import { useState } from "react";
import { X, User, Phone, Heart, CheckCircle, ChevronDown, Copy, Check } from "lucide-react";
import { useSOS } from "../../store/SOSContext";
import { validatePhone, required } from "../../utils/validators";

const DONATION_TYPES = [
    { value: "money",    label: "💰 Tiền mặt / Chuyển khoản" },
    { value: "food",     label: "🍲 Lương thực, thực phẩm" },
    { value: "medicine", label: "💊 Thuốc & vật tư y tế" },
    { value: "clothes",  label: "👕 Quần áo, chăn màn" },
    { value: "water",    label: "💧 Nước uống" },
    { value: "other",    label: "📦 Hàng hoá khác" },
];

const BANK_INFO = {
    bankName:    "Vietcombank – Chi nhánh Đà Nẵng",
    accountNo:   "1234 5678 9012 345",
    accountName: "QUỸ CỨU TRỢ SOS MIỀN TRUNG",
    branch:      "Chi nhánh Đà Nẵng",
    content:     "QUYEN GOP SOS MIEN TRUNG",
};

// QR chuyển khoản nhanh VietQR (demo – thay bằng QR thật)
const QR_URL = `https://img.vietqr.io/image/VCB-1234567890-compact2.png?amount=0&addInfo=${encodeURIComponent(BANK_INFO.content)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

const initialForm = { name: "", phone: "", donationType: "", amount: "", note: "" };

export default function DonationForm() {
    const { isDonationOpen, setIsDonationOpen } = useSOS();
    const [form, setForm]         = useState(initialForm);
    const [errors, setErrors]     = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]   = useState(false);
    const [copied, setCopied]     = useState(null);   // field name being copied

    if (!isDonationOpen) return null;

    const set = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const copyToClipboard = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(field);
            setTimeout(() => setCopied(null), 1800);
        } catch {
            /* ignore */
        }
    };

    const validate = () => {
        const e = {};
        if (!required(form.name))         e.name         = "Vui lòng nhập họ tên";
        if (!validatePhone(form.phone))   e.phone        = "Số điện thoại không hợp lệ (VD: 0901234567)";
        if (!form.donationType)           e.donationType = "Vui lòng chọn hình thức quyên góp";
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
        setIsDonationOpen(false);
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
                        <h2>Cảm ơn bạn đã quyên góp! 💝</h2>
                        <p>
                            Thông tin của <strong>{form.name}</strong> đã được ghi nhận.
                            <br />Đội ngũ sẽ liên hệ qua <strong>{form.phone}</strong> sớm nhất có thể.
                        </p>
                        <div className="success-info">
                            <div className="success-info-row">
                                <span>Hình thức:</span>
                                <strong>{DONATION_TYPES.find((d) => d.value === form.donationType)?.label}</strong>
                            </div>
                            {form.amount && (
                                <div className="success-info-row">
                                    <span>Số tiền:</span>
                                    <strong>{Number(form.amount).toLocaleString("vi-VN")} đ</strong>
                                </div>
                            )}
                        </div>
                        <button className="sos-submit-btn donation-submit-btn" onClick={handleClose}>
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
            <div className="sos-modal donation-modal" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="sos-modal-header donation-header">
                    <div className="sos-modal-title">
                        <div className="sos-modal-icon donation-icon">🎁</div>
                        <div>
                            <h2>Quyên góp hỗ trợ</h2>
                            <p>Đóng góp để giúp đỡ đồng bào miền Trung</p>
                        </div>
                    </div>
                    <button className="sos-close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="sos-modal-body donation-body">

                    {/* ===== THÔNG TIN NGÂN HÀNG ===== */}
                    <div className="bank-info-card">
                        <div className="bank-info-header">
                            <span className="bank-info-badge">🏦 Thông tin chuyển khoản</span>
                        </div>

                        <div className="bank-qr-layout">
                            {/* QR Code */}
                            <div className="qr-section">
                                <img
                                    src={QR_URL}
                                    alt="QR Chuyển khoản"
                                    className="qr-image"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />
                                {/* Fallback QR placeholder */}
                                <div className="qr-placeholder" style={{ display: "none" }}>
                                    <div className="qr-placeholder-inner">
                                        <div style={{ fontSize: 40 }}>📱</div>
                                        <p>Quét QR để chuyển khoản</p>
                                    </div>
                                </div>
                                <p className="qr-hint">Quét mã để chuyển khoản nhanh</p>
                            </div>

                            {/* Bank details */}
                            <div className="bank-details">
                                <BankRow
                                    label="Ngân hàng"
                                    value={BANK_INFO.bankName}
                                    field="bankName"
                                    copied={copied}
                                    onCopy={copyToClipboard}
                                />
                                <BankRow
                                    label="Số tài khoản"
                                    value={BANK_INFO.accountNo}
                                    field="accountNo"
                                    copied={copied}
                                    onCopy={copyToClipboard}
                                    highlight
                                />
                                <BankRow
                                    label="Chủ tài khoản"
                                    value={BANK_INFO.accountName}
                                    field="accountName"
                                    copied={copied}
                                    onCopy={copyToClipboard}
                                />
                                <BankRow
                                    label="Nội dung CK"
                                    value={BANK_INFO.content}
                                    field="content"
                                    copied={copied}
                                    onCopy={copyToClipboard}
                                    highlight
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== FORM ĐĂNG KÝ ===== */}
                    <div className="donation-divider">
                        <span>Hoặc đăng ký quyên góp trực tiếp</span>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

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

                        {/* Hình thức quyên góp */}
                        <div className="form-group">
                            <label className="form-label"><Heart size={13} /> Hình thức quyên góp *</label>
                            <div className="form-select-wrap">
                                <select
                                    className={`form-input form-select ${errors.donationType ? "error" : ""}`}
                                    value={form.donationType}
                                    onChange={(e) => set("donationType", e.target.value)}
                                >
                                    <option value="">-- Chọn hình thức --</option>
                                    {DONATION_TYPES.map((d) => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow" />
                            </div>
                            {errors.donationType && <p className="form-error">{errors.donationType}</p>}
                        </div>

                        {/* Số tiền (chỉ hiện khi chọn tiền) */}
                        {form.donationType === "money" && (
                            <div className="form-group">
                                <label className="form-label">💰 Số tiền dự kiến (đ)</label>
                                <input
                                    className="form-input"
                                    placeholder="VD: 500000"
                                    type="number"
                                    min="0"
                                    value={form.amount}
                                    onChange={(e) => set("amount", e.target.value)}
                                />
                            </div>
                        )}

                        {/* Ghi chú */}
                        <div className="form-group">
                            <label className="form-label">Ghi chú (tuỳ chọn)</label>
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Thông tin thêm về quyên góp của bạn..."
                                value={form.note}
                                onChange={(e) => set("note", e.target.value)}
                                rows={2}
                            />
                        </div>

                        {/* Footer */}
                        <div className="sos-modal-footer" style={{ marginTop: "4px" }}>
                            <button type="button" className="sos-cancel-btn" onClick={handleClose}>Huỷ</button>
                            <button type="submit" className="sos-submit-btn donation-submit-btn" disabled={loading}>
                                {loading ? <span className="loading-spinner"></span> : "💝 Gửi đăng ký"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

/* ── Helper component: hàng thông tin ngân hàng ── */
function BankRow({ label, value, field, copied, onCopy, highlight = false }) {
    const isCopied = copied === field;
    return (
        <div className="bank-row">
            <div className="bank-row-label">{label}</div>
            <div className={`bank-row-value ${highlight ? "bank-row-highlight" : ""}`}>
                <span>{value}</span>
                <button
                    type="button"
                    className={`copy-btn ${isCopied ? "copy-btn-success" : ""}`}
                    onClick={() => onCopy(value, field)}
                    title="Sao chép"
                >
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                </button>
            </div>
        </div>
    );
}