import React from "react";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";

export default function Homepage() {
    const { setIsFormOpen } = useSOS();

    return (
        <div className="min-h-screen bg-[#020612] text-white font-sans">

            <Header />

            <div className="max-w-[1280px] mx-auto px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    <div>

                        <div className="inline-flex items-center gap-2 bg-[#08152e] border border-[#182c51] px-4 py-2 rounded-full mb-6">
                            <span className="text-xs font-bold text-cyan-300 tracking-wider">
                                HỆ THỐNG HỖ TRỢ THIÊN TAI MIỀN TRUNG
                            </span>
                        </div>

                        <h1 className="text-6xl font-bold mb-3">
                            <span className="text-blue-500">
                                SOS
                            </span>{" "}
                            MIỀN TRUNG
                        </h1>

                        <h2 className="text-5xl font-bold leading-tight mb-6">
                            Bản đồ cứu trợ
                            <br />
                            <span className="text-cyan-400">
                                thời gian thực
                            </span>
                        </h2>

                        <p className="text-gray-400 leading-8 max-w-[520px] mb-10">
                            Nền tảng hỗ trợ kết nối người dân, tình nguyện viên
                            và lực lượng cứu trợ trong các tình huống thiên tai
                            tại miền Trung Việt Nam.
                        </p>

                        <div className="flex flex-wrap gap-5 mb-12">

                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="bg-red-600 hover:bg-red-700 transition-all px-7 py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Gửi yêu cầu SOS
                            </button>

                            <button className="bg-blue-600 hover:bg-blue-700 transition-all px-7 py-3 rounded-xl font-semibold shadow-lg">
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
                                    className="bg-[#071122] border border-cyan-900 rounded-2xl p-5"
                                >
                                    <h3 className="text-2xl font-bold text-cyan-400">
                                        {item[0]}
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-2">
                                        {item[1]}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>

                    <div className="relative h-[500px] bg-[#071122] border border-cyan-900 rounded-3xl overflow-hidden shadow-2xl">

                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                            alt="map"
                            className="w-full h-full object-cover opacity-60"
                        />

                        <div className="absolute top-5 right-5 bg-red-500 px-3 py-1 rounded-full text-xs font-bold">
                            LIVE
                        </div>

                        <div className="absolute bottom-5 left-5 bg-[#020612]/90 border border-cyan-900 rounded-2xl p-5 w-[260px] backdrop-blur">

                            <h3 className="text-lg font-bold text-white mb-2">
                                Quảng Ngãi
                            </h3>

                            <p className="text-sm text-gray-400 mb-3">
                                15 người cần hỗ trợ khẩn cấp
                            </p>

                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/40">
                                KHẨN CẤP
                            </span>

                        </div>

                    </div>

                </div>

                <section className="mt-24">

                    <h2 className="text-4xl font-bold text-center mb-14">
                        MỤC TIÊU CỦA CHÚNG TÔI
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {[
                            [
                                "Kết nối nhanh chóng",
                                "Kết nối người dân và lực lượng cứu trợ nhanh nhất."
                            ],
                            [
                                "Điều phối hiệu quả",
                                "Điều phối nguồn lực đúng nơi đúng lúc."
                            ],
                            [
                                "Minh bạch & chính xác",
                                "Dữ liệu thời gian thực minh bạch."
                            ],
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#071122] border border-cyan-900 rounded-3xl p-8"
                            >
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                                    {item[0]}
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    {item[1]}
                                </p>
                            </div>
                        ))}

                    </div>

                </section>

                <section className="mt-24">

                    <h2 className="text-4xl font-bold text-center mb-16">
                        QUY TRÌNH HOẠT ĐỘNG
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                        {[
                            "Người dân gửi SOS",
                            "Hệ thống định vị",
                            "TNV nhận hỗ trợ",
                            "Điều phối cứu trợ",
                            "Hoàn thành cập nhật",
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="bg-[#071122] border border-cyan-900 rounded-3xl p-6 text-center"
                            >

                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
                                    {index + 1}
                                </div>

                                <h3 className="mt-5 font-semibold">
                                    {step}
                                </h3>

                            </div>
                        ))}

                    </div>

                </section>

                <footer className="border-t border-cyan-900 mt-24 pt-12 pb-10">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        <div>

                            <h2 className="text-2xl font-bold text-cyan-400">
                                SOS MIỀN TRUNG
                            </h2>

                            <p className="text-gray-400 mt-4 leading-7">
                                Nền tảng công nghệ hỗ trợ cứu trợ thiên tai miền Trung.
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold mb-4">
                                Điều hướng
                            </h3>

                            <ul className="space-y-2 text-gray-400">
                                <li>Trang chủ</li>
                                <li>Bản đồ</li>
                                <li>Hệ thống</li>
                                <li>Liên hệ</li>
                            </ul>

                        </div>

                        <div>

                            <h3 className="font-semibold mb-4">
                                Khu vực hỗ trợ
                            </h3>

                            <ul className="space-y-2 text-gray-400">
                                <li>Đà Nẵng</li>
                                <li>Huế</li>
                                <li>Quảng Ngãi</li>
                                <li>Khánh Hòa</li>
                            </ul>

                        </div>

                        <div>

                            <h3 className="font-semibold mb-4">
                                Thông tin liên hệ
                            </h3>

                            <ul className="space-y-2 text-gray-400">
                                <li>Hotline: 1900 1234</li>
                                <li>Email: sosmientrung.vn</li>
                                <li>Đà Nẵng, Việt Nam</li>
                            </ul>

                        </div>

                    </div>

                    <p className="text-center text-gray-500 text-sm mt-10">
                        © 2024 SOS Miền Trung
                    </p>

                </footer>

            </div>

        </div>
    );
}