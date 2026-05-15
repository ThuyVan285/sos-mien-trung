// src/store/SOSContext.jsx

import { createContext, useContext, useState } from "react";
import mockData from "../mock/mockData";

const SOSContext = createContext(null);

export function SOSProvider({ children }) {
    const [sosRequests, setSosRequests] = useState(mockData.sosRequests);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDonationOpen, setIsDonationOpen] = useState(false);
    const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const addSOSRequest = (newRequest) => {
        const request = {
            ...newRequest,
            id: Date.now(),
            status: "urgent",
            priority: newRequest.level,
            createdAt: new Date(),
        };
        setSosRequests((prev) => [request, ...prev]);
        return request;
    };

    const updateStatus = (id, status) => {
        setSosRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
    };

    return (
        <SOSContext.Provider
            value={{
                sosRequests,
                isFormOpen,
                setIsFormOpen,
                isDonationOpen,
                setIsDonationOpen,
                isVolunteerOpen,
                setIsVolunteerOpen,
                selectedRequest,
                setSelectedRequest,
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