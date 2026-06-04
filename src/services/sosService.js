// src/services/sosService.js
import {
    collection, addDoc, onSnapshot,
    doc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COL = "sos_requests";

// LỖI #1 ĐƯỢC FIX: Bỏ orderBy — tránh lỗi "requires index" của Firestore
// Thay vào đó sort bằng JS phía client
export const subscribeToSOS = (callback) => {
    const unsubscribe = onSnapshot(
        collection(db, COL),
        (snapshot) => {
            const requests = snapshot.docs
                .map((d) => ({
                    id: d.id,
                    ...d.data(),
                    // Firestore Timestamp → JS Date
                    createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
                }))
                // Sort mới nhất trước (thay cho orderBy)
                .sort((a, b) => b.createdAt - a.createdAt);
            callback(requests);
        },
        (error) => {
            console.error("Firestore subscribe error:", error);
            callback([]); // trả về mảng rỗng thay vì crash
        }
    );
    return unsubscribe;
};

export const addSOSRequest = async (data) => {
    try {
        const ref = await addDoc(collection(db, COL), {
            ...data,
            status:    "urgent",
            priority:  data.level,
            createdAt: serverTimestamp(),
        });
        return { success: true, id: ref.id };
    } catch (err) {
        console.error("addSOSRequest error:", err);
        return { success: false, error: err };
    }
};

export const updateSOSStatus = async (id, status) => {
    try {
        await updateDoc(doc(db, COL, id), { status });
        return { success: true };
    } catch (err) {
        console.error("updateSOSStatus error:", err);
        return { success: false };
    }
};