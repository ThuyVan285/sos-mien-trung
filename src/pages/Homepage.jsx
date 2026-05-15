import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";
import MiniMap from "../components/map/MiniMap";

export default function Homepage() {
    const { setIsFormOpen, setIsDonationOpen } = useSOS();
    const navigate = useNavigate();

    return (
        <div className="Homepage min-h-screen bg-[#020817] text-[#f8fafc] font-sans">
            <Header />

            {/* HERO SECTION */}
            <section className="relative grid lg:grid-cols-2 grid-cols-1 gap-12 px-6 lg:px-20 py-20 items-center">
                <div className="z-10">
                    <span className="inline-flex items-center gap-2 bg-cyan-950/30 px-4 py-1.5 rounded-full text-xs font-medium text-cyan-400 border border-cyan-800/50 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Hệ thống hỗ trợ thiên tai miền Trung
                    </span>

                    <h1 className="text-5xl lg:text-7xl font-extrabold mt-8 tracking-tight">
                        <span className="text-blue-500">SOS</span> MIỀN TRUNG
                    </h1>
                    <h2 className="text-4xl lg:text-6xl font-bold mt-2 text-white/90 leading-[1.1]">
                        Bản đồ cứu trợ <br />
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            thời gian thực
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-8 text-lg max-w-lg leading-relaxed">
                        Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-900/20"
                            onClick={() => setIsFormOpen(true)}
                        >
                            🔴 Gửi yêu cầu SOS
                        </button>
                        <Link
                            to="/map"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20 flex items-center gap-2"
                        >
                            🗺️ Mở bản đồ cứu trợ
                        </Link>
                    </div>

                    {/* Quick Stats Mini */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                        {[
                            ["11", "Khu vực"],
                            ["120+", "Yêu cầu"],
                            ["50+", "Tình nguyện"],
                            ["30", "Điểm hỗ trợ"],
                        ].map(([val, label], i) => (
                            <div key={i} className="bg-[#0f172a]/50 border border-white/5 p-4 rounded-2xl">
                                <div className="text-2xl font-bold text-cyan-400">{val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Preview Image */}
                {/* MAP PREVIEW - Sử dụng MiniMap Component thực tế */}
                <div className="relative group h-[500px]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative h-full bg-[#071122] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        <MiniMap interactive={false} />
                    </div>
                </div>
            </section>

            {/* LIVE STATS BAR (Dòng số liệu màu cam/xanh trong hình) */}
            <section className="px-6 lg:px-20 py-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-[#0f172a]/40 p-8 rounded-[2rem] border border-white/5">
                    {[
                        { label: "CẦN GIÚP", count: "128", color: "text-red-500", sub: "+12 hôm nay" },
                        { label: "ĐANG XỬ LÝ", count: "56", color: "text-orange-400", sub: "+5 hôm nay" },
                        { label: "ĐÃ HỖ TRỢ", count: "320", color: "text-green-400", sub: "+25 hôm nay" },
                        { label: "ĐIỂM CỨU TRỢ", count: "24", color: "text-blue-400", sub: "+2 hôm nay" },
                    ].map((s, i) => (
                        <div key={i} className="text-center border-r border-white/5 last:border-0">
                            <p className="text-xs font-bold text-gray-500 tracking-tighter mb-1">{s.label}</p>
                            <p className={`text-4xl font-black ${s.color}`}>{s.count}</p>
                            <p className="text-[10px] text-gray-600 mt-1 uppercase font-medium">{s.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* GOALS SECTION */}
            <section className="px-6 lg:px-20 py-24">
                <h2 className="text-3xl font-black text-center mb-16 tracking-widest uppercase">Mục tiêu của chúng tôi</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Kết nối nhanh chóng", desc: "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất.", icon: "🚀" },
                        { title: "Điều phối hiệu quả", desc: "Điều phối nguồn lực cứu trợ thông minh: đúng nơi - đúng thời điểm - đúng nhu cầu.", icon: "🎯" },
                        { title: "Minh bạch & Chính xác", desc: "Dữ liệu thời gian thực giúp các đơn vị ra quyết định nhanh chóng và tin cậy.", icon: "💎" },
                    ].map((goal, i) => (
                        <div key={i} className="bg-gradient-to-b from-[#0f172a] to-transparent p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                            <div className="text-4xl mb-6">{goal.icon}</div>
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{goal.title}</h3>
                            <p className="text-gray-400 mt-4 leading-relaxed text-sm">{goal.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HỆ THỐNG BẢN ĐỒ TRỰC QUAN */}
            <section className="py-24 px-6 lg:px-20 bg-[#020817]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Nội dung bên trái */}
                    <div className="space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
                            HỆ THỐNG BẢN ĐỒ <br />
                            <span className="text-blue-500">TRỰC QUAN</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
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
                                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-[10px] text-blue-400">
                                        ✔
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all group shadow-lg shadow-blue-900/20"
                            onClick={() => navigate("/map")}
                        >
                            Trải nghiệm bản đồ ngay
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>

                    {/* Khối mô phỏng bản đồ bên phải */}
                    {/* Khối giao diện bản đồ HUD */}
                    <div className="relative bg-[#020817] rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group h-[550px]">

                        {/* 1. LÕI BẢN ĐỒ: Thêm Filter để làm bản đồ tối và "ngầu" hơn */}
                        <div className="absolute inset-0 z-0 grayscale-[0.4] brightness-[0.6] contrast-[1.2]">
                            <MiniMap interactive={false} />
                        </div>

                        {/* 2. LỚP PHỦ CHIỀU SÂU: Tạo hiệu ứng tối dần ở các góc để nổi bật UI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-[#020817]/40 z-10 pointer-events-none"></div>

                        {/* 3. NỘI DUNG HUD (Z-20) */}
                        <div className="relative z-20 h-full p-6 flex flex-col justify-between">

                            {/* Header nhỏ phía trên bản đồ */}
                            <div className="flex justify-between items-start">
                                <div className="bg-[#020817]/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">Live Tracking</span>
                                </div>
                            </div>

                            {/* Khu vực chính: Bảng tin và Nút bấm */}
                            <div className="grid grid-cols-12 gap-4 items-end">

                                {/* BẢNG TIN BÊN TRÁI: Thiết kế tối giản, hiện đại */}
                                <div className="col-span-7 space-y-3">
                                    <div className="bg-[#071122]/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-5 shadow-2xl">
                                        <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
                                            <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                                            Yêu cầu gần đây
                                        </h4>

                                        <div className="space-y-2">
                                            {[
                                                { loc: "Quảng Ngãi", status: "KHẨN CẤP", color: "text-red-500", bg: "bg-red-500/10", pulse: true },
                                                { loc: "Đà Nẵng", status: "ĐANG XỬ LÝ", color: "text-orange-500", bg: "bg-orange-500/10" },
                                                { loc: "Huế", status: "ĐANG XỬ LÝ", color: "text-orange-500", bg: "bg-orange-500/10" },
                                                { loc: "Nghệ An", status: "ĐÃ HỖ TRỢ", color: "text-green-500", bg: "bg-green-500/10" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center group/item cursor-default">
                                                    <div className="flex items-center gap-3">
                                                        {item.pulse && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>}
                                                        <span className="text-xs font-semibold text-white/90 group-hover/item:text-white transition-colors">{item.loc}</span>
                                                    </div>
                                                    <div className={`text-[9px] px-2.5 py-1 rounded-lg font-black border border-white/5 ${item.color} ${item.bg} tracking-tighter`}>
                                                        {item.status}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CÁC NÚT ĐIỀU KHIỂN BÊN PHẢI: Tạo khối và đổ bóng neon */}
                                <div className="col-span-5 space-y-3">
                                    <button className="w-full bg-red-600 hover:bg-red-500 text-white p-3.5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all active:scale-95 group">
                                        <span className="text-lg group-hover:rotate-12 transition-transform">🚨</span> SOS
                                    </button>

                                    <div className="grid grid-cols-1 gap-2">
                                        <button onClick={() => setIsDonationOpen(true)} className="w-full bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-white p-3 rounded-xl flex items-center gap-3 text-[10px] font-bold border border-white/5 transition-all shadow-lg">
                                            <span className="opacity-80">🎁</span>
                                            <span className="tracking-widest">QUYÊN GÓP</span>
                                        </button>
                                        <button onClick={() => alert("Tính năng đăng ký Tình Nguyện Viên đang được phát triển.")} className="w-full bg-[#1e293b]/90 hover:bg-[#334155] backdrop-blur-md text-white p-3 rounded-xl flex items-center gap-3 text-[10px] font-bold border border-white/5 transition-all shadow-lg">
                                            <span className="opacity-80">👥</span>
                                            <span className="tracking-widest">TÌNH NGUYỆN</span>
                                        </button>
                                        <button onClick={() => navigate("/map")} className="w-full bg-[#1e293b]/90 hover:bg-[#334155] backdrop-blur-md text-white p-3 rounded-xl flex items-center gap-3 text-[10px] font-bold border border-white/5 transition-all shadow-lg">
                                            <span className="opacity-80">📍</span>
                                            <span className="tracking-widest">ĐỊNH VỊ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. HIỆU ỨNG QUÉT RADAR (Optional - tạo cảm giác công nghệ cao) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] animate-[spin_10s_linear_infinite] z-[5] pointer-events-none"></div>
                    </div>

                </div>
            </section>

            {/* QUY TRÌNH HOẠT ĐỘNG */}
            <section className="px-6 lg:px-20 py-24 bg-[#010409]">
                <h2 className="text-3xl font-black text-center mb-20 tracking-widest uppercase">
                    QUY TRÌNH HOẠT ĐỘNG
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                    {/* Đường kẻ nối giữa các bước (chỉ hiện trên desktop) */}
                    <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500 to-blue-500/20 z-0"></div>

                    {[
                        {
                            title: "Người dân gửi SOS",
                            desc: "Người dân gửi yêu cầu cứu trợ bằng form SOS trên hệ thống."
                        },
                        {
                            title: "Hệ thống định vị",
                            desc: "Hệ thống xác định vị trí chính xác và phân loại mức độ khẩn cấp."
                        },
                        {
                            title: "TNV nhận hỗ trợ",
                            desc: "Tình nguyện viên gần nhất nhận thông báo và xác nhận hỗ trợ."
                        },
                        {
                            title: "Điều phối cứu trợ",
                            desc: "Lực lượng cứu trợ được điều phối đến đúng vị trí cần hỗ trợ."
                        },
                        {
                            title: "Hoàn thành & cập nhật",
                            desc: "Cập nhật trạng thái hoàn thành, hỗ trợ và báo cáo minh bạch."
                        }
                    ].map((step, i) => (
                        <div key={i} className="relative text-center group z-10">
                            {/* Vòng tròn số thứ tự */}
                            <div className="w-16 h-16 rounded-full bg-[#020817] border-2 border-cyan-500 flex items-center justify-center mx-auto text-xl font-black shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                                {i + 1}
                            </div>

                            {/* Tiêu đề bước */}
                            <h3 className="mt-6 font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                                {step.title}
                            </h3>

                            {/* Nội dung mô tả (Phần bị thiếu trước đó) */}
                            <p className="mt-3 text-xs text-gray-400 leading-relaxed px-2">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* THỐNG KÊ NỔI BẬT & AI SUGGESTIONS */}
            <section className="px-6 lg:px-20 py-16">
                <h2 className="text-2xl font-black text-center mb-10 tracking-[0.2em] uppercase text-white/90">
                    THỐNG KÊ NỔI BẬT
                </h2>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Nhóm thẻ thống kê bên trái */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#071122]/60 border border-white/5 p-6 rounded-[2rem]">
                        {[
                            { label: "Tổng SOS", count: "120+", sub: "+18 hôm nay", color: "text-blue-400", icon: "👥" },
                            { label: "Đang xử lý", count: "50+", sub: "+5 hôm nay", color: "text-orange-400", icon: "🕒" },
                            { label: "Đã hỗ trợ", count: "500+", sub: "+35 hôm nay", color: "text-green-400", icon: "🛡️" },
                            { label: "Điểm cứu trợ", count: "30+", sub: "+4 hôm nay", color: "text-cyan-400", icon: "📍" },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#0f172a] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                    <span>{item.icon}</span> {item.label}
                                </div>
                                <div className={`text-3xl font-black ${item.color}`}>{item.count}</div>
                                <div className={`text-[10px] mt-2 font-bold ${item.color} opacity-80`}>{item.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Thẻ AI-LITE gợi ý bên phải */}
                    <div className="bg-[#071122]/80 border border-cyan-500/30 p-6 rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 text-4xl">🧠</div>
                        <h3 className="text-blue-400 text-xs font-black tracking-widest mb-6 uppercase flex items-center gap-2">
                            AI-LITE GỢI Ý
                        </h3>

                        <div className="space-y-4">
                            <div className="flex gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                <span className="text-orange-500">⚠️</span>
                                <p className="text-xs text-gray-300">
                                    <span className="text-white font-bold">Quảng Ngãi</span> có 15 yêu cầu chưa được xử lý
                                </p>
                            </div>
                            <div className="flex gap-3 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl">
                                <span className="text-blue-400">🌐</span>
                                <p className="text-xs text-gray-300">
                                    Đề xuất điều thêm <span className="text-white font-bold">2 TNV</span> từ Đà Nẵng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SẴN SÀNG HỖ TRỢ CỘNG ĐỒNG */}
            <section className="relative px-6 py-24 text-center overflow-hidden">
                {/* Ảnh nền mờ phía sau */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504150559411-a9d80de6622e"
                        alt="Relief Work"
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-transparent to-[#020817]"></div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        SẴN SÀNG HỖ TRỢ CỘNG ĐỒNG?
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-sm lg:text-base">
                        Hãy cùng chung tay xây dựng hệ thống cứu trợ hiệu quả cho miền Trung.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                        >
                            🚨 Gửi SOS ngay
                        </button>
                        <Link
                            to="/map"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                        >
                            📖 Truy cập bản đồ
                        </Link>
                    </div>
                </div>
            </section>

            {/* HỖ TRỢ THÊM THÔNG TIN */}
            <section id="lien-he" className="px-6 lg:px-20 py-24 bg-[#020817] scroll-mt-20">
                <div className="max-w-4xl mx-auto">
                    {/* Tiêu đề Form */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black mb-4 text-white">
                            Hỗ trợ thêm thông tin
                        </h2>
                        <p className="text-gray-400">
                            Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi.
                        </p>
                    </div>

                    {/* Form Container */}
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.'); e.target.reset(); }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Họ và tên */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Họ và tên</label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ và tên của bạn"
                                    className="w-full bg-[#1c222d] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                                />
                            </div>
                            {/* Số điện thoại */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Số điện thoại</label>
                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại của bạn"
                                    className="w-full bg-[#1c222d] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email của bạn"
                                className="w-full bg-[#1c222d] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                            />
                        </div>

                        {/* Nội dung */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Nội dung</label>
                            <textarea
                                rows="5"
                                placeholder="Nhập nội dung tin nhắn của bạn"
                                className="w-full bg-[#1c222d] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white resize-none"
                            ></textarea>
                        </div>

                        {/* Nút gửi */}
                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 inline-flex items-center gap-2"
                            >
                                ⚠️ Gửi tin nhắn
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            {/* FOOTER */}
            <footer className="bg-[#020817] border-t border-white/5 px-6 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-xl font-black text-blue-500 tracking-tighter">SOS MIỀN TRUNG</h2>
                        <p className="text-gray-500 mt-4 leading-relaxed">
                            Cung cấp giải pháp công nghệ vì cộng đồng, giúp giảm thiểu rủi ro thiên tai.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Điều hướng</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Trang chủ</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Bản đồ cứu trợ</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Quy trình</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                            Khu vực hỗ trợ
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-500 text-[13px]">
                            {/* Cột 1: Thành phố & Các tỉnh miền trên */}
                            <div className="space-y-2">
                                <p className="text-cyan-400/80 font-semibold text-[11px] uppercase tracking-tighter mb-1">Thành phố</p>
                                <li className="list-none hover:text-white transition-colors cursor-default">TP. Đà Nẵng</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">TP. Huế</li>

                                <p className="text-cyan-400/80 font-semibold text-[11px] uppercase tracking-tighter mb-1 mt-4">Tỉnh thành</p>
                                <li className="list-none hover:text-white transition-colors cursor-default">Thanh Hóa</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Nghệ An</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Hà Tĩnh</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Quảng Trị</li>
                            </div>

                            {/* Cột 2: Các tỉnh còn lại & Tây Nguyên */}
                            <div className="space-y-2 flex flex-col justify-end">
                                <li className="list-none hover:text-white transition-colors cursor-default">Quảng Ngãi</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Khánh Hòa</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Gia Lai</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Đắk Lắk</li>
                                <li className="list-none hover:text-white transition-colors cursor-default">Lâm Đồng</li>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                            Thông tin liên hệ
                        </h4>
                        <ul className="space-y-4 text-gray-400 text-[13px]">
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-full text-[10px]">📞</span>
                                <p>Hotline: <span className="text-blue-400 font-bold">1900 1234</span></p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-full text-[10px]">✉️</span>
                                <p>Email: <span className="hover:text-white cursor-pointer transition-colors">contact@sosmientrung.vn</span></p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-full text-[10px]">🌐</span>
                                <p>Fanpage: <span className="hover:text-white cursor-pointer transition-colors">fb.com/sosmientrung.vn</span></p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-full text-[10px]">📍</span>
                                <p>Địa chỉ: <span className="text-gray-300">TP. Đà Nẵng, Việt Nam</span></p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-full text-[10px]">🕒</span>
                                <p>Hoạt động <span className="text-white">24/7</span> - <span className="text-green-500 font-medium">Miễn phí</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
                    © 2026 SOS Miền Trung. Nền tảng vì cộng đồng. All rights reserved.
                </div>
            </footer>
        </div>
    );
}