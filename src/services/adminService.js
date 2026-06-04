// src/services/adminService.js
import {
    collection, onSnapshot, doc,
    updateDoc, deleteDoc, addDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const subscribeCollection = (colName, callback) => {
    return onSnapshot(
        collection(db, colName),
        (snap) => {
            const data = snap.docs
                .map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }))
                .sort((a, b) => b.createdAt - a.createdAt);
            callback(data);
        },
        (err) => { console.error(colName, err); callback([]); }
    );
};

export const updateField   = (col, id, fields) => updateDoc(doc(db, col, id), fields).catch(console.error);
export const deleteDocument= (col, id)         => deleteDoc(doc(db, col, id)).catch(console.error);
export const addDocument   = (col, data)       => addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });