import React from "react";
import { Link } from "react-router-dom";
import { useSOS } from "../store/SOSContext";
import Header from "../layouts/Header.jsx";

export default function Homepage() {
    const { setIsFormOpen } = useSOS();

    return (
        <div className="Homepage min-h-screen bg-[#030916] text-white font-sans selection:bg-cyan-900">

            <Header/>

            <div className="Homepage-content max-w-[1440px] mx-auto">

                {/* --- HERO SECTION --- */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-10 py-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-[#0A162B] px-4 py-2 rounded-full text-xs font-medium text-cyan-400 border border-cyan-800/60 mb-6">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            HỆ THỐNG HỖ TRỢ THIÊN TAI MIỀN TRUNG
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold mt-2 leading-[1.1] tracking-tight">
                            <span className="text-cyan-400">SOS</span> MIỀN TRUNG
                        </h1>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-[1.2]">
                            Bản đồ cứu trợ
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                thời gian thực
                            </span>
                        </h2>

                        <p className="text-gray-400 mt-6 text-lg max-w-lg leading-relaxed">
                            Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                className="bg-red-600 px-6 py-3.5 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                onClick={() => setIsFormOpen(true)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                Gửi yêu cầu SOS
                            </button>

                            <Link
                                to="/map"
                                className="bg-blue-600 px-6 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                style={{ textDecoration: 'none' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                Mở bản đồ cứu trợ
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            {[
                                ["11", "Khu vực hỗ trợ", "text-blue-400"],
                                ["120+", "Yêu cầu cứu trợ", "text-red-400"],
                                ["50+", "Tình nguyện viên", "text-cyan-400"],
                                ["30", "Điểm hỗ trợ", "text-blue-400"],
                            ].map((item, index) => (
                                <div key={index} className="bg-[#0A162B] border border-cyan-900/40 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                    <h3 className={`text-2xl font-bold ${item[2]}`}>{item[0]}</h3>
                                    <p className="text-gray-400 mt-1 text-xs uppercase tracking-wider">{item[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Map Image Placeholder */}
                    <div className="relative bg-[#0A162B] border border-cyan-900/50 rounded-[2rem] p-2 flex items-center justify-center h-[500px] shadow-[0_0_30px_rgba(8,145,178,0.1)] overflow-hidden">
                        {/* Thay url ảnh bằng ảnh bản đồ thực tế của bạn */}
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                            alt="map interface"
                            className="rounded-[1.5rem] object-cover w-full h-full opacity-60 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030916] via-transparent to-transparent"></div>
                    </div>
                </section>

                {/* --- HORIZONTAL STATS BAR --- */}
                <section className="px-10 py-6">
                    <div className="flex flex-wrap justify-around items-center border-y border-cyan-900/30 py-8 bg-[#0A162B]/40">
                        {[
                            { label: "CẦN GIÚP", count: "128", sub: "+12 hôm nay", color: "text-red-500", icon: "M12 4v16m8-8H4" },
                            { label: "ĐANG XỬ LÝ", count: "56", sub: "+5 hôm nay", color: "text-orange-500", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { label: "ĐÃ HỖ TRỢ", count: "320", sub: "+35 hôm nay", color: "text-emerald-500", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { label: "ĐIỂM CỨU TRỢ", count: "24", sub: "+2 hôm nay", color: "text-blue-500", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 text-center lg:text-left">
                                <div className={`p-3 rounded-full bg-[#0A162B] border border-cyan-900/50 ${stat.color}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-semibold tracking-wider mb-1">{stat.label}</p>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-3xl font-bold">{stat.count}</h3>
                                        <span className={`text-xs ${stat.color}`}>{stat.sub}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- MỤC TIÊU CỦA CHÚNG TÔI --- */}
                <section className="px-10 py-16">
                    <h2 className="text-2xl font-bold text-center mb-12 uppercase tracking-widest text-gray-200">
                        Mục tiêu của chúng tôi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            ["Kết nối nhanh chóng", "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất trong mọi tình huống."],
                            ["Điều phối hiệu quả", "Điều phối nguồn lực cứu trợ thông minh, đúng nơi - đúng thời điểm - đúng nhu cầu."],
                            ["Minh bạch & chính xác", "Cung cấp dữ liệu thời gian thực, minh bạch, giúp ra quyết định nhanh chóng và chính xác."],
                        ].map((item, index) => (
                            <div key={index} className="bg-[#0A162B] border border-cyan-900/50 rounded-2xl p-8 text-center hover:border-cyan-500/50 transition-colors">
                                <div className="w-16 h-16 mx-auto rounded-full border border-cyan-700 flex items-center justify-center mb-6 bg-[#030916]">
                                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item[0]}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item[1]}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- HỆ THỐNG BẢN ĐỒ TRỰC QUAN --- */}
                <section className="px-10 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="col-span-1 lg:col-span-4">
                            <h2 className="text-3xl font-bold mb-4 uppercase leading-snug">
                                Hệ thống bản đồ <br/> trực quan
                            </h2>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                Theo dõi tình hình cứu trợ theo thời gian thực trên bản đồ tương tác. Dễ dàng lọc theo khu vực, trạng thái, loại hỗ trợ và mức độ khẩn cấp.
                            </p>
                            <ul className="space-y-4 mb-8 text-sm text-gray-300">
                                {["Cập nhật realtime 24/7", "Định vị chính xác", "Hiển thị heatmap", "Tuyến đường cứu trợ", "Cảnh báo quá tải"].map((li, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {li}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/map" className="inline-block bg-blue-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
                                Trải nghiệm bản đồ ngay →
                            </Link>
                        </div>
                        <div className="col-span-1 lg:col-span-8 bg-[#0A162B] border border-cyan-900/50 rounded-2xl p-6 flex flex-col md:flex-row gap-6 h-[400px]">
                            {/* Mockup Left List */}
                            <div className="w-full md:w-1/3 space-y-3 overflow-hidden">
                                <p className="text-xs text-gray-500 font-semibold mb-4">YÊU CẦU GẦN ĐÂY</p>
                                {[
                                    { p: "Quảng Ngãi", sub: "15 người cần hỗ trợ", tag: "KHẨN CẤP", tagColor: "bg-red-500/20 text-red-400", dot: "bg-red-500" },
                                    { p: "Đà Nẵng", sub: "8 người cần hỗ trợ", tag: "ĐANG XỬ LÝ", tagColor: "bg-orange-500/20 text-orange-400", dot: "bg-orange-500" },
                                    { p: "Huế", sub: "12 người cần hỗ trợ", tag: "ĐANG XỬ LÝ", tagColor: "bg-orange-500/20 text-orange-400", dot: "bg-orange-500" },
                                    { p: "Nghệ An", sub: "7 người cần hỗ trợ", tag: "ĐÃ HỖ TRỢ", tagColor: "bg-green-500/20 text-green-400", dot: "bg-green-500" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#030916] border border-cyan-900/30 p-3 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.dot}`}></div>
                                            <div>
                                                <p className="text-sm font-semibold">{item.p}</p>
                                                <p className="text-[10px] text-gray-400">{item.sub}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2 py-1 rounded ${item.tagColor} font-semibold`}>{item.tag}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Mockup Right Map */}
                            <div className="w-full md:w-2/3 bg-[#030916] rounded-xl border border-cyan-900/30 relative overflow-hidden flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b" alt="map" className="opacity-40 mix-blend-screen w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button className="bg-red-600 text-xs px-3 py-1.5 rounded flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> SOS</button>
                                    <button className="bg-blue-600 text-xs px-3 py-1.5 rounded flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full"></span> Quyên góp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- QUY TRÌNH HOẠT ĐỘNG --- */}
                <section className="px-10 py-16">
                    <h2 className="text-2xl font-bold text-center mb-16 uppercase tracking-widest text-gray-200">
                        Quy trình hoạt động
                    </h2>
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500 opacity-30 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                            {[
                                { title: "Người dân gửi SOS", desc: "Người dân gửi yêu cầu cứu trợ bằng form SOS trên hệ thống.", color: "text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]" },
                                { title: "Hệ thống định vị", desc: "Hệ thống xác định vị trí chính xác và phân loại mức độ khẩn cấp.", color: "text-blue-500 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
                                { title: "TNV nhận hỗ trợ", desc: "Tình nguyện viên gần nhất nhận thông báo và xác nhận hỗ trợ.", color: "text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]" },
                                { title: "Điều phối cứu trợ", desc: "Lực lượng cứu trợ được điều phối đến đúng vị trí cần hỗ trợ.", color: "text-blue-500 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
                                { title: "Hoàn thành & cập nhật", desc: "Cập nhật trạng thái hoàn thành, hỗ trợ và báo cáo minh bạch.", color: "text-green-500 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]" },
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center px-2">
                                    <div className={`w-20 h-20 rounded-full bg-[#030916] border-2 flex items-center justify-center text-2xl font-bold mb-6 ${step.color}`}>
                                        <span className="text-sm opacity-50 absolute -mt-12">0{index + 1}</span>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="text-[15px] font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- THỐNG KÊ NỔI BẬT & AI LITE --- */}
                <section className="px-10 py-16">
                    <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-widest text-gray-200">
                        Thống kê nổi bật
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Stats Box */}
                        <div className="flex-1 bg-[#0A162B] border border-cyan-900/50 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                            {[
                                ["Tổng SOS", "120+", "+16 hôm nay", "text-cyan-400"],
                                ["Đang xử lý", "50+", "+5 hôm nay", "text-orange-400"],
                                ["Đã hỗ trợ", "500+", "+35 hôm nay", "text-emerald-400"],
                                ["Điểm cứu trợ", "30+", "+4 hôm nay", "text-blue-400"],
                            ].map((stat, i) => (
                                <div key={i} className="text-center border-r border-cyan-900/30 last:border-0">
                                    <p className={`text-xs font-semibold mb-2 ${stat[3]}`}>{stat[0]}</p>
                                    <h3 className="text-4xl font-bold text-white mb-1">{stat[1]}</h3>
                                    <p className="text-[10px] text-gray-400">{stat[2]}</p>
                                </div>
                            ))}
                        </div>

                        {/* AI-LITE Box */}
                        <div className="lg:w-1/3 bg-[#0A162B] border border-blue-600/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(37,99,235,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full"></div>
                            <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                AI-LITE GỢI Ý
                            </h3>
                            <div className="bg-[#030916] border border-orange-500/30 rounded-lg p-4 mb-3 flex items-start gap-3">
                                <span className="text-orange-500 mt-0.5">⚠️</span>
                                <p className="text-sm text-gray-300">Quảng Ngãi có <strong className="text-white">15 yêu cầu</strong> chưa được xử lý.</p>
                            </div>
                            <div className="bg-[#030916] border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                                <span className="text-blue-500 mt-0.5">💡</span>
                                <p className="text-sm text-gray-300">Đề xuất: điều thêm <strong className="text-white">2 TNV</strong> từ Đà Nẵng.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SẴN SÀNG HỖ TRỢ CỘNG ĐỒNG --- */}
                <section className="px-6 py-10">
                    <div className="relative rounded-[2rem] overflow-hidden bg-[#0A162B] border border-cyan-900/50 py-20 px-6 text-center"
                         style={{
                             backgroundImage: `linear-gradient(rgba(3,9,22,0.85), rgba(3,9,22,0.85)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b')`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center'
                         }}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">SẴN SÀNG HỖ TRỢ CỘNG ĐỒNG?</h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            Hãy cùng chung tay xây dựng hệ thống cứu trợ hiệu quả cho miền Trung.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                Gửi SOS ngay
                            </button>
                            <Link to="/map" className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ textDecoration: 'none' }}>
                                Truy cập bản đồ
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="border-t border-cyan-900/40 mt-10 px-10 py-12 text-gray-400 bg-[#030916]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Cột 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                                <span className="text-red-500">SOS</span> MIỀN TRUNG
                            </h2>
                            <p className="text-sm leading-relaxed mb-4">
                                Nền tảng công nghệ hỗ trợ cứu trợ thiên tai tại miền Trung Việt Nam.
                            </p>
                            <div className="flex gap-3">
                                {/* Social Icons Placeholders */}
                                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">f</div>
                                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">in</div>
                                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">x</div>
                            </div>
                        </div>

                        {/* Cột 2 */}
                        <div>
                            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Điều hướng</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Trang chủ</Link></li>
                                <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Bản đồ</Link></li>
                                <li><Link to="/system" className="hover:text-cyan-400 transition-colors">Hệ thống</Link></li>
                                <li><Link to="/process" className="hover:text-cyan-400 transition-colors">Quy trình</Link></li>
                                <li><Link to="/stats" className="hover:text-cyan-400 transition-colors">Thống kê</Link></li>
                                <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Liên hệ</Link></li>
                            </ul>
                        </div>

                        {/* Cột 3 */}
                        <div>
                            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Khu vực hỗ trợ</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <ul className="space-y-3">
                                    <li>Thanh Hóa</li>
                                    <li>Nghệ An</li>
                                    <li>Huế</li>
                                    <li>Đà Nẵng</li>
                                    <li>Quảng Ngãi</li>
                                </ul>
                                <ul className="space-y-3">
                                    <li>Gia Lai</li>
                                    <li>Đắk Lắk</li>
                                    <li>Khánh Hòa</li>
                                    <li>Lâm Đồng</li>
                                    <li>Bình Định</li>
                                </ul>
                            </div>
                        </div>

                        {/* Cột 4 */}
                        <div>
                            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Thông tin liên hệ</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2"><span className="text-cyan-500">📞</span> Hotline: 1900 1234</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-500">✉️</span> Email: contact@sosmientrung.vn</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-500">🌐</span> Fanpage: fb.com/sosmientrung.vn</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-500">📍</span> Địa chỉ: TP. Đà Nẵng, Việt Nam</li>
                                <li className="flex items-center gap-2"><span className="text-cyan-500">🕒</span> Hoạt động 24/7 - Miễn phí</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-cyan-900/40 mt-10 pt-6 text-center text-xs text-gray-500">
                        <p>© 2024 SOS Miền Trung - Điểm Cứu Trợ. All rights reserved.</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}