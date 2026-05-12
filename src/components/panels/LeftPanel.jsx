// src/components/panels/LeftPanel.jsx

import mockData from "../../mock/mockData";

export default function LeftPanel() {
    return (
        <div className="left-panel glass">
            <h2>Realtime SOS</h2>

            {mockData.sosRequests.map((item) => (
                <div key={item.id} className="left-panel-item">
                    <strong>{item.name}</strong>

                    <span>{item.province}</span>

                    <div className="item-footer">
                        <span>{item.priority}</span>
                        <span>{item.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}