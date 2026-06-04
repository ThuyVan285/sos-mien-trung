// src/services/volunteerService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const addVolunteer = async (data) => {
    try {
        const ref = await addDoc(collection(db, "volunteers"), {
            name:         data.name,
            phone:        data.phone,
            email:        data.email || "",
            province:     data.province,
            skills:       data.skills,
            availability: data.availability,
            experience:   data.experience || "",
            note:         data.note || "",
            createdAt:    serverTimestamp(),
        });
        return { success: true, id: ref.id };
    } catch (err) {
        console.error("addVolunteer error:", err);
        return { success: false, error: err };
    }
};