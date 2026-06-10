// src/store/SOSContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";

const SOSContext = createContext(null);

// Tọa độ gần đúng theo tỉnh
const PROVINCE_COORDS = {
    "Thanh Hóa":      [19.8079, 105.7754],
    "Nghệ An":        [18.6791, 105.6818],
    "Hà Tĩnh":        [18.3429, 105.9059],
    "Quảng Bình":     [17.4689, 106.5996],
    "Quảng Trị":      [16.7484, 107.1854],
    "TP. Huế":        [16.4637, 107.5909],
    "TP. Đà Nẵng":    [16.0544, 108.2022],
    "Quảng Nam":      [15.5394, 108.0191],
    "Quảng Ngãi":     [15.1214, 108.8048],
    "Bình Định":      [14.1665, 108.9022],
    "Phú Yên":        [13.0882, 109.0928],
    "Khánh Hòa":      [12.2388, 109.1967],
    "Ninh Thuận":     [11.5638, 108.9880],
    "Bình Thuận":     [11.0904, 108.0721],
    "Gia Lai":        [13.9833, 108.0000],
    "Kon Tum":        [14.3497, 108.0005],
    "Đắk Lắk":       [12.6666, 108.0377],
    "Đắk Nông":       [12.0046, 107.6876],
    "Lâm Đồng":       [11.9465, 108.4419],
};

export function SOSProvider({ children }) {
    const [sosRequests, setSosRequests] = useState([]);
    const [loading, setLoading]         = useState(true);

    const [isFormOpen,      setIsFormOpen]      = useState(false);
    const [isDonationOpen,  setIsDonationOpen]  = useState(false);
    const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // ── Lắng nghe Firestore realtime ──────────────────────────
    useEffect(() => {
        const q = query(
            collection(db, "sos_requests"),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
                // Chuyển Firestore Timestamp → JS Date
                createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
            }));
            setSosRequests(data);
            setLoading(false);
        }, (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // ── Thêm SOS mới vào Firestore ─────────────────────────────
    const addSOSRequest = async (newRequest) => {
        const coords = PROVINCE_COORDS[newRequest.province] ?? [16.0, 108.0];
        const jitter = () => (Math.random() - 0.5) * 0.1;

        const docData = {
            name:        newRequest.name,
            phone:       newRequest.phone,
            province:    newRequest.province,
            address:     `${newRequest.address}, ${newRequest.province}`,
            supportType: newRequest.supportType,
            level:       newRequest.level,
            priority:    newRequest.level,
            note:        newRequest.note || "",
            status:      "urgent",
            lat:         coords[0] + jitter(),
            lng:         coords[1] + jitter(),
            createdAt:   serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "sos_requests"), docData);
        return { id: docRef.id, ...docData, createdAt: new Date() };
    };

    // ── Cập nhật trạng thái SOS ────────────────────────────────
    const updateStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, "sos_requests", id), { status });
        } catch (err) {
            console.error("updateStatus error:", err);
        }
    };

    return (
        <SOSContext.Provider
            value={{
                sosRequests,
                loading,
                isFormOpen,      setIsFormOpen,
                isDonationOpen,  setIsDonationOpen,
                isVolunteerOpen, setIsVolunteerOpen,
                selectedRequest, setSelectedRequest,
                addSOSRequest,
                updateStatus,
            }}
        >
            {children}
        </SOSContext.Provider>
    );
}

export function useSOS() {
    return useContext(SOSContext);
}