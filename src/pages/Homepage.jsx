import { Link } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";

export default function Homepage() {
    const { setIsFormOpen } = useSOS();

    return (
        <div className="Homepage min-h-screen bg-[#020817] text-white">

            <Header />

            <div className="Homepage-content">

                <section className="grid grid-cols-2 gap-10 px-10 py-16">

                    <div>

                        <p className="inline-block bg-[#0f172a] px-4 py-2 rounded-full text-sm text-cyan-300 border border-cyan-700">
                            Hệ thống hỗ trợ thiên tai miền Trung
                        </p>

                        <h1 className="text-6xl font-bold mt-6 leading-tight">
                            <span className="text-cyan-400">SOS</span> MIỀN TRUNG
                        </h1>

                        <h2 className="text-5xl font-bold mt-4 leading-tight">
                            Bản đồ cứu trợ
                            <br />
                            <span className="text-blue-400">
                                thời gian thực
                            </span>
                        </h2>

                        <p className="text-gray-400 mt-6 leading-8">
                            Nền tảng hỗ trợ kết nối người dân,
                            tình nguyện viên và lực lượng cứu trợ.
                        </p>

                        <div className="flex gap-5 mt-8">

                            <button 
                                className="bg-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-700"
                                onClick={() => setIsFormOpen(true)}
                            >
                                Gửi yêu cầu SOS
                            </button>

                            <Link 
                                to="/map"
                                className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center"
                                style={{ textDecoration: 'none' }}
                            >
                                Mở bản đồ cứu trợ
                            </Link>

                        </div>

                        <div className="grid grid-cols-4 gap-5 mt-12">

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

                                    <p className="text-gray-400 mt-2 text-sm">
                                        {item[1]}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="bg-[#071122] border border-cyan-900 rounded-3xl p-5 flex items-center justify-center">

                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                            alt="map"
                            className="rounded-2xl object-cover w-full h-full"
                        />

                    </div>

                </section>

                <section className="px-10 py-10">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        MỤC TIÊU CỦA CHÚNG TÔI
                    </h2>

                    <div className="grid grid-cols-3 gap-8">

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

                                <h3 className="text-2xl font-bold text-cyan-400">
                                    {item[0]}
                                </h3>

                                <p className="text-gray-400 mt-4 leading-7">
                                    {item[1]}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                <section className="px-10 py-20">

                    <h2 className="text-4xl font-bold text-center mb-16">
                        QUY TRÌNH HOẠT ĐỘNG
                    </h2>

                    <div className="grid grid-cols-5 gap-6">

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

                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                                    {index + 1}
                                </div>

                                <h3 className="mt-5 font-semibold">
                                    {step}
                                </h3>

                            </div>

                        ))}

                    </div>

                </section>

                <footer className="border-t border-cyan-900 px-10 py-10 text-gray-400">

                    <div className="grid grid-cols-4 gap-10">

                        <div>

                            <h2 className="text-2xl font-bold text-cyan-400">
                                SOS MIỀN TRUNG
                            </h2>

                            <p className="mt-4">
                                Nền tảng công nghệ hỗ trợ cứu trợ thiên tai miền Trung.
                            </p>

                        </div>

                        <div>

                            <h3 className="text-white font-semibold mb-4">
                                Điều hướng
                            </h3>

                            <ul className="space-y-2">
                                <li>Trang chủ</li>
                                <li>Bản đồ</li>
                                <li>Hệ thống</li>
                                <li>Liên hệ</li>
                            </ul>

                        </div>

                        <div>

                            <h3 className="text-white font-semibold mb-4">
                                Khu vực hỗ trợ
                            </h3>

                            <ul className="space-y-2">
                                <li>Đà Nẵng</li>
                                <li>Huế</li>
                                <li>Quảng Ngãi</li>
                                <li>Khánh Hòa</li>
                            </ul>

                        </div>

                        <div>

                            <h3 className="text-white font-semibold mb-4">
                                Thông tin liên hệ
                            </h3>

                            <ul className="space-y-2">
                                <li>Hotline: 1900 1234</li>
                                <li>Email: sosmientrung.vn</li>
                                <li>Đà Nẵng, Việt Nam</li>
                            </ul>

                        </div>

                    </div>

                    <p className="text-center mt-10 text-sm text-gray-500">
                        © 2024 SOS Miền Trung
                    </p>

                </footer>

            </div>

        </div>
    );
}