import React from "react";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";

export default function Homepage() {
    const { setIsFormOpen } = useSOS();

    return (
        <div className="min-h-screen bg-[#020817] text-white">

            <Header />

            <section className="max-w-[1400px] mx-auto px-8 py-14 grid lg:grid-cols-2 gap-10 items-center">

                <div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-800 bg-[#071122] mb-8">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>

                        <span className="text-xs tracking-wider text-cyan-300 font-semibold">
                            HỆ THỐNG HỖ TRỢ THIÊN TAI MIỀN TRUNG
                        </span>
                    </div>

                    <h1 className="text-6xl font-black leading-tight mb-4">
                        <span className="text-cyan-400">
                            SOS
                        </span>{" "}
                        MIỀN TRUNG
                    </h1>

                    <h2 className="text-5xl font-bold leading-tight mb-8">
                        Bản đồ cứu trợ
                        <br />

                        <span className="text-blue-400">
                            thời gian thực
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg leading-8 max-w-[580px] mb-10">
                        Nền tảng hỗ trợ kết nối người dân, tình nguyện viên
                        và lực lượng cứu trợ trong các tình huống thiên tai
                        tại miền Trung Việt Nam.
                    </p>

                    <div className="flex gap-5 mb-14">

                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-red-600 hover:bg-red-700 transition-all px-8 py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                        >
                            Gửi yêu cầu SOS
                        </button>

                        <button className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                            Mở bản đồ cứu trợ
                        </button>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        {[
                            ["11", "Khu vực hỗ trợ"],
                            ["120+", "Yêu cầu cứu trợ"],
                            ["50+", "Tình nguyện viên"],
                            ["30", "Điểm hỗ trợ"],
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="bg-[#071122] border border-cyan-900 rounded-2xl p-6 hover:border-cyan-500 transition-all"
                            >

                                <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                                    {item[0]}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    {item[1]}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="relative h-[620px] rounded-[30px] overflow-hidden border border-cyan-900 bg-[#071122] shadow-[0_0_80px_rgba(8,145,178,0.2)]">

                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop"
                        alt="map"
                        className="w-full h-full object-cover opacity-50"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020817]/20 to-[#020817]"></div>

                    <div className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full animate-pulse shadow-lg">
                        LIVE
                    </div>

                    <div className="absolute top-8 left-8 bg-[#020817]/90 backdrop-blur-xl border border-cyan-900 rounded-2xl p-5 w-[280px]">

                        <div className="flex items-center gap-2 mb-3">

                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

                            <span className="text-red-400 text-sm font-bold">
                                YÊU CẦU KHẨN CẤP
                            </span>

                        </div>

                        <h3 className="text-2xl font-bold mb-2">
                            Quảng Ngãi
                        </h3>

                        <p className="text-gray-400 leading-7 text-sm">
                            15 người đang cần cứu trợ khẩn cấp do ngập lụt diện rộng.
                        </p>

                    </div>

                    <div className="absolute bottom-8 right-8 bg-[#020817]/90 backdrop-blur-xl border border-cyan-900 rounded-2xl p-5">

                        <h4 className="text-cyan-400 font-bold mb-4">
                            CHÚ THÍCH
                        </h4>

                        <div className="space-y-3">

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm text-gray-300">
                                    Cần hỗ trợ
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span className="text-sm text-gray-300">
                                    Đang xử lý
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-300">
                                    Đã hỗ trợ
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-300">
                                    Điểm cứu trợ
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}