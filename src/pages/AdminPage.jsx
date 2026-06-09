// src/pages/AdminPage.jsx
import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    LayoutDashboard, Siren, Map, Users, Package, Home, Gift,
    TrendingUp, Bell, Settings, Shield, Trash2, Search, Plus,
    Clock, MapPin, Phone, Activity, CheckCircle2, ClipboardList,
    AlertOctagon, AlertTriangle, Info, UserCheck, Utensils, Droplets,
    Pill, Shirt, Wrench, Loader2, LogOut, Save, Megaphone, Bot,
    PenLine, Link2, Banknote, ArrowLeft, ArrowRight, X,
} from "lucide-react";
import { subscribeCollection, updateField, deleteDocument, addDocument } from "../services/adminService";

const ADMIN_PASSWORD = "admin2026";

// ─── Constants ────────────────────────────────────────────────────────────────
const S = {
    urgent:  { label:"Khẩn cấp",    color:"#dc2626", bg:"#fef2f2", border:"#fca5a5" },
    pending: { label:"Chờ xử lý",   color:"#d97706", bg:"#fffbeb", border:"#fcd34d" },
    helping: { label:"Đang hỗ trợ", color:"#2563eb", bg:"#eff6ff", border:"#93c5fd" },
    done:    { label:"Hoàn thành",  color:"#16a34a", bg:"#f0fdf4", border:"#86efac" },
};
const NEXT = { urgent:"helping", helping:"done", done:"urgent", pending:"helping" };
const SUPPLY_CAT = { food:"Lương thực", water:"Nước uống", medicine:"Thuốc", clothes:"Quần áo", equipment:"Thiết bị", other:"Khác" };
const SUPPLY_ICON_MAP = { food:Utensils, water:Droplets, medicine:Pill, clothes:Shirt, equipment:Wrench, other:Package };
const SUPPLY_UNITS = ["kg","lít","cái","bộ","thùng","hộp","túi"];
const PROVINCES = ["Tất cả","Đà Nẵng","Huế","Quảng Ngãi","Quảng Nam","Quảng Trị","Khánh Hòa","Nghệ An","Hà Tĩnh","Bình Định","Gia Lai"];
const ALERT_LEVELS = {
    critical: { label:"Nghiêm trọng", color:"#dc2626", bg:"#fef2f2", Icon:AlertOctagon  },
    warning:  { label:"Cảnh báo",     color:"#d97706", bg:"#fffbeb", Icon:AlertTriangle },
    info:     { label:"Thông tin",    color:"#2563eb", bg:"#eff6ff", Icon:Info          },
};
const SKILLS_MAP = { firstaid:"Sơ cứu",rescue:"Cứu hộ",logistics:"Vận chuyển",cooking:"Nấu ăn",psychology:"Tâm lý",it:"CNTT",translation:"Phiên dịch",teaching:"Dạy học",driving:"Lái xe",other:"Khác" };
const SIDEBAR_MENU = [
    { key:"dashboard",  Icon:LayoutDashboard, label:"Dashboard"         },
    { key:"sos",        Icon:Siren,           label:"Điều phối SOS"     },
    { key:"map",        Icon:Map,             label:"Bản đồ Live"       },
    { key:"volunteers", Icon:Users,           label:"Tình nguyện viên"  },
    { key:"supplies",   Icon:Package,         label:"Vật tư cứu trợ"   },
    { key:"stations",   Icon:Home,            label:"Điểm cứu trợ"     },
    { key:"donations",  Icon:Gift,            label:"Quyên góp"         },
    { key:"stats",      Icon:TrendingUp,      label:"Thống kê"          },
    { key:"alerts",     Icon:Bell,            label:"Cảnh báo"          },
    { key:"settings",   Icon:Settings,        label:"Cài đặt"           },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const timeAgo = (d) => {
    const s = (Date.now() - d) / 1000;
    if (s < 60) return "vừa xong";
    if (s < 3600) return `${Math.floor(s/60)}ph trước`;
    if (s < 86400) return `${Math.floor(s/3600)}h trước`;
    return `${Math.floor(s/86400)}ngày trước`;
};
const fmtNum = (n) => Number(n||0).toLocaleString("vi-VN");
const pct = (a,b) => b ? Math.round((a/b)*100) : 0;

// ─── Shared UI components ──────────────────────────────────────────────────────
function Badge({ status }) {
    const c = S[status] || S.pending;
    return <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:c.bg, color:c.color, border:`1px solid ${c.border}` }}>{c.label}</span>;
}

function Chip({ children, color="#16a34a" }) {
    return <span style={{ fontSize:10, padding:"2px 8px", borderRadius:12, background:`${color}18`, color, border:`1px solid ${color}40`, fontWeight:600 }}>{children}</span>;
}

function StatCard({ Icon: IconCmp, value, label, color, sub }) {
    return (
        <div style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:16, padding:"20px", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", color }}>
                    <IconCmp size={18} />
                </div>
                <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600 }}>{sub}</span>
            </div>
            <div style={{ fontSize:32, fontWeight:900, color, lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{label}</div>
        </div>
    );
}

function ProgressBar({ value, max, color }) {
    const p = pct(value, max);
    const clr = p > 75 ? "#16a34a" : p > 30 ? "#d97706" : "#dc2626";
    return (
        <div style={{ height:6, background:"#f1f5f9", borderRadius:4, overflow:"hidden" }}>
            <div style={{ width:`${p}%`, height:"100%", background:color||clr, borderRadius:4, transition:"width 0.5s" }} />
        </div>
    );
}

function Modal({ open, title, onClose, children }) {
    if (!open) return null;
    return (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
             onClick={onClose}>
            <div style={{ background:"#fff", borderRadius:20, padding:"28px", width:"100%", maxWidth:520, maxHeight:"85vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}
                 onClick={e => e.stopPropagation()}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                    <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{title}</h3>
                    <button onClick={onClose} style={{ background:"#f1f5f9", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <X size={15} color="#6b7280" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

function FormInput({ label, ...props }) {
    return (
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {label && <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>{label}</label>}
            <input {...props} style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"10px 12px", fontSize:13, outline:"none", fontFamily:"inherit", color:"#111827", background:"#f8fafc", ...props.style }} />
        </div>
    );
}

function FormSelect({ label, options, ...props }) {
    return (
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {label && <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>{label}</label>}
            <select {...props} style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"10px 12px", fontSize:13, outline:"none", fontFamily:"inherit", color:"#111827", background:"#f8fafc" }}>
                {options.map(o => <option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
            </select>
        </div>
    );
}

// ─── Leaflet icon ──────────────────────────────────────────────────────────────
const makeIcon = (status) => {
    const color = S[status]?.color || "#dc2626";
    return L.divIcon({
        className:"", iconSize:[18,18], iconAnchor:[9,9],
        html:`<div style="width:18px;height:18px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 8px ${color}80"></div>`
    });
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
    const [pw, setPw]   = useState("");
    const [err, setErr] = useState(false);
    const submit = () => {
        if (pw === ADMIN_PASSWORD) onLogin();
        else { setErr(true); setTimeout(()=>setErr(false), 2000); }
    };
    return (
        <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a,#1e293b)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", borderRadius:24, padding:"48px 40px", width:380, boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
                <div style={{ textAlign:"center", marginBottom:32 }}>
                    <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#16a34a,#15803d)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize:24, fontWeight:900, color:"white", margin:"0 0 6px" }}>Admin Panel</h1>
                    <p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>SOS Miền Trung — Quản trị viên</p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <input type="password" placeholder="Mật khẩu admin..." value={pw}
                           onChange={e=>{setPw(e.target.value);setErr(false);}}
                           onKeyDown={e=>e.key==="Enter"&&submit()}
                           style={{ border:`1.5px solid ${err?"#ef4444":"rgba(255,255,255,0.15)"}`, borderRadius:12, padding:"13px 16px", fontSize:14, outline:"none", fontFamily:"inherit", color:"white", background:"rgba(255,255,255,0.08)" }} />
                    {err && <p style={{ fontSize:12, color:"#f87171", margin:0, display:"flex", alignItems:"center", gap:6 }}><X size={12} /> Mật khẩu không đúng</p>}
                    <button onClick={submit} style={{ background:"linear-gradient(135deg,#16a34a,#15803d)", color:"white", border:"none", borderRadius:12, padding:14, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 20px rgba(22,163,74,0.4)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        Đăng nhập <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({ sos, volunteers, donations, alerts, setPage }) {
    const urgent     = sos.filter(r=>r.status==="urgent").length;
    const helping    = sos.filter(r=>r.status==="helping").length;
    const done       = sos.filter(r=>r.status==="done").length;
    const critAlerts = alerts.filter(a=>a.level==="critical"&&a.active!==false).length;

    const provinceCounts = useMemo(()=>{
        const m = {};
        sos.forEach(r=>{ const p=r.province||"Khác"; m[p]=(m[p]||0)+1; });
        return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,6);
    }, [sos]);
    const maxCount = provinceCounts[0]?.[1] || 1;

    const QUICK_ACTIONS = [
        { page:"sos",     Icon:Siren,    label:"Điều phối SOS" },
        { page:"map",     Icon:Map,      label:"Bản đồ Live"   },
        { page:"alerts",  Icon:Bell,     label:"Cảnh báo"      },
        { page:"supplies",Icon:Package,  label:"Vật tư"        },
    ];

    return (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
                <StatCard Icon={AlertOctagon}  value={urgent}     label="Khẩn cấp"     color="#dc2626" sub="cần hỗ trợ ngay" />
                <StatCard Icon={Activity}      value={helping}    label="Đang hỗ trợ"  color="#2563eb" sub="đang xử lý" />
                <StatCard Icon={CheckCircle2}  value={done}       label="Hoàn thành"   color="#16a34a" sub="hôm nay" />
                <StatCard Icon={Bell}          value={critAlerts} label="Cảnh báo đỏ"  color="#dc2626" sub="chưa xử lý" />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                <StatCard Icon={ClipboardList} value={sos.length}        label="Tổng SOS"         color="#6366f1" sub="tất cả thời gian" />
                <StatCard Icon={Users}         value={volunteers.length} label="Tình nguyện viên" color="#0891b2" sub="đã đăng ký" />
                <StatCard Icon={Gift}          value={donations.length}  label="Lượt quyên góp"   color="#d97706" sub="đã nhận" />
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {/* Province chart */}
                <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #f1f5f9" }}>
                    <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px", display:"flex", alignItems:"center", gap:6 }}>
                        <MapPin size={14} color="#16a34a" /> Khu vực nổi bật
                    </h3>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {provinceCounts.map(([name,count])=>(
                            <div key={name}>
                                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                                    <span style={{ color:"#374151", fontWeight:600 }}>{name}</span>
                                    <span style={{ color:"#6b7280" }}>{count} yêu cầu</span>
                                </div>
                                <ProgressBar value={count} max={maxCount} color="#16a34a" />
                            </div>
                        ))}
                        {provinceCounts.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Chưa có dữ liệu</p>}
                    </div>
                </div>

                {/* Recent SOS */}
                <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #f1f5f9" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                        <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0, display:"flex", alignItems:"center", gap:6 }}>
                            <Siren size={14} color="#dc2626" /> SOS gần đây
                        </h3>
                        <button onClick={()=>setPage("sos")} style={{ fontSize:12, color:"#16a34a", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                            Xem tất cả <ArrowRight size={12} />
                        </button>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {sos.slice(0,5).map(r=>(
                            <div key={r.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f9fafb" }}>
                                <div>
                                    <div style={{ fontSize:13, fontWeight:600, color:"#111827" }}>{r.name}</div>
                                    <div style={{ fontSize:11, color:"#9ca3af", display:"flex", alignItems:"center", gap:4 }}>
                                        <MapPin size={9} />{r.province} · {timeAgo(r.createdAt)}
                                    </div>
                                </div>
                                <Badge status={r.status} />
                            </div>
                        ))}
                        {sos.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Chưa có SOS nào</p>}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", borderRadius:16, padding:20, display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:4 }}>Thao tác nhanh</div>
                    <div style={{ fontSize:12, color:"#94a3b8" }}>Điều hướng đến các chức năng quan trọng</div>
                </div>
                {QUICK_ACTIONS.map(b=>(
                    <button key={b.page} onClick={()=>setPage(b.page)} style={{ background:"rgba(255,255,255,0.08)", color:"white", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"10px 16px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
                        <b.Icon size={14} /> {b.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── SOS MANAGEMENT ───────────────────────────────────────────────────────────
function SOSPage({ sos }) {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [busy, setBusy]     = useState(null);

    const filtered = sos.filter(r=>{
        const ms = filter==="all"||r.status===filter;
        const mq = !search||[r.name,r.province,r.address,r.supportType].join(" ").toLowerCase().includes(search.toLowerCase());
        return ms&&mq;
    });

    const handleStatus = async (item) => {
        setBusy(item.id);
        await updateField("sos_requests", item.id, { status:NEXT[item.status]||"helping" });
        setBusy(null);
    };

    const tabs = [{k:"all",l:"Tất cả"},{k:"urgent",l:"Khẩn cấp"},{k:"helping",l:"Hỗ trợ"},{k:"done",l:"Xong"}];

    return (
        <div>
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
                {tabs.map(t=>(
                    <button key={t.k} onClick={()=>setFilter(t.k)} style={{ padding:"7px 16px", borderRadius:20, border:"1px solid", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", background:filter===t.k?"#16a34a":"#fff", color:filter===t.k?"#fff":"#6b7280", borderColor:filter===t.k?"#16a34a":"#e5e7eb" }}>
                        {t.l} ({filter===t.k?filtered.length:sos.filter(r=>t.k==="all"||r.status===t.k).length})
                    </button>
                ))}
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, border:"1px solid #e5e7eb", borderRadius:10, padding:"7px 12px", background:"#fff" }}>
                    <Search size={13} color="#9ca3af" />
                    <input placeholder="Tìm kiếm..." value={search} onChange={e=>setSearch(e.target.value)}
                           style={{ border:"none", outline:"none", fontSize:12, fontFamily:"inherit", width:180, color:"#111827" }} />
                </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {filtered.length===0 && <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af" }}>Không có dữ liệu</div>}
                {filtered.map(item=>(
                    <div key={item.id} style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:14, padding:"14px 18px", display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 1fr auto", gap:12, alignItems:"center", borderLeft:`3px solid ${S[item.status]?.color||"#e5e7eb"}` }}>
                        <div>
                            <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{item.name||"—"}</div>
                            <div style={{ fontSize:11, color:"#6b7280", marginTop:2, display:"flex", alignItems:"center", gap:4 }}><Phone size={9} />{item.phone}</div>
                            <div style={{ fontSize:10, color:"#9ca3af", marginTop:1, display:"flex", alignItems:"center", gap:4 }}><Clock size={9} />{timeAgo(item.createdAt)}</div>
                        </div>
                        <div>
                            <div style={{ fontSize:12, fontWeight:600, color:"#374151", display:"flex", alignItems:"center", gap:4 }}><MapPin size={11} />{item.province}</div>
                            <div style={{ fontSize:11, color:"#6b7280", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:160 }}>{item.address}</div>
                        </div>
                        <div style={{ fontSize:12, color:"#374151", display:"flex", alignItems:"center", gap:4 }}><Activity size={11} />{item.supportType||"—"}</div>
                        <div><Badge status={item.status} /></div>
                        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                            <button onClick={()=>handleStatus(item)} disabled={busy===item.id} style={{ background:"#16a34a", color:"white", border:"none", borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", opacity:busy===item.id?0.6:1, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:4 }}>
                                {busy===item.id?"...":<><ArrowRight size={11} />{S[NEXT[item.status]]?.label||"Hỗ trợ"}</>}
                            </button>
                            <button onClick={()=>window.confirm("Xoá?")&&deleteDocument("sos_requests",item.id)} style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fca5a5", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
                                <Trash2 size={11} /> Xoá
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── LIVE MAP ─────────────────────────────────────────────────────────────────
function LiveMapPage({ sos }) {
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterProv,   setFilterProv]   = useState("Tất cả");
    const [selected, setSelected]         = useState(null);

    const filtered = sos.filter(r=>{
        const ms = filterStatus==="all"||r.status===filterStatus;
        const mp = filterProv==="Tất cả"||r.province===filterProv;
        return ms&&mp&&r.lat&&r.lng;
    });

    return (
        <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:14, height:"calc(100vh - 160px)" }}>
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #f1f5f9", padding:16, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>
                <div>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Trạng thái</div>
                    {[{k:"all",l:"Tất cả"},{k:"urgent",l:"Khẩn cấp"},{k:"helping",l:"Hỗ trợ"},{k:"done",l:"Hoàn thành"}].map(f=>(
                        <button key={f.k} onClick={()=>setFilterStatus(f.k)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 10px", border:"none", borderRadius:8, background:filterStatus===f.k?"#f0fdf4":"transparent", cursor:"pointer", fontFamily:"inherit", marginBottom:3 }}>
                            <span style={{ width:10, height:10, borderRadius:"50%", background:f.k==="all"?"#6b7280":S[f.k]?.color, flexShrink:0 }} />
                            <span style={{ fontSize:12, fontWeight:filterStatus===f.k?700:500, color:filterStatus===f.k?"#16a34a":"#374151" }}>{f.l}</span>
                            <span style={{ marginLeft:"auto", fontSize:11, color:"#9ca3af" }}>{f.k==="all"?sos.length:sos.filter(r=>r.status===f.k).length}</span>
                        </button>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Tỉnh/Thành</div>
                    <select value={filterProv} onChange={e=>setFilterProv(e.target.value)} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 10px", fontSize:12, outline:"none", fontFamily:"inherit", color:"#374151" }}>
                        {PROVINCES.map(p=><option key={p}>{p}</option>)}
                    </select>
                </div>
                {selected && (
                    <div style={{ background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:12, padding:12 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:"#111827", marginBottom:8 }}>Chi tiết</div>
                        <div style={{ fontSize:11, color:"#6b7280", lineHeight:1.8 }}>
                            <div><b>Tên:</b> {selected.name}</div>
                            <div><b>SĐT:</b> {selected.phone}</div>
                            <div><b>Địa chỉ:</b> {selected.address}</div>
                            <div><b>Hỗ trợ:</b> {selected.supportType}</div>
                            <div><b>Ghi chú:</b> {selected.note||"—"}</div>
                        </div>
                        <div style={{ marginTop:8 }}><Badge status={selected.status} /></div>
                    </div>
                )}
                <div style={{ marginTop:"auto" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Chú thích</div>
                    {Object.entries(S).map(([k,v])=>(
                        <div key={k} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0", fontSize:11, color:"#374151" }}>
                            <span style={{ width:10, height:10, borderRadius:"50%", background:v.color, flexShrink:0 }} />{v.label}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid #e5e7eb", position:"relative" }}>
                <div style={{ position:"absolute", top:12, right:12, zIndex:1000, background:"rgba(255,255,255,0.95)", border:"1px solid #e5e7eb", borderRadius:99, padding:"5px 12px", display:"flex", alignItems:"center", gap:6, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"pulse 1.5s infinite" }} />
                    <span style={{ fontSize:11, fontWeight:700, color:"#374151", letterSpacing:2 }}>LIVE</span>
                </div>
                <MapContainer center={[15.8,108.0]} zoom={6} style={{ width:"100%", height:"100%" }} zoomControl={false}>
                    <TileLayer url="https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=1581064bec7437481b89c58cd3bfeada9ba10b0dbed1cd4c" attribution="&copy; VietMap" />
                    {filtered.map(item=>(
                        <Marker key={item.id} position={[item.lat,item.lng]} icon={makeIcon(item.status)}
                                eventHandlers={{ click:()=>setSelected(item) }}>
                            <Popup>
                                <div style={{ minWidth:180 }}>
                                    <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>{item.name}</div>
                                    <div style={{ fontSize:11, color:"#6b7280" }}>{item.address}</div>
                                    <div style={{ fontSize:11, color:"#6b7280" }}>{item.supportType}</div>
                                    <div style={{ marginTop:6 }}><Badge status={item.status} /></div>
                                    <div style={{ display:"flex", gap:6, marginTop:8 }}>
                                        <button onClick={()=>updateField("sos_requests",item.id,{status:"helping"})} style={{ flex:1, background:"#16a34a", color:"white", border:"none", borderRadius:6, padding:"5px", fontSize:10, fontWeight:700, cursor:"pointer" }}>Hỗ trợ</button>
                                        <button onClick={()=>updateField("sos_requests",item.id,{status:"done"})} style={{ flex:1, background:"#2563eb", color:"white", border:"none", borderRadius:6, padding:"5px", fontSize:10, fontWeight:700, cursor:"pointer" }}>Xong</button>
                                    </div>
                                </div>
                            </Popup>
                            <Circle center={[item.lat,item.lng]} radius={8000} pathOptions={{ color:S[item.status]?.color||"#dc2626", fillOpacity:0.08, weight:1 }} />
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}

// ─── VOLUNTEERS ───────────────────────────────────────────────────────────────
function VolunteersPage({ volunteers }) {
    const [search, setSearch]       = useState("");
    const [filterProv, setFilterProv] = useState("Tất cả");
    const filtered = volunteers.filter(v=>{
        const mp = filterProv==="Tất cả"||v.province===filterProv;
        const mq = !search||[v.name,v.phone,v.province].join(" ").toLowerCase().includes(search.toLowerCase());
        return mp&&mq;
    });
    const AVAIL_LABEL = { fulltime:"Full-time", weekend:"Cuối tuần", evening:"Buổi tối", flexible:"Linh hoạt" };
    return (
        <div>
            <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, border:"1px solid #e5e7eb", borderRadius:10, padding:"7px 12px", background:"#fff" }}>
                    <Search size={13} color="#9ca3af" />
                    <input placeholder="Tìm kiếm..." value={search} onChange={e=>setSearch(e.target.value)}
                           style={{ border:"none", outline:"none", fontSize:12, fontFamily:"inherit", width:180, color:"#111827" }} />
                </div>
                <select value={filterProv} onChange={e=>setFilterProv(e.target.value)} style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"7px 12px", fontSize:12, outline:"none", fontFamily:"inherit", color:"#374151" }}>
                    {PROVINCES.map(p=><option key={p}>{p}</option>)}
                </select>
                <span style={{ marginLeft:"auto", fontSize:13, color:"#6b7280" }}>{filtered.length} tình nguyện viên</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:12 }}>
                {filtered.length===0 && <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af", gridColumn:"1/-1" }}>Chưa có tình nguyện viên</div>}
                {filtered.map(v=>(
                    <div key={v.id} style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:14, padding:16, borderLeft:"3px solid #16a34a" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                            <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#dcfce7,#bbf7d0)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                                <UserCheck size={20} color="#16a34a" />
                            </div>
                            <div>
                                <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{v.name}</div>
                                <div style={{ fontSize:11, color:"#6b7280", display:"flex", alignItems:"center", gap:4 }}><Phone size={9} />{v.phone}</div>
                            </div>
                            <div style={{ marginLeft:"auto", fontSize:10, color:"#9ca3af" }}>{timeAgo(v.createdAt)}</div>
                        </div>
                        <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                            <Chip color="#16a34a">{v.province}</Chip>
                            <Chip color="#2563eb">{AVAIL_LABEL[v.availability]||v.availability}</Chip>
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                            {(v.skills||[]).map(s=><Chip key={s} color="#6366f1">{SKILLS_MAP[s]||s}</Chip>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── SUPPLIES ─────────────────────────────────────────────────────────────────
function SuppliesPage({ supplies }) {
    const [modal, setModal]   = useState(false);
    const [form, setForm]     = useState({ name:"", category:"food", quantity:"", unit:"kg", minQuantity:"", location:"Đà Nẵng", note:"" });
    const [saving, setSaving] = useState(false);

    const set = (k,v) => setForm(f=>({...f,[k]:v}));

    const handleSave = async () => {
        if (!form.name||!form.quantity) return;
        setSaving(true);
        await addDocument("supplies", { ...form, quantity:Number(form.quantity), minQuantity:Number(form.minQuantity)||0 });
        setSaving(false);
        setModal(false);
        setForm({ name:"", category:"food", quantity:"", unit:"kg", minQuantity:"", location:"Đà Nẵng", note:"" });
    };

    const getStatus = (item) => {
        const p = item.minQuantity>0 ? item.quantity/item.minQuantity : 1;
        if (p <= 0) return { label:"Hết",     color:"#dc2626", bg:"#fef2f2" };
        if (p < 1)  return { label:"Sắp hết", color:"#d97706", bg:"#fffbeb" };
        return                { label:"Đủ",      color:"#16a34a", bg:"#f0fdf4" };
    };

    const totalByCategory = useMemo(()=>{
        const m = {};
        supplies.forEach(s=>{ m[s.category]=(m[s.category]||0)+1; });
        return m;
    }, [supplies]);

    return (
        <div>
            {/* Summary bar */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:16 }}>
                {Object.entries(SUPPLY_CAT).map(([k,v])=>{
                    const CatIcon = SUPPLY_ICON_MAP[k] || Package;
                    return (
                        <div key={k} style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:12, padding:"12px 14px", textAlign:"center" }}>
                            <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>
                                <CatIcon size={20} color="#6b7280" />
                            </div>
                            <div style={{ fontSize:18, fontWeight:800, color:"#111827" }}>{totalByCategory[k]||0}</div>
                            <div style={{ fontSize:10, color:"#9ca3af", marginTop:2 }}>{v}</div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Danh sách vật tư ({supplies.length})</h3>
                <button onClick={()=>setModal(true)} style={{ background:"#16a34a", color:"white", border:"none", borderRadius:10, padding:"9px 18px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
                    <Plus size={14} /> Thêm vật tư
                </button>
            </div>

            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #f1f5f9", overflow:"hidden" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                    <tr style={{ background:"#f8fafc", borderBottom:"1px solid #f1f5f9" }}>
                        {["Tên vật tư","Loại","Số lượng","Đơn vị","Khu vực","Trạng thái",""].map((h,i)=>(
                            <th key={i} style={{ padding:"12px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {supplies.length===0 && (
                        <tr><td colSpan={7} style={{ textAlign:"center", padding:"50px 0", color:"#9ca3af" }}>Chưa có vật tư. Bấm "+ Thêm vật tư" để bắt đầu.</td></tr>
                    )}
                    {supplies.map(item=>{
                        const st = getStatus(item);
                        return (
                            <tr key={item.id} style={{ borderBottom:"1px solid #f9fafb" }}>
                                <td style={{ padding:"12px 14px", fontWeight:600, color:"#111827" }}>{item.name}</td>
                                <td style={{ padding:"12px 14px", color:"#6b7280" }}>{SUPPLY_CAT[item.category]||item.category}</td>
                                <td style={{ padding:"12px 14px" }}>
                                    <div style={{ fontWeight:700, color:"#111827" }}>{fmtNum(item.quantity)}</div>
                                    {item.minQuantity>0 && <ProgressBar value={item.quantity} max={item.minQuantity*2} />}
                                </td>
                                <td style={{ padding:"12px 14px", color:"#6b7280" }}>{item.unit}</td>
                                <td style={{ padding:"12px 14px", color:"#6b7280" }}>
                                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><MapPin size={10} />{item.location}</span>
                                </td>
                                <td style={{ padding:"12px 14px" }}>
                                    <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, fontWeight:700, background:st.bg, color:st.color, border:`1px solid ${st.color}40` }}>{st.label}</span>
                                </td>
                                <td style={{ padding:"12px 14px" }}>
                                    <button onClick={()=>window.confirm("Xoá?")&&deleteDocument("supplies",item.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#dc2626", display:"flex", alignItems:"center" }}>
                                        <Trash2 size={15} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <Modal open={modal} title="Thêm vật tư cứu trợ" onClose={()=>setModal(false)}>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <FormInput label="Tên vật tư *" placeholder="VD: Gạo ST25, Nước suối Aqua..." value={form.name} onChange={e=>set("name",e.target.value)} />
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        <FormSelect label="Loại *" value={form.category} onChange={e=>set("category",e.target.value)}
                                    options={Object.entries(SUPPLY_CAT).map(([k,v])=>({value:k,label:v}))} />
                        <FormSelect label="Đơn vị *" value={form.unit} onChange={e=>set("unit",e.target.value)} options={SUPPLY_UNITS} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        <FormInput label="Số lượng hiện có *" type="number" placeholder="0" value={form.quantity} onChange={e=>set("quantity",e.target.value)} />
                        <FormInput label="Ngưỡng cảnh báo" type="number" placeholder="0" value={form.minQuantity} onChange={e=>set("minQuantity",e.target.value)} />
                    </div>
                    <FormSelect label="Khu vực lưu trữ" value={form.location} onChange={e=>set("location",e.target.value)}
                                options={PROVINCES.filter(p=>p!=="Tất cả")} />
                    <FormInput label="Ghi chú" placeholder="Thông tin thêm..." value={form.note} onChange={e=>set("note",e.target.value)} />
                    <button onClick={handleSave} disabled={saving||!form.name||!form.quantity} style={{ background:"#16a34a", color:"white", border:"none", borderRadius:12, padding:13, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", opacity:saving?0.7:1, marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <Save size={15} /> {saving?"Đang lưu...":"Lưu vật tư"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

// ─── DONATIONS ────────────────────────────────────────────────────────────────
function DonationsPage({ donations }) {
    const total  = donations.filter(d=>d.donationType==="money").reduce((s,d)=>s+(Number(d.amount)||0),0);
    const DLABEL = { money:"Tiền mặt",food:"Lương thực",medicine:"Thuốc",clothes:"Quần áo",water:"Nước uống",other:"Khác" };
    return (
        <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:16 }}>
                <StatCard Icon={Gift}     value={donations.length}                                    label="Tổng lượt"  color="#d97706" sub="quyên góp" />
                <StatCard Icon={Banknote} value={`${fmtNum(total)}đ`}                                label="Tổng tiền"  color="#16a34a" sub="ước tính" />
                <StatCard Icon={Package}  value={donations.filter(d=>d.donationType!=="money").length} label="Hiện vật" color="#2563eb" sub="không phải tiền" />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {donations.length===0 && <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af" }}>Chưa có quyên góp nào</div>}
                {donations.map(d=>(
                    <div key={d.id} style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:14, padding:"14px 18px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:12, alignItems:"center", borderLeft:"3px solid #d97706" }}>
                        <div>
                            <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{d.name}</div>
                            <div style={{ fontSize:11, color:"#6b7280", display:"flex", alignItems:"center", gap:4 }}><Phone size={9} />{d.phone}</div>
                            <div style={{ fontSize:10, color:"#9ca3af", display:"flex", alignItems:"center", gap:4 }}><Clock size={9} />{timeAgo(d.createdAt)}</div>
                        </div>
                        <Chip color="#d97706">{DLABEL[d.donationType]||d.donationType}</Chip>
                        {d.amount
                            ? <div style={{ fontSize:16, fontWeight:800, color:"#d97706", display:"flex", alignItems:"center", gap:6 }}><Banknote size={14} />{fmtNum(d.amount)}đ</div>
                            : <span style={{ color:"#9ca3af", fontSize:12 }}>Hiện vật</span>}
                        <span style={{ fontSize:11, color:"#9ca3af" }}>{d.note||"—"}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsPage({ sos, volunteers, donations }) {
    const byStatus = useMemo(()=>Object.keys(S).map(k=>({ k, l:S[k].label, n:sos.filter(r=>r.status===k).length, c:S[k].color })), [sos]);
    const byType   = useMemo(()=>{
        const m = {}; sos.forEach(r=>{ const t=r.supportType||"Khác"; m[t]=(m[t]||0)+1; });
        return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,6);
    }, [sos]);
    const byProv   = useMemo(()=>{
        const m = {}; sos.forEach(r=>{ const p=r.province||"Khác"; m[p]=(m[p]||0)+1; });
        return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8);
    }, [sos]);
    const maxType = byType[0]?.[1]||1;
    const maxProv = byProv[0]?.[1]||1;

    return (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
            <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #f1f5f9" }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px" }}>Theo trạng thái</h3>
                {byStatus.map(({k,l,n,c})=>(
                    <div key={k} style={{ marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                            <span style={{ fontWeight:600, color:"#374151" }}>{l}</span>
                            <span style={{ fontWeight:700, color:c }}>{n} ({pct(n,sos.length)}%)</span>
                        </div>
                        <ProgressBar value={n} max={sos.length||1} color={c} />
                    </div>
                ))}
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #f1f5f9" }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px" }}>Theo loại hỗ trợ</h3>
                {byType.map(([n,c])=>(
                    <div key={n} style={{ marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                            <span style={{ fontWeight:600, color:"#374151" }}>{n}</span>
                            <span style={{ color:"#6b7280" }}>{c}</span>
                        </div>
                        <ProgressBar value={c} max={maxType} color="#6366f1" />
                    </div>
                ))}
                {byType.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Chưa có dữ liệu</p>}
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #f1f5f9" }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px" }}>Theo tỉnh thành</h3>
                {byProv.map(([n,c])=>(
                    <div key={n} style={{ marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                            <span style={{ fontWeight:600, color:"#374151" }}>{n}</span>
                            <span style={{ color:"#6b7280" }}>{c}</span>
                        </div>
                        <ProgressBar value={c} max={maxProv} color="#0891b2" />
                    </div>
                ))}
                {byProv.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Chưa có dữ liệu</p>}
            </div>
        </div>
    );
}

// ─── ALERTS ───────────────────────────────────────────────────────────────────
function AlertsPage({ sos, alerts }) {
    const [modal, setModal]   = useState(false);
    const [form, setForm]     = useState({ title:"", message:"", level:"warning", province:"Đà Nẵng" });
    const [saving, setSaving] = useState(false);
    const set = (k,v) => setForm(f=>({...f,[k]:v}));

    const autoAlerts = useMemo(()=>{
        const result = [];
        const byProv = {};
        sos.forEach(r=>{ byProv[r.province||"Khác"]=(byProv[r.province||"Khác"]||0)+(r.status==="urgent"?1:0); });
        Object.entries(byProv).forEach(([p,n])=>{
            if (n>=5)  result.push({ id:`auto-${p}-overload`, title:`Quá tải tại ${p}`,  message:`${n} yêu cầu khẩn cấp chưa được xử lý`, level:"critical", province:p, auto:true });
            else if(n>=2) result.push({ id:`auto-${p}-warn`, title:`Cần chú ý: ${p}`, message:`${n} yêu cầu khẩn cấp đang chờ`,         level:"warning",  province:p, auto:true });
        });
        if (sos.filter(r=>r.status==="urgent").length > 10)
            result.push({ id:"auto-global", title:"Hệ thống quá tải", message:`Có ${sos.filter(r=>r.status==="urgent").length} SOS khẩn cấp toàn hệ thống`, level:"critical", auto:true });
        return result;
    }, [sos]);

    const handleSave = async () => {
        if (!form.title||!form.message) return;
        setSaving(true);
        await addDocument("alerts", { ...form, active:true });
        setSaving(false); setModal(false);
        setForm({ title:"", message:"", level:"warning", province:"Đà Nẵng" });
    };

    const allAlerts = [...autoAlerts, ...alerts.map(a=>({...a, auto:false}))];

    return (
        <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ display:"flex", gap:10 }}>
                    <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:700, color:"#dc2626", display:"flex", alignItems:"center", gap:6 }}>
                        <AlertOctagon size={13} /> {allAlerts.filter(a=>a.level==="critical").length} Nghiêm trọng
                    </div>
                    <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:700, color:"#d97706", display:"flex", alignItems:"center", gap:6 }}>
                        <AlertTriangle size={13} /> {allAlerts.filter(a=>a.level==="warning").length} Cảnh báo
                    </div>
                </div>
                <button onClick={()=>setModal(true)} style={{ background:"#0f172a", color:"white", border:"none", borderRadius:10, padding:"9px 18px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
                    <Plus size={14} /> Tạo cảnh báo thủ công
                </button>
            </div>

            {autoAlerts.length > 0 && (
                <div style={{ marginBottom:16 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                        <Bot size={12} /> Cảnh báo tự động từ dữ liệu
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {autoAlerts.map(a=>{
                            const cfg = ALERT_LEVELS[a.level]||ALERT_LEVELS.warning;
                            const CfgIcon = cfg.Icon;
                            return (
                                <div key={a.id} style={{ background:cfg.bg, border:`1px solid ${cfg.color}30`, borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, borderLeft:`4px solid ${cfg.color}` }}>
                                    <div style={{ color:cfg.color, animation:a.level==="critical"?"alertPulse 1s infinite":"none" }}>
                                        <CfgIcon size={20} />
                                    </div>
                                    <div style={{ flex:1 }}>
                                        <div style={{ fontWeight:700, fontSize:13, color:cfg.color }}>{a.title}</div>
                                        <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{a.message}</div>
                                    </div>
                                    <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:`${cfg.color}18`, color:cfg.color, fontWeight:700, border:`1px solid ${cfg.color}40` }}>{cfg.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div>
                <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                    <PenLine size={12} /> Cảnh báo thủ công
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {alerts.length===0 && <div style={{ background:"#f8fafc", border:"1px dashed #e5e7eb", borderRadius:12, padding:"30px", textAlign:"center", color:"#9ca3af", fontSize:13 }}>Chưa có cảnh báo thủ công. Bấm "+ Tạo cảnh báo" để thêm.</div>}
                    {alerts.map(a=>{
                        const cfg = ALERT_LEVELS[a.level]||ALERT_LEVELS.info;
                        const CfgIcon = cfg.Icon;
                        return (
                            <div key={a.id} style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, borderLeft:`4px solid ${cfg.color}` }}>
                                <CfgIcon size={20} color={cfg.color} />
                                <div style={{ flex:1 }}>
                                    <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{a.title}</div>
                                    <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{a.message}</div>
                                    {a.province && <div style={{ fontSize:11, color:"#9ca3af", marginTop:2, display:"flex", alignItems:"center", gap:4 }}><MapPin size={9} />{a.province}</div>}
                                </div>
                                <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:cfg.bg, color:cfg.color, fontWeight:700, border:`1px solid ${cfg.color}40` }}>{cfg.label}</span>
                                <button onClick={()=>deleteDocument("alerts",a.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#dc2626", display:"flex", alignItems:"center" }}>
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Modal open={modal} title="Tạo cảnh báo thủ công" onClose={()=>setModal(false)}>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <FormInput label="Tiêu đề *" placeholder="VD: Đường ngập tại Huế..." value={form.title} onChange={e=>set("title",e.target.value)} />
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Nội dung *</label>
                        <textarea value={form.message} onChange={e=>set("message",e.target.value)} rows={3} placeholder="Mô tả chi tiết cảnh báo..." style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"10px 12px", fontSize:13, outline:"none", fontFamily:"inherit", color:"#111827", background:"#f8fafc", resize:"none" }} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        <FormSelect label="Mức độ" value={form.level} onChange={e=>set("level",e.target.value)}
                                    options={Object.entries(ALERT_LEVELS).map(([k,v])=>({value:k,label:v.label}))} />
                        <FormSelect label="Khu vực" value={form.province} onChange={e=>set("province",e.target.value)}
                                    options={PROVINCES.filter(p=>p!=="Tất cả")} />
                    </div>
                    <button onClick={handleSave} disabled={saving||!form.title||!form.message} style={{ background:"#0f172a", color:"white", border:"none", borderRadius:12, padding:13, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", opacity:saving?0.7:1, marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <Megaphone size={15} /> {saving?"Đang lưu...":"Tạo cảnh báo"}
                    </button>
                </div>
            </Modal>
            <style>{`@keyframes alertPulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>
    );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsPage({ onLogout }) {
    const [newPw, setNewPw] = useState("");
    const [saved, setSaved] = useState(false);
    return (
        <div style={{ maxWidth:480 }}>
            <div style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #f1f5f9", marginBottom:14 }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px", display:"flex", alignItems:"center", gap:6 }}>
                    <Settings size={16} color="#6b7280" /> Cài đặt hệ thống
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <FormInput label="Đổi mật khẩu admin" type="password" placeholder="Nhập mật khẩu mới..." value={newPw} onChange={e=>{setNewPw(e.target.value);setSaved(false);}} />
                    <button onClick={()=>{setSaved(true);setNewPw("");}} style={{ background:"#16a34a", color:"white", border:"none", borderRadius:10, padding:11, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        {saved ? <><CheckCircle2 size={14} /> Đã lưu (cập nhật trong code)</> : <><Save size={14} /> Lưu mật khẩu</>}
                    </button>
                    {saved && <p style={{ fontSize:12, color:"#6b7280", margin:0 }}>Cập nhật const ADMIN_PASSWORD trong AdminPage.jsx để áp dụng.</p>}
                </div>
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #f1f5f9" }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 12px", display:"flex", alignItems:"center", gap:6 }}>
                    <Link2 size={16} color="#6b7280" /> Về hệ thống
                </h3>
                {[["Tên hệ thống","SOS Miền Trung"],["Phiên bản","2.0.0"],["Database","Firebase Firestore"],["Hosting","Vercel"]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f9fafb", fontSize:13 }}>
                        <span style={{ color:"#6b7280" }}>{k}</span><span style={{ fontWeight:600, color:"#111827" }}>{v}</span>
                    </div>
                ))}
            </div>
            <button onClick={onLogout} style={{ marginTop:14, width:"100%", background:"#fef2f2", color:"#dc2626", border:"1px solid #fca5a5", borderRadius:12, padding:12, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <LogOut size={15} /> Đăng xuất
            </button>
        </div>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed]   = useState(()=>sessionStorage.getItem("sos_admin")==="1");
    const [page, setPage]       = useState("dashboard");
    const [sos, setSos]         = useState([]);
    const [volunteers, setVols] = useState([]);
    const [donations, setDons]  = useState([]);
    const [supplies, setSupp]   = useState([]);
    const [alerts, setAlerts]   = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (!authed) return;
        setLoading(true);
        const unsubs = [
            subscribeCollection("sos_requests", d=>{ setSos(d); setLoading(false); }),
            subscribeCollection("volunteers",   d=>setVols(d)),
            subscribeCollection("donations",    d=>setDons(d)),
            subscribeCollection("supplies",     d=>setSupp(d)),
            subscribeCollection("alerts",       d=>setAlerts(d)),
        ];
        return ()=>unsubs.forEach(u=>u());
    }, [authed]);

    const handleLogin  = () => { sessionStorage.setItem("sos_admin","1"); setAuthed(true); };
    const handleLogout = () => { sessionStorage.removeItem("sos_admin"); setAuthed(false); };

    if (!authed) return <LoginScreen onLogin={handleLogin} />;

    const urgentCount = sos.filter(r=>r.status==="urgent").length;
    const alertCount  = alerts.filter(a=>a.active!==false).length + (urgentCount>=5?1:0);

    const PAGE_COMPONENTS = {
        dashboard:  <DashboardPage  sos={sos} volunteers={volunteers} donations={donations} alerts={alerts} setPage={setPage} />,
        sos:        <SOSPage        sos={sos} />,
        map:        <LiveMapPage    sos={sos} />,
        volunteers: <VolunteersPage volunteers={volunteers} />,
        supplies:   <SuppliesPage   supplies={supplies} />,
        stations:   <div style={{ textAlign:"center", padding:"80px 0", color:"#9ca3af", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}><Home size={40} color="#d1d5db" /><p style={{ margin:0, fontSize:14 }}>Tính năng Điểm cứu trợ sẽ được thêm sớm</p></div>,
        donations:  <DonationsPage  donations={donations} />,
        stats:      <StatsPage      sos={sos} volunteers={volunteers} donations={donations} />,
        alerts:     <AlertsPage     sos={sos} alerts={alerts} />,
        settings:   <SettingsPage   onLogout={handleLogout} />,
    };

    const PAGE_TITLES = { dashboard:"Dashboard",sos:"Điều phối SOS",map:"Bản đồ Live",volunteers:"Tình nguyện viên",supplies:"Vật tư cứu trợ",stations:"Điểm cứu trợ",donations:"Quyên góp",stats:"Thống kê",alerts:"Cảnh báo",settings:"Cài đặt" };

    return (
        <div style={{ display:"flex", height:"100vh", fontFamily:"'Be Vietnam Pro', sans-serif", background:"#f0f4f8" }}>

            {/* SIDEBAR */}
            <aside style={{ width:220, background:"#0f172a", display:"flex", flexDirection:"column", flexShrink:0 }}>
                <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#16a34a,#15803d)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Shield size={18} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize:13, fontWeight:800, color:"white", lineHeight:1 }}>SOS Admin</div>
                            <div style={{ fontSize:10, color:"#64748b", marginTop:2 }}>Miền Trung</div>
                        </div>
                    </div>
                </div>

                <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
                    {SIDEBAR_MENU.map(m=>{
                        const isActive = page===m.key;
                        const badge = m.key==="sos"?urgentCount:m.key==="alerts"?alertCount:0;
                        return (
                            <button key={m.key} onClick={()=>setPage(m.key)} style={{
                                display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px",
                                border:"none", borderRadius:10, cursor:"pointer", fontFamily:"inherit", marginBottom:2,
                                background: isActive?"rgba(22,163,74,0.15)":"transparent",
                                borderLeft: isActive?"3px solid #16a34a":"3px solid transparent",
                            }}>
                                <m.Icon size={16} color={isActive?"#4ade80":"#94a3b8"} />
                                <span style={{ fontSize:13, fontWeight:isActive?700:500, color:isActive?"#4ade80":"#94a3b8", flex:1, textAlign:"left" }}>{m.label}</span>
                                {badge>0 && <span style={{ background:"#dc2626", color:"white", borderRadius:99, padding:"1px 7px", fontSize:10, fontWeight:700 }}>{badge}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"pulse 1.5s infinite" }} />
                        <span style={{ fontSize:11, color:"#64748b" }}>Kết nối Firestore</span>
                    </div>
                    <button onClick={handleLogout} style={{ width:"100%", background:"rgba(220,38,38,0.12)", color:"#f87171", border:"1px solid rgba(220,38,38,0.2)", borderRadius:8, padding:"8px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <LogOut size={13} /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* CONTENT */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
                {/* Topbar */}
                <div style={{ background:"white", borderBottom:"1px solid #f1f5f9", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                    <div>
                        <div style={{ fontSize:18, fontWeight:800, color:"#111827" }}>{PAGE_TITLES[page]}</div>
                        <div style={{ fontSize:12, color:"#9ca3af" }}>Admin › {PAGE_TITLES[page]}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        {urgentCount>0 && (
                            <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:10, padding:"6px 12px", fontSize:12, fontWeight:700, color:"#dc2626", display:"flex", alignItems:"center", gap:6 }}>
                                <Siren size={13} style={{ animation:"alertPulse 1s infinite" }} />
                                {urgentCount} khẩn cấp
                            </div>
                        )}
                        <a href="/" style={{ fontSize:12, color:"#6b7280", textDecoration:"none", padding:"6px 12px", border:"1px solid #e5e7eb", borderRadius:8, display:"flex", alignItems:"center", gap:4 }}>
                            <ArrowLeft size={12} /> Trang chủ
                        </a>
                    </div>
                </div>

                {/* Page content */}
                <div style={{ flex:1, overflowY:"auto", padding:page==="map"?"14px":"24px" }}>
                    {loading ? (
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60%", flexDirection:"column", gap:12, color:"#9ca3af" }}>
                            <Loader2 size={40} style={{ animation:"spin 1s linear infinite" }} />
                            <div style={{ fontSize:14 }}>Đang kết nối Firestore...</div>
                        </div>
                    ) : PAGE_COMPONENTS[page]}
                </div>
            </div>

            <style>{`
                @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
                @keyframes alertPulse{0%,100%{opacity:1}50%{opacity:0.4}}
                @keyframes spin{to{transform:rotate(360deg)}}
                ::-webkit-scrollbar{width:5px}
                ::-webkit-scrollbar-track{background:transparent}
                ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:4px}
            `}</style>
        </div>
    );
}