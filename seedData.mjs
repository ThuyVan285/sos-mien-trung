// seedData.mjs
// Chạy: node seedData.mjs
// Yêu cầu: npm install firebase (đã có sẵn trong project)
//
// Sinh dữ liệu ảo từ 10/2025 đến hôm nay cho 3 collections:
//   sos_requests, volunteers, donations

import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, addDoc,
    Timestamp, getDocs, deleteDoc
} from "firebase/firestore";

// ── Config (copy từ firebase.js của bạn) ──────────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyCysI6he-M84NBTHMM82Ly740s_-kCzSUU",
    authDomain: "sos-mien-trung.firebaseapp.com",
    projectId: "sos-mien-trung",
    storageBucket: "sos-mien-trung.firebasestorage.app",
    messagingSenderId: "794126200293",
    appId: "1:794126200293:web:73fbc9caa77fb972d8930c",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Hằng số dữ liệu ──────────────────────────────────────────────────────────
const PROVINCES = [
    { name: "TP. Đà Nẵng",   lat: 16.0544, lng: 108.2022, weight: 18 },
    { name: "TP. Huế",        lat: 16.4637, lng: 107.5909, weight: 14 },
    { name: "Quảng Ngãi",    lat: 15.1214, lng: 108.8048, weight: 16 },
    { name: "Nghệ An",        lat: 18.6791, lng: 105.6818, weight: 10 },
    { name: "Hà Tĩnh",        lat: 18.3429, lng: 105.9059, weight: 8  },
    { name: "Quảng Trị",      lat: 16.7484, lng: 107.1854, weight: 9  },
    { name: "Khánh Hòa",      lat: 12.2388, lng: 109.1967, weight: 7  },
    { name: "Gia Lai",         lat: 13.9833, lng: 108.0000, weight: 6  },
    { name: "Đắk Lắk",        lat: 12.6666, lng: 108.0377, weight: 5  },
    { name: "Lâm Đồng",       lat: 11.9465, lng: 108.4419, weight: 4  },
    { name: "Thanh Hóa",      lat: 19.8079, lng: 105.7754, weight: 3  },
];

const SUPPORT_TYPES = ["Lương thực", "Y tế", "Di tản", "Nước uống", "Chỗ ở", "Khác"];
const LEVELS        = ["high", "medium", "low"];
const STATUSES      = ["urgent", "pending", "helping", "done"];

const FIRST_NAMES = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
const MIDDLE_NAMES = ["Văn", "Thị", "Hữu", "Đức", "Minh", "Thanh", "Quang", "Kim", "Thúy", "Ngọc"];
const LAST_NAMES   = ["An", "Bình", "Châu", "Dũng", "Em", "Giang", "Hà", "Hùng", "Khoa", "Lan", "Mai", "Nam", "Oanh", "Phúc", "Quyên", "Sang", "Thảo", "Uyên", "Vinh", "Xuân"];

const DONATION_TYPES = ["money", "food", "medicine", "clothes", "water", "other"];
const SKILLS_LIST    = ["firstaid", "rescue", "logistics", "cooking", "psychology", "it", "translation", "teaching", "driving", "other"];
const AVAILABILITY   = ["fulltime", "weekend", "evening", "flexible"];

const STREET_PREFIXES = ["Đường", "Hẻm", "Ngõ", "Thôn"];
const STREET_NAMES    = ["Nguyễn Huệ", "Lê Lợi", "Trần Phú", "Hai Bà Trưng", "Đinh Tiên Hoàng", "Lý Thường Kiệt", "Phan Đình Phùng", "Hoàng Diệu", "Bạch Đằng", "Hùng Vương"];
const WARDS           = ["Phường 1", "Phường 2", "Xã An Hòa", "Thôn Bắc", "Thôn Nam", "Khối 3", "Tổ 7", "Khối Tân Thành"];

// ── Helpers ──────────────────────────────────────────────────────────────────
const rand    = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick    = (arr)      => arr[rand(0, arr.length - 1)];
const jitter  = (v, d)     => v + (Math.random() - 0.5) * d;

function weightedProvince() {
    const total = PROVINCES.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * total;
    for (const p of PROVINCES) { r -= p.weight; if (r <= 0) return p; }
    return PROVINCES[0];
}

function randomName() {
    return `${pick(FIRST_NAMES)} ${pick(MIDDLE_NAMES)} ${pick(LAST_NAMES)}`;
}

function randomPhone() {
    const prefixes = ["090", "091", "093", "094", "096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039", "070", "076", "077", "078", "079"];
    return pick(prefixes) + Array.from({length: 7}, () => rand(0,9)).join("");
}

function randomAddress(provinceName) {
    return `${pick(STREET_PREFIXES)} ${pick(STREET_NAMES)}, ${pick(WARDS)}, ${provinceName}`;
}

// Sinh ngày ngẫu nhiên từ startDate đến nay
// Mật độ tăng dần theo thời gian (gần đây nhiều hơn)
function randomDate(startDate, endDate) {
    const start = startDate.getTime();
    const end   = endDate.getTime();
    // Bias về phía cuối (gần đây)
    const t = Math.pow(Math.random(), 0.6); // power < 1 → bias toward end
    return new Date(start + t * (end - start));
}

// Status dựa trên thời gian: cũ hơn → done, mới hơn → urgent/pending
function statusByAge(date, now) {
    const ageHours = (now - date) / 3600000;
    if (ageHours < 6)   return pick(["urgent", "urgent", "pending"]);
    if (ageHours < 24)  return pick(["urgent", "pending", "helping"]);
    if (ageHours < 72)  return pick(["pending", "helping", "done"]);
    if (ageHours < 168) return pick(["helping", "done", "done"]);
    return pick(["done", "done", "done", "helping"]);
}

function toTimestamp(date) {
    return Timestamp.fromDate(date);
}

// ── Clear old data ────────────────────────────────────────────────────────────
async function clearCollection(colName) {
    const snap = await getDocs(collection(db, colName));
    const promises = snap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(promises);
    console.log(`  🗑  Cleared ${snap.size} docs from "${colName}"`);
}

// ── Generate SOS Requests ─────────────────────────────────────────────────────
async function seedSOS(startDate, endDate, count) {
    console.log(`\n🚨 Seeding ${count} SOS requests...`);
    const now = endDate;
    const batch = [];

    for (let i = 0; i < count; i++) {
        const prov   = weightedProvince();
        const date   = randomDate(startDate, endDate);
        const status = statusByAge(date, now);
        const level  = status === "urgent" ? pick(["high", "high", "medium"]) :
                       status === "done"   ? pick(["low", "medium", "high"]) :
                       pick(LEVELS);

        batch.push({
            name:        randomName(),
            phone:       randomPhone(),
            province:    prov.name,
            address:     randomAddress(prov.name),
            supportType: pick(SUPPORT_TYPES),
            level,
            note:        Math.random() > 0.5 ? pick([
                "Cần hỗ trợ khẩn cấp, có người cao tuổi và trẻ nhỏ",
                "Nhà bị ngập nước, cần di tản gấp",
                "Thiếu lương thực, không có điện",
                "Đường bị tắc, không thể ra ngoài",
                "Cần thuốc men cho người bệnh",
                "",
            ]) : "",
            lat:         jitter(prov.lat, 0.08),
            lng:         jitter(prov.lng, 0.08),
            status,
            priority:    level,
            createdAt:   toTimestamp(date),
        });
    }

    // Ghi từng batch 50 docs
    for (let i = 0; i < batch.length; i += 50) {
        const chunk = batch.slice(i, i + 50);
        await Promise.all(chunk.map(d => addDoc(collection(db, "sos_requests"), d)));
        process.stdout.write(`  ✅ ${Math.min(i + 50, batch.length)}/${batch.length}\r`);
    }
    console.log(`  ✅ Done: ${count} SOS requests`);
}

// ── Generate Volunteers ───────────────────────────────────────────────────────
async function seedVolunteers(startDate, endDate, count) {
    console.log(`\n👥 Seeding ${count} volunteers...`);
    const batch = [];

    for (let i = 0; i < count; i++) {
        const prov   = weightedProvince();
        const date   = randomDate(startDate, endDate);
        const numSkills = rand(1, 4);
        const skills = [...SKILLS_LIST].sort(() => Math.random() - 0.5).slice(0, numSkills);

        batch.push({
            name:         randomName(),
            phone:        randomPhone(),
            email:        Math.random() > 0.4 ? `${pick(LAST_NAMES).toLowerCase()}${rand(10,99)}@gmail.com` : "",
            province:     prov.name,
            skills,
            availability: pick(AVAILABILITY),
            experience:   Math.random() > 0.5 ? pick([
                "Đã tham gia cứu trợ lũ lụt 2023 tại Quảng Nam",
                "Tình nguyện viên Chữ thập đỏ 2 năm",
                "Kinh nghiệm sơ cứu và vận chuyển hàng",
                "Từng hỗ trợ bão Damrey 2022",
                "",
            ]) : "",
            note:         "",
            status:       "active",
            createdAt:    toTimestamp(date),
        });
    }

    for (let i = 0; i < batch.length; i += 50) {
        const chunk = batch.slice(i, i + 50);
        await Promise.all(chunk.map(d => addDoc(collection(db, "volunteers"), d)));
    }
    console.log(`  ✅ Done: ${count} volunteers`);
}

// ── Generate Donations ────────────────────────────────────────────────────────
async function seedDonations(startDate, endDate, count) {
    console.log(`\n🎁 Seeding ${count} donations...`);
    const batch = [];

    for (let i = 0; i < count; i++) {
        const date   = randomDate(startDate, endDate);
        const type   = pick(DONATION_TYPES);
        const amount = type === "money" ? pick([
            100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000,
            300000, 150000, 700000, 3000000, 250000,
        ]) : null;

        const ageHours = (endDate - date) / 3600000;
        const status = ageHours < 24 ? "pending" :
                       ageHours < 72 ? pick(["pending", "confirmed"]) :
                       pick(["confirmed", "received", "received"]);

        batch.push({
            name:         randomName(),
            phone:        randomPhone(),
            donationType: type,
            amount,
            note:         Math.random() > 0.6 ? pick([
                "Ủng hộ đồng bào miền Trung",
                "Gửi yêu thương đến người dân vùng lũ",
                "Mong bà con sớm vượt qua khó khăn",
                "",
            ]) : "",
            status,
            createdAt: toTimestamp(date),
        });
    }

    for (let i = 0; i < batch.length; i += 50) {
        const chunk = batch.slice(i, i + 50);
        await Promise.all(chunk.map(d => addDoc(collection(db, "donations"), d)));
    }
    console.log(`  ✅ Done: ${count} donations`);
}

// ── Generate Supplies ─────────────────────────────────────────────────────────
async function seedSupplies() {
    console.log(`\n📦 Seeding supplies...`);
    const items = [
        { name: "Gạo ST25",          category: "food",      quantity: 2500, unit: "kg",   minQuantity: 500,  location: "TP. Đà Nẵng" },
        { name: "Mì tôm Hảo Hảo",    category: "food",      quantity: 1800, unit: "thùng",minQuantity: 200,  location: "TP. Đà Nẵng" },
        { name: "Nước suối Aqua",     category: "water",     quantity: 950,  unit: "thùng",minQuantity: 300,  location: "Quảng Ngãi"  },
        { name: "Thuốc cảm Panadol",  category: "medicine",  quantity: 120,  unit: "hộp",  minQuantity: 50,   location: "TP. Huế"     },
        { name: "Băng gạc y tế",      category: "medicine",  quantity: 80,   unit: "kg",   minQuantity: 30,   location: "TP. Huế"     },
        { name: "Quần áo trẻ em",     category: "clothes",   quantity: 340,  unit: "bộ",   minQuantity: 100,  location: "Nghệ An"     },
        { name: "Chăn bông",          category: "clothes",   quantity: 210,  unit: "cái",  minQuantity: 80,   location: "Quảng Trị"   },
        { name: "Áo phao cứu hộ",     category: "equipment", quantity: 45,   unit: "cái",  minQuantity: 20,   location: "TP. Đà Nẵng" },
        { name: "Xuồng cứu hộ",       category: "equipment", quantity: 8,    unit: "cái",  minQuantity: 3,    location: "TP. Đà Nẵng" },
        { name: "Lương khô quân đội", category: "food",      quantity: 600,  unit: "hộp",  minQuantity: 100,  location: "Khánh Hòa"   },
        { name: "Bình lọc nước",      category: "equipment", quantity: 25,   unit: "cái",  minQuantity: 10,   location: "Gia Lai"     },
        { name: "Dầu ăn Neptune",     category: "food",      quantity: 180,  unit: "lít",  minQuantity: 50,   location: "Quảng Ngãi"  },
    ];

    const now = Timestamp.now();
    for (const item of items) {
        await addDoc(collection(db, "supplies"), { ...item, createdAt: now });
    }
    console.log(`  ✅ Done: ${items.length} supply items`);
}

// ── Generate Alerts ───────────────────────────────────────────────────────────
async function seedAlerts() {
    console.log(`\n🔔 Seeding alerts...`);
    const now = new Date();
    const alerts = [
        { title: "Ngập lụt nghiêm trọng tại Quảng Ngãi", message: "Mực nước sông Trà Khúc dâng cao, 3 xã bị cô lập. Cần khẩn cấp hỗ trợ di tản.", level: "critical", province: "Quảng Ngãi", active: true },
        { title: "Sạt lở đường QL1A đoạn Bình Định", message: "Đoạn km 1156 bị sạt lở nghiêm trọng, giao thông tê liệt. Phương tiện vòng tránh.", level: "warning",  province: "Bình Định",  active: true },
        { title: "Áp thấp nhiệt đới đang vào bờ",    message: "Dự báo áp thấp sẽ vào đất liền tại khu vực Đà Nẵng - Quảng Nam trong 24h tới.", level: "warning",  province: "TP. Đà Nẵng", active: true },
        { title: "Đã thông xe QL14B đoạn Hòa Vang",  message: "Đội cứu hộ đã giải phóng hiện trường sạt lở. Giao thông bình thường trở lại.",   level: "info",     province: "TP. Đà Nẵng", active: false },
    ];

    for (const a of alerts) {
        await addDoc(collection(db, "alerts"), {
            ...a,
            createdAt: Timestamp.fromDate(new Date(now.getTime() - rand(0, 72) * 3600000)),
        });
    }
    console.log(`  ✅ Done: ${alerts.length} alerts`);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  SOS Miền Trung — Seed Database          ║");
    console.log("╚══════════════════════════════════════════╝\n");

    const startDate = new Date("2025-10-01T00:00:00");
    const endDate   = new Date(); // hôm nay
    const days      = Math.ceil((endDate - startDate) / 86400000);

    console.log(`📅 Từ: ${startDate.toLocaleDateString("vi-VN")}`);
    console.log(`📅 Đến: ${endDate.toLocaleDateString("vi-VN")} (${days} ngày)\n`);

    // Tính số lượng theo số ngày thực tế
    // ~1.2 SOS/ngày, ~0.4 TNV/ngày, ~0.6 donation/ngày
    const sosCount  = Math.floor(days * 1.2) + rand(10, 30);
    const volCount  = Math.floor(days * 0.4) + rand(5, 15);
    const donCount  = Math.floor(days * 0.6) + rand(8, 20);

    console.log(`📊 Sẽ tạo: ${sosCount} SOS | ${volCount} TNV | ${donCount} Donations\n`);

    // Hỏi xác nhận (nếu muốn bỏ qua, comment dòng dưới)
    console.log("⚠️  Sẽ XÓA toàn bộ dữ liệu cũ trước khi seed. Tiếp tục?\n");
    await new Promise(r => setTimeout(r, 1500)); // delay nhỏ để đọc

    // Clear
    console.log("🗑  Clearing old data...");
    await clearCollection("sos_requests");
    await clearCollection("volunteers");
    await clearCollection("donations");
    await clearCollection("supplies");
    await clearCollection("alerts");

    // Seed
    await seedSOS(startDate, endDate, sosCount);
    await seedVolunteers(startDate, endDate, volCount);
    await seedDonations(startDate, endDate, donCount);
    await seedSupplies();
    await seedAlerts();

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║  ✅ SEED HOÀN TẤT!                       ║");
    console.log(`║  🚨 SOS:     ${String(sosCount).padEnd(4)} requests             ║`);
    console.log(`║  👥 TNV:     ${String(volCount).padEnd(4)} volunteers            ║`);
    console.log(`║  🎁 Donate:  ${String(donCount).padEnd(4)} donations             ║`);
    console.log("╚══════════════════════════════════════════╝\n");

    process.exit(0);
}

main().catch(err => {
    console.error("❌ Seed error:", err);
    process.exit(1);
});
