// src/components/map/Popup.jsx

export default function RequestPopup({ request }) {
    return (
        <div className="request-popup">
            <h3>{request.name}</h3>

            <p>SĐT: {request.phone}</p>
            <p>Địa chỉ: {request.address}</p>
            <p>Hỗ trợ: {request.supportType}</p>
            <p>Trạng thái: {request.status}</p>

            <div className="popup-actions">
                <button>Nhận hỗ trợ</button>
                <button>Hoàn thành</button>
                <button>Huỷ yêu cầu</button>
            </div>
        </div>
    );
}