// src/layouts/FloatMenu.jsx

import { useNavigate } from "react-router-dom";
import { useSOS } from "../store/SOSContext";

export default function FloatMenu() {
    const { setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen } = useSOS();
    const navigate = useNavigate();

    return (
        <div className="float-menu">
            <button className="float-btn pulse-red" onClick={() => setIsFormOpen(true)} title="Gửi SOS">🚨</button>
            <button className="float-btn" onClick={() => setIsDonationOpen(true)} title="Quyên góp">🎁</button>
            <button className="float-btn" onClick={() => setIsVolunteerOpen(true)} title="Tình nguyện viên">🧑‍🚒</button>
            <button className="float-btn" onClick={() => navigate("/map")} title="Bản đồ">📍</button>
        </div>
    );
}