// src/mock/mockData.js

const mockData = {
    sosRequests: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            phone: "0901234567",
            address: "Quảng Ngãi",
            province: "Quảng Ngãi",
            supportType: "Lương thực",
            status: "urgent",
            priority: "high",
            lat: 15.1205,
            lng: 108.7923,
        },

        {
            id: 2,
            name: "Trần Thị B",
            phone: "0911222333",
            address: "Huế",
            province: "Huế",
            supportType: "Y tế",
            status: "pending",
            priority: "medium",
            lat: 16.4637,
            lng: 107.5909,
        },

        {
            id: 3,
            name: "Lê Văn C",
            phone: "0988777666",
            address: "Đà Nẵng",
            province: "Đà Nẵng",
            supportType: "Di tản",
            status: "helping",
            priority: "high",
            lat: 16.0544,
            lng: 108.2022,
        },
    ],

    volunteers: [
        {
            id: 1,
            name: "TNV 01",
        },
    ],

    supportPoints: [
        {
            id: 1,
            name: "Điểm cứu trợ Đà Nẵng",
            lat: 16.0544,
            lng: 108.2022,
        },
    ],
};

export default mockData;