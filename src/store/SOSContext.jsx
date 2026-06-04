// src/store/SOSContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { subscribeToSOS, addSOSRequest as saveToDB, updateSOSStatus } from "../services/sosService";

const SOSContext = createContext(null);

export function SOSProvider({ children }) {
    const [sosRequests, setSosRequests]         = useState([]);
    const [loading, setLoading]                 = useState(true);
    const [isFormOpen, setIsFormOpen]           = useState(false);
    const [isDonationOpen, setIsDonationOpen]   = useState(false);
    const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        // LỖI #2 ĐƯỢC FIX: subscribeToSOS trả về unsubscribe function
        // phải gọi nó khi component unmount để tránh memory leak
        const unsubscribe = subscribeToSOS((data) => {
            setSosRequests(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // LỖI #3 ĐƯỢC FIX: addSOSRequest phải là async và await saveToDB
    const addSOSRequest = async (newRequest) => {
        const result = await saveToDB(newRequest);
        // Không cần setSosRequests — onSnapshot tự cập nhật
        return result;
    };

    // LỖI #4 ĐƯỢC FIX: updateStatus phải await
    const updateStatus = async (id, status) => {
        await updateSOSStatus(id, status);
    };

    return (
        <SOSContext.Provider value={{
            sosRequests,
            loading,
            isFormOpen,      setIsFormOpen,
            isDonationOpen,  setIsDonationOpen,
            isVolunteerOpen, setIsVolunteerOpen,
            selectedRequest, setSelectedRequest,
            addSOSRequest,
            updateStatus,
        }}>
            {children}
        </SOSContext.Provider>
    );
}

export function useSOS() {
    return useContext(SOSContext);
}