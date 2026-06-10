// seedData.mjs — Demo-ready seed
// Chạy: node seedData.mjs
// Tỷ lệ status: urgent 25% | pending 20% | helping 30% | done 25%

import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, addDoc,
    Timestamp, getDocs, deleteDoc
} from "firebase/firestore";

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

// ── Constants ─────────────────────────────────────────────────────────────────
const PROVINCES = [
    { name: "TP. Đà Nẵng",  lat: 16.0544, lng: 108.2022, w: 18 },
    { name: "Quảng Ngãi",   lat: 15.1214, lng: 108.8048, w: 16 },
    { name: "TP. Huế",      lat: 16.4637, lng: 107.5909, w: 14 },
    { name: "Nghệ An",      lat: 18.6791, lng: 105.6818, w: 10 },
    { name: "Quảng Trị",    lat: 16.7484, lng: 107.1854, w:  9 },
    { name: "Hà Tĩnh",      lat: 18.3429, lng: 105.9059, w:  8 },
    { name: "Khánh Hòa",    lat: 12.2388, lng: 109.1967, w:  7 },
    { name: "Gia Lai",      lat: 13.9833, lng: 108.0000, w:  6 },
    { name: "Đắk Lắk",     lat: 12.6666, lng: 108.0377, w:  5 },
    { name: "Lâm Đồng",    lat: 11.9465, lng: 108.4419, w:  4 },
    { name: "Thanh Hóa",   lat: 19.8079, lng: 105.7754, w:  3 },
];

const SUPPORT_TYPES = ["Lương thực", "Y tế", "Di tản", "Nước uống", "Chỗ ở", "Khác"];
const FIRST_NAMES  = ["Nguyễn","Trần","Lê","Phạm","Hoàng","Phan","Vũ","Đặng","Bùi","Hồ"];
const MIDDLE_NAMES = ["Văn","Thị","Hữu","Đức","Minh","Thanh","Quang","Kim","Ngọc"];
const LAST_NAMES   = ["An","Bình","Dũng","Giang","Hà","Hùng","Khoa","Lan","Mai","Nam","Oanh","Phúc","Sang","Thảo","Vinh","Xuân"];
const PHONES       = ["090","091","093","096","097","032","033","034","035","036","037","038","070","076","077","078","079"];
const STREETS      = ["Nguyễn Huệ","Lê Lợi","Trần Phú","Hai Bà Trưng","Đinh Tiên Hoàng","Lý Thường Kiệt","Bạch Đằng","Hùng Vương"];
const WARDS        = ["Phường 1","Phường 2","Xã An Hòa","Thôn Bắc","Khối 3","Tổ 7"];
const NOTES_SOS    = [
    "Cần hỗ trợ khẩn cấp, có người cao tuổi và trẻ nhỏ",
    "Nhà bị ngập nước, cần di tản gấp",
    "Thiếu lương thực, không có điện",
    "Đường bị tắc, không thể ra ngoài",
    "Cần thuốc men cho người bệnh",
    "",
];
const SKILLS_LIST  = ["firstaid","rescue","logistics","cooking","psychology","it","translation","driving","other"];
const AVAILABILITY = ["fulltime","weekend","evening","flexible"];
const DONA_TYPES   = ["money","food","medicine","clothes","water","other"];
const DONA_NOTES   = ["Ủng hộ đồng bào miền Trung","Gửi yêu thương đến người dân vùng lũ","Mong bà con sớm vượt qua khó khăn",""];

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand   = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick   = arr    => arr[rand(0, arr.length - 1)];
const jitter = (v, d) => v + (Math.random() - 0.5) * d;
const ts     = d      => Timestamp.fromDate(d);

function weightedProv() {
    const total = PROVINCES.reduce((s, p) => s + p.w, 0);
    let r = Math.random() * total;
    for (const p of PROVINCES) { r -= p.w; if (r <= 0) return p; }
    return PROVINCES[0];
}
function randName() { return `${pick(FIRST_NAMES)} ${pick(MIDDLE_NAMES)} ${pick(LAST_NAMES)}`; }
function randPhone() { return pick(PHONES) + Array.from({length:7}, () => rand(0,9)).join(""); }
function randAddr(prov) { return `${rand(1,200)} ${pick(STREETS)}, ${pick(WARDS)}, ${prov}`; }

// Ngày ngẫu nhiên trong khoảng, bias về gần đây
function randDate(start, end) {
    const t = Math.pow(Math.random(), 0.7);
    return new Date(start.getTime() + t * (end.getTime() - start.getTime()));
}

// ── DEMO-FRIENDLY status distribution ────────────────────────────────────────
// urgent 25% | pending 20% | helping 30% | done 25%
// Điểm quan trọng: bản đồ sẽ hiển thị MÀU SẮC đa dạng, không bị áp đảo bởi xanh lá
function demoStatus(date, now) {
    const ageH = (now - date) / 3_600_000;
    const r = Math.random();

    if (ageH < 3)   return r < 0.6 ? "urgent"  : r < 0.9 ? "pending"  : "helping";
    if (ageH < 12)  return r < 0.35 ? "urgent" : r < 0.6 ? "pending"  : r < 0.85 ? "helping" : "done";
    if (ageH < 48)  return r < 0.2 ? "urgent"  : r < 0.4 ? "pending"  : r < 0.7 ? "helping"  : "done";
    // > 48h: thiên về done nhưng vẫn còn active
    return r < 0.1 ? "urgent" : r < 0.2 ? "pending" : r < 0.4 ? "helping" : "done";
}

// ── Clear ─────────────────────────────────────────────────────────────────────
async function clearCol(name) {
    const snap = await getDocs(collection(db, name));
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
    console.log(`  🗑  Cleared ${snap.size} docs from "${name}"`);
}

// ── SOS Requests ──────────────────────────────────────────────────────────────
// Phân bổ cụ thể để demo đẹp:
//   ~25 urgent (đỏ) | ~20 pending (vàng) | ~30 helping (xanh dương) | ~25 done (xanh lá)
async function seedSOS(start, end, total) {
    console.log(`\n🚨 Seeding ${total} SOS requests (demo-balanced)...`);
    const now = end;

    // Đảm bảo phân phối màu sắc đẹp cho bản đồ
    const quotas = {
        urgent:  Math.round(total * 0.25),
        pending: Math.round(total * 0.20),
        helping: Math.round(total * 0.30),
        done:    total - Math.round(total*0.25) - Math.round(total*0.20) - Math.round(total*0.30),
    };

    const docs = [];
    for (const [status, count] of Object.entries(quotas)) {
        for (let i = 0; i < count; i++) {
            const prov   = weightedProv();
            // Urgent/pending → gần đây hơn; done → cũ hơn
            const maxAge = status === "urgent" ? 3 :
                status === "pending" ? 12 :
                    status === "helping" ? 48 : 240; // hours
            const minAge = status === "done" ? 24 : 0;
            const ageH   = minAge + Math.random() * (maxAge - minAge);
            const date   = new Date(now.getTime() - ageH * 3_600_000);
            const level  = status === "urgent"  ? pick(["high","high","medium"]) :
                status === "pending" ? pick(["medium","high","low"])  :
                    status === "helping" ? pick(["high","medium","medium"]) :
                        pick(["low","medium","high"]);

            docs.push({
                name:        randName(),
                phone:       randPhone(),
                province:    prov.name,
                address:     randAddr(prov.name),
                supportType: pick(SUPPORT_TYPES),
                level,
                note:        Math.random() > 0.5 ? pick(NOTES_SOS) : "",
                lat:         jitter(prov.lat, 0.06),
                lng:         jitter(prov.lng, 0.06),
                status,
                priority:    level,
                createdAt:   ts(date),
            });
        }
    }

    // Shuffle để không bị group theo status
    docs.sort(() => Math.random() - 0.5);

    for (let i = 0; i < docs.length; i += 40) {
        await Promise.all(docs.slice(i, i+40).map(d => addDoc(collection(db, "sos_requests"), d)));
        process.stdout.write(`  ✅ ${Math.min(i+40, docs.length)}/${docs.length}\r`);
    }
    console.log(`\n  ✅ Done: ${total} SOS  [urgent:${quotas.urgent} pending:${quotas.pending} helping:${quotas.helping} done:${quotas.done}]`);
}

// ── Volunteers ────────────────────────────────────────────────────────────────
async function seedVolunteers(start, end, count) {
    console.log(`\n👥 Seeding ${count} volunteers...`);
    const docs = [];
    for (let i = 0; i < count; i++) {
        const prov = weightedProv();
        const date = randDate(start, end);
        const numS = rand(1, 4);
        const skills = [...SKILLS_LIST].sort(() => Math.random()-0.5).slice(0, numS);
        docs.push({
            name:         randName(),
            phone:        randPhone(),
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
            createdAt:    ts(date),
        });
    }
    for (let i = 0; i < docs.length; i += 40) {
        await Promise.all(docs.slice(i, i+40).map(d => addDoc(collection(db, "volunteers"), d)));
    }
    console.log(`  ✅ Done: ${count} volunteers`);
}

// ── Donations ─────────────────────────────────────────────────────────────────
async function seedDonations(start, end, count) {
    console.log(`\n🎁 Seeding ${count} donations...`);
    const docs = [];
    for (let i = 0; i < count; i++) {
        const date  = randDate(start, end);
        const type  = pick(DONA_TYPES);
        const amount = type === "money" ? pick([100000,200000,300000,500000,700000,1000000,2000000,5000000]) : null;
        const ageH  = (end - date) / 3_600_000;
        const status = ageH < 24 ? "pending" : ageH < 72 ? pick(["pending","confirmed"]) : pick(["confirmed","received","received"]);
        docs.push({
            name:         randName(),
            phone:        randPhone(),
            donationType: type,
            amount,
            note:         Math.random() > 0.6 ? pick(DONA_NOTES) : "",
            status,
            createdAt:    ts(date),
        });
    }
    for (let i = 0; i < docs.length; i += 40) {
        await Promise.all(docs.slice(i, i+40).map(d => addDoc(collection(db, "donations"), d)));
    }
    console.log(`  ✅ Done: ${count} donations`);
}

// ── Supplies ──────────────────────────────────────────────────────────────────
async function seedSupplies() {
    console.log(`\n📦 Seeding supplies...`);
    const items = [
        { name:"Gạo ST25",         category:"food",      quantity:2500, unit:"kg",    minQuantity:500,  location:"TP. Đà Nẵng" },
        { name:"Mì tôm Hảo Hảo",  category:"food",      quantity:1800, unit:"thùng", minQuantity:200,  location:"TP. Đà Nẵng" },
        { name:"Nước suối Aqua",   category:"water",     quantity:950,  unit:"thùng", minQuantity:300,  location:"Quảng Ngãi"  },
        { name:"Thuốc cảm Panadol",category:"medicine",  quantity:120,  unit:"hộp",   minQuantity:50,   location:"TP. Huế"     },
        { name:"Băng gạc y tế",    category:"medicine",  quantity:80,   unit:"kg",    minQuantity:30,   location:"TP. Huế"     },
        { name:"Quần áo trẻ em",   category:"clothes",   quantity:340,  unit:"bộ",    minQuantity:100,  location:"Nghệ An"     },
        { name:"Chăn bông",        category:"clothes",   quantity:210,  unit:"cái",   minQuantity:80,   location:"Quảng Trị"   },
        { name:"Áo phao cứu hộ",   category:"equipment", quantity:45,   unit:"cái",   minQuantity:20,   location:"TP. Đà Nẵng" },
        { name:"Xuồng cứu hộ",     category:"equipment", quantity:8,    unit:"cái",   minQuantity:3,    location:"TP. Đà Nẵng" },
        { name:"Lương khô",        category:"food",      quantity:600,  unit:"hộp",   minQuantity:100,  location:"Khánh Hòa"   },
        { name:"Bình lọc nước",    category:"equipment", quantity:25,   unit:"cái",   minQuantity:10,   location:"Gia Lai"     },
        { name:"Dầu ăn Neptune",   category:"food",      quantity:180,  unit:"lít",   minQuantity:50,   location:"Quảng Ngãi"  },
    ];
    const now = Timestamp.now();
    for (const item of items) await addDoc(collection(db, "supplies"), { ...item, createdAt: now });
    console.log(`  ✅ Done: ${items.length} supply items`);
}

// ── Alerts ────────────────────────────────────────────────────────────────────
async function seedAlerts() {
    console.log(`\n🔔 Seeding alerts...`);
    const now = new Date();
    const alerts = [
        { title:"Ngập lụt nghiêm trọng tại Quảng Ngãi",  message:"Mực nước sông Trà Khúc dâng cao, 3 xã bị cô lập. Cần khẩn cấp hỗ trợ di tản.", level:"critical", province:"Quảng Ngãi",  active:true  },
        { title:"Sạt lở đường QL1A đoạn Bình Định",       message:"Đoạn km 1156 bị sạt lở nghiêm trọng, giao thông tê liệt.",                      level:"warning",  province:"Bình Định",   active:true  },
        { title:"Áp thấp nhiệt đới đang vào bờ",          message:"Dự báo áp thấp sẽ vào đất liền tại khu vực Đà Nẵng - Quảng Nam trong 24h tới.",  level:"warning",  province:"TP. Đà Nẵng",active:true  },
        { title:"Đã thông xe QL14B đoạn Hòa Vang",        message:"Đội cứu hộ đã giải phóng hiện trường. Giao thông bình thường trở lại.",           level:"info",     province:"TP. Đà Nẵng",active:false },
    ];
    for (const a of alerts) {
        await addDoc(collection(db, "alerts"), {
            ...a,
            createdAt: Timestamp.fromDate(new Date(now.getTime() - rand(0, 72) * 3_600_000)),
        });
    }
    console.log(`  ✅ Done: ${alerts.length} alerts`);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  SOS Miền Trung — Seed (Demo Edition)    ║");
    console.log("╚══════════════════════════════════════════╝\n");

    const start = new Date("2025-10-01T00:00:00");
    const end   = new Date();
    const days  = Math.ceil((end - start) / 86_400_000);

    // Demo-friendly counts: đủ dữ liệu nhưng không quá nhiều
    const sosCount  = 100;  // phân bổ rõ 4 màu trên bản đồ
    const volCount  = 45;
    const donCount  = 60;

    console.log(`📅 ${start.toLocaleDateString("vi-VN")} → ${end.toLocaleDateString("vi-VN")} (${days} ngày)`);
    console.log(`📊 SOS: ${sosCount} | TNV: ${volCount} | Donations: ${donCount}`);
    console.log(`🗺  Phân bổ màu bản đồ: 🔴 25 urgent | 🟡 20 pending | 🔵 30 helping | 🟢 25 done\n`);

    console.log("🗑  Clearing old data...");
    await clearCol("sos_requests");
    await clearCol("volunteers");
    await clearCol("donations");
    await clearCol("supplies");
    await clearCol("alerts");

    await seedSOS(start, end, sosCount);
    await seedVolunteers(start, end, volCount);
    await seedDonations(start, end, donCount);
    await seedSupplies();
    await seedAlerts();

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║  ✅ SEED HOÀN TẤT — DEMO READY!          ║");
    console.log(`║  🔴 Urgent:  25   🟡 Pending: 20         ║`);
    console.log(`║  🔵 Helping: 30   🟢 Done:    25         ║`);
    console.log(`║  👥 TNV:     ${volCount}   🎁 Donations: ${donCount}     ║`);
    console.log("╚══════════════════════════════════════════╝\n");

    process.exit(0);
}

main().catch(err => { console.error("❌", err); process.exit(1); });