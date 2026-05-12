// src/features/donation/DonationForm.jsx

export default function DonationForm() {
    return (
        <form className="glass form-box">
            <input placeholder="Tên" />
            <input placeholder="SĐT" />
            <input placeholder="Loại hỗ trợ" />
            <input placeholder="Khu vực" />

            <button>Quyên góp</button>
        </form>
    );
}