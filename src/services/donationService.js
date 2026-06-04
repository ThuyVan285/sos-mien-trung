// src/services/donationService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const addDonation = async (data) => {
    try {
        const ref = await addDoc(collection(db, "donations"), {
            name:         data.name,
            phone:        data.phone,
            donationType: data.donationType,
            amount:       data.amount ? Number(data.amount) : null,
            note:         data.note || "",
            createdAt:    serverTimestamp(),
        });
        return { success: true, id: ref.id };
    } catch (err) {
        console.error("addDonation error:", err);
        return { success: false, error: err };
    }
};