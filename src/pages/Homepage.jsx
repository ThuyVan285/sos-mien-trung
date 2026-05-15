import { Link } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";
import MiniMap from "../components/map/MiniMap";
import './HomePage.css';

export default function Homepage() {
    const { setIsFormOpen } = useSOS();

    return (
        <div className="min-h-screen bg-[#020817] text-[#f8fafc] font-sans w-full overflow-x-hidden">
            <Header />

            {/* HERO SECTION */}
            <section className="relative min-h-screen pt-32 pb-20 w-full flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">

                        {/* Hero Left Content */}
                        <div>
                            <span className="inline-flex items-center gap-2 bg-cyan-950/30 px-4 py-2 rounded-full text-[11px] font-bold text-cyan-400 border border-cyan-800/50 uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                Hệ thống hỗ trợ thiên tai miền Trung
                            </span>

                            <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.04em] leading-tight">
                                <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">SOS</span> MIỀN TRUNG
                            </h1>
                            <h2 className="text-4xl lg:text-5xl font-black mt-2 leading-[1.1] tracking-[-0.03em] text-white">
                                Bản đồ cứu trợ <br />
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    thời gian thực
                                </span>
                            </h2>

                            <p className="text-gray-400 mt-6 text-base lg:text-lg max-w-[540px] leading-relaxed">
                                Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-10">
                                <button
                                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)] flex items-center gap-2"
                                    onClick={() => setIsFormOpen(true)}
                                >
                                    🔴 Gửi yêu cầu SOS
                                </button>
                                <Link
                                    to="/map"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2"
                                >
                                    🗺️ Mở bản đồ cứu trợ
                                </Link>
                            </div>

                            {/* Quick Stats Mini */}
                            <div className="grid grid-cols-4 gap-4 mt-16 border-t border-white/5 pt-8">
                                {[
                                    ["11", "Khu vực"],
                                    ["120+", "Yêu cầu"],
                                    ["50+", "Tình nguyện"],
                                    ["30", "Điểm hỗ trợ"],
                                ].map(([val, label], i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-black text-cyan-400">{val}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Preview */}
                        <div className="relative group h-[500px]">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative h-full bg-[#071122] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                                <MiniMap interactive={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE STATS BAR */}
            <section className="py-10 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-[#0f172a]/60 rounded-[2rem] border border-white/5 shadow-lg divide-x divide-white/5">
                        {[
                            { label: "CẦN GIÚP", count: "128", color: "text-red-500", sub: "+12 hôm nay", icon: "👥" },
                            { label: "ĐANG XỬ LÝ", count: "56", color: "text-orange-400", sub: "+5 hôm nay", icon: "🕒" },
                            { label: "ĐÃ HỖ TRỢ", count: "320", color: "text-green-400", sub: "+25 hôm nay", icon: "🛡️" },
                            { label: "ĐIỂM CỨU TRỢ", count: "24", color: "text-blue-400", sub: "+2 hôm nay", icon: "📍" },
                        ].map((s, i) => (
                            <div key={i} className="text-center py-8 px-4">
                                <p className="text-xs font-bold text-gray-500 tracking-widest mb-2 flex items-center justify-center gap-1.5">
                                    <span>{s.icon}</span>{s.label}
                                </p>
                                <p className={`text-5xl font-black ${s.color} drop-shadow-md`}>{s.count}</p>
                                <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold tracking-wider">{s.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MỤC TIÊU */}
            <section className="py-24 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <h2 className="text-2xl lg:text-3xl font-black text-center mb-16 tracking-[0.2em] uppercase text-white/90">
                        Mục tiêu của chúng tôi
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Kết nối nhanh chóng", desc: "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất trong mọi tình huống.", icon: "🚀" },
                            { title: "Điều phối hiệu quả", desc: "Điều phối nguồn lực cứu trợ thông minh, đúng nơi - đúng thời điểm - đúng nhu cầu.", icon: "🎯" },
                            { title: "Minh bạch & chính xác", desc: "Cung cấp dữ liệu thời gian thực, minh bạch, giúp ra quyết định nhanh chóng và chính xác.", icon: "💎" },
                        ].map((goal, i) => (
                            <div key={i} className="bg-gradient-to-b from-[#0f172a] to-transparent p-10 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all group hover:-translate-y-1">
                                <div className="text-4xl mb-6 bg-blue-500/10 w-16 h-16 flex items-center justify-center rounded-2xl border border-blue-500/20">{goal.icon}</div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{goal.title}</h3>
                                <p className="text-gray-400 mt-4 leading-relaxed text-sm">{goal.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HỆ THỐNG BẢN ĐỒ TRỰC QUAN */}
            <section className="py-24 bg-[#020817] border-y border-white/5 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <div className="space-y-8">
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
                                HỆ THỐNG BẢN ĐỒ <br />
                                <span className="text-blue-500">TRỰC QUAN</span>
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed">
                                Theo dõi tình hình cứu trợ theo thời gian thực trên bản đồ tương tác.
                                Dễ dàng lọc theo khu vực, trạng thái, loại hỗ trợ và mức độ khẩn cấp.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Cập nhật realtime 24/7",
                                    "Định vị chính xác",
                                    "Hiển thị heatmap",
                                    "Tuyến đường cứu trợ",
                                    "Cảnh báo quá tải"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-[10px] text-blue-400 flex-shrink-0">✔</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all group shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm">
                                Trải nghiệm bản đồ ngay
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        {/* Right HUD Map */}
                        <div className="relative bg-[#020817] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group h-[550px]">
                            <div className="absolute inset-0 z-0 grayscale-[0.4] brightness-[0.6] contrast-[1.2]">
                                <MiniMap interactive={false} />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-[#020817]/40 z-10 pointer-events-none"></div>

                            <div className="relative z-20 h-full p-6 flex flex-col justify-between">
                                {/* Live Badge */}
                                <div className="flex justify-between items-start">
                                    <div className="bg-[#020817]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                        <span className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">Live Tracking</span>
                                    </div>
                                </div>

                                {/* Bottom HUD */}
                                <div className="grid grid-cols-12 gap-4 items-end">
                                    {/* Requests list */}
                                    <div className="col-span-7 lg:col-span-8 space-y-3">
                                        <div className="bg-[#071122]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                                            <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
                                                <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                                                Yêu cầu gần đây
                                            </h4>
                                            <div className="space-y-3">
                                                {[
                                                    { loc: "Quảng Ngãi", status: "KHẨN CẤP", color: "text-red-500", bg: "bg-red-500/10", pulse: true, detail: "15 người cần hỗ trợ" },
                                                    { loc: "Đà Nẵng", status: "ĐANG XỬ LÝ", color: "text-orange-500", bg: "bg-orange-500/10", detail: "8 người cần hỗ trợ" },
                                                    { loc: "Huế", status: "ĐANG XỬ LÝ", color: "text-orange-500", bg: "bg-orange-500/10", detail: "12 người cần hỗ trợ" },
                                                    { loc: "Nghệ An", status: "ĐÃ HỖ TRỢ", color: "text-green-500", bg: "bg-green-500/10", detail: "7 người cần hỗ trợ" },
                                                    { loc: "Khánh Hòa", status: "ĐANG XỬ LÝ", color: "text-orange-500", bg: "bg-orange-500/10", detail: "5 người cần hỗ trợ" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                {item.pulse
                                                                    ? <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                                                                    : <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                                                }
                                                                <span className="text-[13px] font-bold text-white/90">{item.loc}</span>
                                                            </div>
                                                            <p className="text-[10px] text-gray-500 ml-3.5 mt-0.5">{item.detail}</p>
                                                        </div>
                                                        <div className={`text-[9px] px-2.5 py-1 rounded-md font-black border border-white/5 ${item.color} ${item.bg} tracking-tighter`}>
                                                            {item.status}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="col-span-5 lg:col-span-4 space-y-2">
                                        <button className="w-full bg-red-600 hover:bg-red-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 text-[11px] font-black shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all">
                                            🚨 SOS
                                        </button>
                                        {[
                                            { label: "QUYÊN GÓP", icon: "🎁", color: "bg-blue-600/90" },
                                            { label: "TNV", icon: "👥", color: "bg-[#1e293b]/90" },
                                            { label: "ĐỊNH VỊ", icon: "📍", color: "bg-[#1e293b]/90" }
                                        ].map((btn, i) => (
                                            <button key={i} className={`w-full ${btn.color} backdrop-blur-md text-white p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-bold border border-white/5 transition-all shadow-lg`}>
                                                <span className="opacity-80 text-sm">{btn.icon}</span>
                                                <span className="tracking-widest">{btn.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUY TRÌNH HOẠT ĐỘNG */}
            <section className="py-24 bg-[#010409] w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <h2 className="text-2xl lg:text-3xl font-black text-center mb-20 tracking-[0.2em] uppercase text-white/90">
                        Quy trình hoạt động
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500 to-blue-500/20 z-0"></div>

                        {[
                            { title: "Người dân gửi SOS", desc: "Người dân gửi yêu cầu cứu trợ bằng form SOS trên hệ thống.", icon: "📝" },
                            { title: "Hệ thống định vị", desc: "Hệ thống xác định vị trí chính xác và phân loại mức độ khẩn cấp.", icon: "📍" },
                            { title: "TNV nhận hỗ trợ", desc: "Tình nguyện viên gần nhất nhận thông báo và xác nhận hỗ trợ.", icon: "🤝" },
                            { title: "Điều phối cứu trợ", desc: "Lực lượng cứu trợ được điều phối đến đúng vị trí cần hỗ trợ.", icon: "🚚" },
                            { title: "Hoàn thành & cập nhật", desc: "Cập nhật trạng thái hoàn thành, hỗ trợ và báo cáo minh bạch.", icon: "✅" }
                        ].map((step, i) => (
                            <div key={i} className="relative text-center group z-10 px-2">
                                <div className="w-16 h-16 rounded-full bg-[#020817] border border-cyan-500/50 flex items-center justify-center mx-auto font-black shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                    <span className="text-cyan-400 text-sm">{i + 1}</span>
                                </div>
                                <h3 className="mt-6 font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THỐNG KÊ NỔI BẬT */}
            <section className="py-24 border-t border-white/5 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <h2 className="text-2xl lg:text-3xl font-black text-center mb-16 tracking-[0.2em] uppercase text-white/90">
                        Thống kê nổi bật
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Stats grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#071122]/60 border border-white/5 p-6 rounded-[2rem]">
                            {[
                                { label: "Tổng SOS", count: "120+", sub: "+18 hôm nay", color: "text-blue-400", icon: "👥" },
                                { label: "Đang xử lý", count: "50+", sub: "+5 hôm nay", color: "text-orange-400", icon: "🕒" },
                                { label: "Đã hỗ trợ", count: "500+", sub: "+35 hôm nay", color: "text-green-400", icon: "🛡️" },
                                { label: "Điểm cứu trợ", count: "30+", sub: "+4 hôm nay", color: "text-cyan-400", icon: "📍" },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0f172a] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-white/10 transition-colors">
                                    <div className="text-[11px] font-semibold text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest">
                                        <span className="text-sm">{item.icon}</span> {item.label}
                                    </div>
                                    <div className={`text-4xl font-black ${item.color}`}>{item.count}</div>
                                    <div className={`text-[10px] mt-2 font-bold ${item.color} opacity-80 tracking-wider`}>{item.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* AI Suggestions */}
                        <div className="bg-[#071122]/80 border border-cyan-500/30 p-8 rounded-[2rem] relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            <h3 className="text-blue-400 text-xs font-black tracking-widest mb-6 uppercase flex items-center gap-2">
                                AI-LITE GỢI Ý
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                    <span className="text-orange-500 text-lg mt-0.5">⚠️</span>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        <span className="text-white font-bold">Quảng Ngãi</span> có 15 yêu cầu chưa được xử lý
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                                    <span className="text-blue-400 text-lg mt-0.5">🌐</span>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Đề xuất: điều thêm <span className="text-white font-bold">2 TNV</span> từ Đà Nẵng
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SẴN SÀNG HỖ TRỢ */}
            <section className="relative py-24 text-center overflow-hidden border-t border-white/5 w-full">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504150559411-a9d80de6622e"
                        alt="Relief Work"
                        className="w-full h-full object-cover opacity-10 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-transparent to-[#020817]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
                            Sẵn sàng hỗ trợ cộng đồng?
                        </h2>
                        <p className="text-gray-400 mb-10 text-sm lg:text-base leading-relaxed">
                            Hãy cùng chung tay xây dựng hệ thống cứu trợ hiệu quả cho miền Trung.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] text-sm"
                            >
                                🚨 Gửi SOS ngay
                            </button>
                            <Link
                                to="/map"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm"
                            >
                                📖 Truy cập bản đồ
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIÊN HỆ */}
            <section id="lien-he" className="py-24 bg-[#020817] scroll-mt-20 border-t border-white/5 w-full">
                <div className="w-full max-w-2xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black mb-4 text-white uppercase tracking-wider">
                            Hỗ trợ thêm thông tin
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Bạn có câu hỏi hoặc cần hỗ trợ? Hãy để lại lời nhắn.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-gray-400 ml-1 block">Họ và tên</label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ và tên..."
                                    className="w-full bg-[#071122] border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-gray-400 ml-1 block">Số điện thoại</label>
                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại..."
                                    className="w-full bg-[#071122] border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-gray-400 ml-1 block">Email</label>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email..."
                                className="w-full bg-[#071122] border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-gray-400 ml-1 block">Nội dung</label>
                            <textarea
                                rows="4"
                                placeholder="Nhập nội dung cần hỗ trợ..."
                                className="w-full bg-[#071122] border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white resize-none placeholder:text-gray-600"
                            ></textarea>
                        </div>

                        <div className="text-center pt-6">
                            <button
                                type="button"
                                className="bg-white text-[#020817] hover:bg-gray-200 px-10 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 inline-flex items-center gap-2 text-sm"
                            >
                                Gửi lời nhắn
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#020817] border-t border-white/5 py-16 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                        {/* Col 1 */}
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white font-black text-xs">SOS</span>
                                <h2 className="text-lg font-black text-white tracking-tighter">MIỀN TRUNG</h2>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-xs">
                                Nền tảng công nghệ hỗ trợ cứu trợ thiên tai tại miền Trung Việt Nam.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs cursor-pointer hover:bg-blue-500">f</div>
                                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs cursor-pointer hover:bg-cyan-500">in</div>
                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs cursor-pointer hover:bg-red-500">▶</div>
                            </div>
                        </div>

                        {/* Col 2 */}
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Điều hướng</h4>
                            <ul className="space-y-3 text-gray-500 text-xs font-medium">
                                {["Trang chủ","Bản đồ","Hệ thống","Quy trình","Thống kê","Liên hệ"].map(item => (
                                    <li key={item} className="hover:text-cyan-400 cursor-pointer transition-colors">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 */}
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Khu vực hỗ trợ</h4>
                            <div className="grid grid-cols-2 gap-4 text-gray-500 text-xs font-medium">
                                <div className="space-y-3">
                                    {["Thanh Hóa","Nghệ An","Huế","Đà Nẵng","Quảng Ngãi"].map(p => (
                                        <div key={p} className="hover:text-white transition-colors cursor-default">{p}</div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    {["Gia Lai","Đắk Lắk","Khánh Hòa","Lâm Đồng"].map(p => (
                                        <div key={p} className="hover:text-white transition-colors cursor-default">{p}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Col 4 */}
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Thông tin liên hệ</h4>
                            <ul className="space-y-3 text-gray-400 text-xs font-medium">
                                <li className="flex items-center gap-3"><span className="text-gray-500">📞</span> Hotline: <span className="text-blue-400">1900 1234</span></li>
                                <li className="flex items-center gap-3"><span className="text-gray-500">✉</span> contact@sosmientrung.vn</li>
                                <li className="flex items-center gap-3"><span className="text-gray-500">🌐</span> fb.com/sosmientrung.vn</li>
                                <li className="flex items-start gap-3"><span className="text-gray-500">📍</span> TP. Đà Nẵng, Việt Nam</li>
                                <li className="flex items-center gap-3"><span className="text-gray-500">🕐</span> Hoạt động 24/7 – Miễn phí</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Copyright */}
            <div className="text-center py-6 bg-[#010409] border-t border-white/5 text-[11px] text-gray-600 font-medium w-full">
                © 2026 SOS Miền Trung - Điểm Cứu Trợ. All rights reserved.
            </div>
        </div>
    );
}