// src/services/firestoreService.js
//
// Collections:
//   sos_requests   — yêu cầu cứu trợ
//   volunteers     — tình nguyện viên
//   donations      — quyên góp

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/* ═══════════════════════════════════════
   SOS REQUESTS
═══════════════════════════════════════ */

/**
 * Thêm 1 yêu cầu SOS mới vào Firestore
 * @param {Object} data — dữ liệu từ SOSForm
 * @returns {string} id document vừa tạo
 */
export async function addSOSRequest(data) {
    const docRef = await addDoc(collection(db, "sos_requests"), {
        name:        data.name,
        phone:       data.phone,
        province:    data.province,
        address:     data.address,
        supportType: data.supportType,
        level:       data.level,          // "high" | "medium" | "low"
        note:        data.note || "",
        lat:         data.lat,
        lng:         data.lng,
        status:      "urgent",            // urgent | pending | helping | done
        priority:    data.level,
        createdAt:   serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Lấy tất cả SOS requests (1 lần)
 * @returns {Array} danh sách requests
 */
export async function getSOSRequests() {
    const q = query(
        collection(db, "sos_requests"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp → JS Date
        createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
}

/**
 * Lắng nghe SOS requests realtime (dùng trong SOSContext)
 * @param {Function} callback — nhận array mới mỗi khi có thay đổi
 * @returns {Function} unsubscribe — gọi khi component unmount
 */
export function subscribeSOSRequests(callback) {
    const q = query(
        collection(db, "sos_requests"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        callback(data);
    });
}

/**
 * Cập nhật status của 1 SOS request
 * @param {string} id
 * @param {string} status — "urgent" | "pending" | "helping" | "done"
 */
export async function updateSOSStatus(id, status) {
    const ref = doc(db, "sos_requests", id);
    await updateDoc(ref, { status, updatedAt: serverTimestamp() });
}

/**
 * Xoá 1 SOS request
 * @param {string} id
 */
export async function deleteSOSRequest(id) {
    await deleteDoc(doc(db, "sos_requests", id));
}

/**
 * Lọc SOS theo tỉnh
 * @param {string} province
 */
export async function getSOSByProvince(province) {
    const q = query(
        collection(db, "sos_requests"),
        where("province", "==", province),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/* ═══════════════════════════════════════
   VOLUNTEERS
═══════════════════════════════════════ */

/**
 * Đăng ký tình nguyện viên mới
 * @param {Object} data — dữ liệu từ VolunteerForm
 * @returns {string} id
 */
export async function addVolunteer(data) {
    const docRef = await addDoc(collection(db, "volunteers"), {
        name:         data.name,
        phone:        data.phone,
        email:        data.email || "",
        province:     data.province,
        skills:       data.skills,        // array
        availability: data.availability,  // "fulltime" | "weekend" | "evening" | "flexible"
        experience:   data.experience || "",
        note:         data.note || "",
        status:       "active",           // active | inactive
        createdAt:    serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Lấy tất cả tình nguyện viên
 */
export async function getVolunteers() {
    const q = query(
        collection(db, "volunteers"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
}

/**
 * Lắng nghe volunteers realtime
 */
export function subscribeVolunteers(callback) {
    const q = query(
        collection(db, "volunteers"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        callback(data);
    });
}

/**
 * Lọc TNV theo tỉnh
 */
export async function getVolunteersByProvince(province) {
    const q = query(
        collection(db, "volunteers"),
        where("province", "==", province)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/* ═══════════════════════════════════════
   DONATIONS
═══════════════════════════════════════ */

/**
 * Đăng ký quyên góp mới
 * @param {Object} data — dữ liệu từ DonationForm
 * @returns {string} id
 */
export async function addDonation(data) {
    const docRef = await addDoc(collection(db, "donations"), {
        name:         data.name,
        phone:        data.phone,
        donationType: data.donationType, // "money" | "food" | "medicine" | ...
        amount:       data.amount ? Number(data.amount) : null,
        note:         data.note || "",
        status:       "pending",         // pending | confirmed | received
        createdAt:    serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Lấy tất cả donations
 */
export async function getDonations() {
    const q = query(
        collection(db, "donations"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
}

/**
 * Lắng nghe donations realtime
 */
export function subscribeDonations(callback) {
    const q = query(
        collection(db, "donations"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        callback(data);
    });
}

/**
 * Cập nhật status donation
 */
export async function updateDonationStatus(id, status) {
    const ref = doc(db, "donations", id);
    await updateDoc(ref, { status, updatedAt: serverTimestamp() });
}