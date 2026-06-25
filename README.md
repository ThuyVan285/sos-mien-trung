# 🆘 SOS Miền Trung

**Hệ thống điều phối cứu trợ thiên tai Miền Trung**

> Kết nối nhanh – Cứu trợ kịp thời

Website giúp người dân gửi tín hiệu cầu cứu, hiển thị trực quan các yêu cầu cứu trợ và điểm hỗ trợ trên bản đồ số, đồng thời hỗ trợ tình nguyện viên và quản trị viên điều phối nguồn lực cứu trợ theo thời gian thực trong các tình huống bão lũ, sạt lở tại khu vực Miền Trung Việt Nam.

---

## Bối cảnh & Vấn đề

Miền Trung Việt Nam thường xuyên chịu ảnh hưởng nặng của bão, lũ lụt và sạt lở đất. Hiện nay, người dân chủ yếu đăng tin cầu cứu qua Facebook, Zalo, các nhóm chat — dẫn đến:

- Thông tin trôi nhanh, trùng lặp, thiếu xác thực
- Không xác định được vị trí chính xác người cần hỗ trợ
- Không phân loại được mức độ khẩn cấp
- Lực lượng cứu trợ tập trung sai nơi: chỗ thì quá tải, chỗ thì bị bỏ sót

**SOS Miền Trung** ra đời không phải để "xem", mà để **hành động** — không chỉ kết nối, mà còn **điều phối** thực tế hoạt động cứu trợ.

---

## Tính năng chính

### 🧑‍🤝‍🧑 Người cần hỗ trợ (Victim)
- Gửi yêu cầu SOS: họ tên, SĐT, vị trí trên bản đồ, loại hỗ trợ cần (khẩn cấp, thực phẩm, y tế...)
- Theo dõi trạng thái yêu cầu: `pending → helping → done`
- Hủy yêu cầu nếu đã được hỗ trợ từ nguồn khác (request không bị xóa khỏi DB, chỉ rời khỏi danh sách active)

### 🧑‍🚒 Tình nguyện viên (Volunteer)
- Xem bản đồ cứu trợ trực quan, phân biệt theo màu sắc/mức độ khẩn cấp
- Tìm kiếm & lọc yêu cầu theo khu vực, loại hỗ trợ, mức độ ưu tiên
- Nhận hỗ trợ (Claim Request) — chỉ nhận được khi request đang `pending`
- Cập nhật trạng thái khi hoàn thành nhiệm vụ
- Đăng ký tham gia: thông tin cá nhân, khu vực, kỹ năng (y tế, vận chuyển, phân phát...)

### 💝 Người quyên góp (Donor)
- Gửi thông tin quyên góp: tiền, thực phẩm, y tế theo khu vực
- Xem khu vực đang thiếu nguồn lực để quyên góp đúng nơi cần

### 🛠️ Quản trị viên (Admin)
- Quản lý yêu cầu cứu trợ, điểm cứu trợ, tình nguyện viên
- Cập nhật trạng thái điểm hỗ trợ: `còn đủ | sắp hết | khẩn cấp`
- Đăng thông báo thiên tai, cảnh báo khu vực nguy hiểm
- Xem thống kê tổng hợp toàn hệ thống

### 🧠 AI-lite — Gợi ý điều phối (điểm nhấn)
- Phát hiện khu vực quá tải (nhiều `pending`, ít TNV)
- Gợi ý phân bổ tình nguyện viên giữa các khu vực
- Ví dụ: *"Quảng Ngãi có 12 yêu cầu chưa xử lý → cần thêm 2 TNV"*

### 🗺️ Bản đồ & Trực quan hóa
- Hiển thị marker, cluster, heatmap trên bản đồ
- Màu trạng thái: 🔴 Khẩn cấp (nhấp nháy) · 🟡 Đang chờ · 🔵 Đang xử lý · 🟢 Hoàn thành
- Click marker → popup chi tiết (tên, SĐT, địa chỉ, loại yêu cầu, trạng thái, nút "Nhận hỗ trợ")

---

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Giao diện (UI) | React.js |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Bản đồ tương tác | React Leaflet + VietMap API |
| Cơ sở dữ liệu | Firebase Firestore (NoSQL, real-time) |
| Quản lý state | React Context API (`SOSContext`) + Custom Hooks |
| IDE | WebStorm |
| Môi trường chạy | Node.js |

### Kiến trúc phân tầng

```
Presentation Layer   →  Homepage, MapPage, AdminPage (React UI)
        ↕
Context/State Layer  →  SOSContext — quản lý state toàn cục
        ↕
Service Layer        →  sosService, volunteerService, donationService, adminService
        ↕
Firebase Firestore    →  Lưu trữ & đồng bộ dữ liệu thời gian thực
```

### Cấu trúc thư mục

```
sos-mien-trung/
├── public/                  # Ảnh, icon tĩnh
├── src/
│   ├── assets/styles/        # CSS toàn cục
│   ├── components/
│   │   ├── common/            # Button, Input, Modal
│   │   ├── dashboard/         # StatusStats
│   │   ├── map/               # MapView, Marker, Popup, Heatmap, MiniMap
│   │   └── panels/             # LeftPanel, FilterPanel, AIPanel, AdvancedFilterModal
│   ├── features/
│   │   ├── sos/                # SOSForm, CancelModal, sosService.js
│   │   ├── volunteer/          # VolunteerForm, TaskList
│   │   ├── donation/           # DonationForm
│   │   └── analytics/          # Dashboard
│   ├── hooks/                  # useLiveStats (custom hook)
│   ├── layouts/                # Header, Sidebar, FloatMenu, MainLayout
│   ├── MapComponent.jsx
│   └── main.jsx
├── seedData.mjs              # Script tạo dữ liệu mẫu
├── vite.config.js
└── package.json
```

---

## Mô hình dữ liệu (Firestore Collections)

| Collection | Mục đích |
|---|---|
| `sos_requests` | Yêu cầu cứu trợ — tên, SĐT, tỉnh/thành, địa chỉ, loại hỗ trợ, mức độ, trạng thái, lat/lng |
| `volunteers` | Thông tin tình nguyện viên — tên, SĐT, email, khu vực, kỹ năng, thời gian tham gia |
| `donations` | Thông tin quyên góp — người/tổ chức, hình thức, giá trị, ghi chú |
| `supplies` | Vật tư cứu trợ — tên, nhóm, số lượng, đơn vị, vị trí lưu trữ |

Các collection được liên kết gián tiếp qua các trường dùng chung (`province`, `status`, `createdAt`) theo mô hình NoSQL — không dùng khóa ngoại.

**Trạng thái request hợp lệ:**

```
pending → helping → done
pending → cancelled
helping → cancelled
```

---

## Quy tắc nghiệp vụ nổi bật

- Mỗi yêu cầu cứu trợ bắt buộc có SĐT hợp lệ và vị trí (lat/lng)
- Mặc định `priority = normal`; nếu chọn khẩn cấp → `priority = urgent` (marker đỏ, nhấp nháy)
- Một TNV chỉ nên xử lý đồng thời tối đa ~3 request
- 2 TNV không thể cùng nhận 1 request — backend kiểm tra lại trạng thái trước khi update (transaction/locking) để tránh race condition
- Request đã `done` không thể chỉnh sửa hoặc hủy
- Hủy request **không xóa dữ liệu** trong Firestore — chỉ chuyển trạng thái `cancelled`, loại khỏi danh sách active để phục vụ thống kê
- Không dùng hệ thống đăng nhập truyền thống — định danh nhẹ (lightweight auth) qua SĐT hoặc session trình duyệt; quyền hủy request được xác thực bằng SĐT trùng khớp hoặc `owner_token`

---

## Thống kê & Phân tích

Hệ thống cung cấp dashboard mini real-time ngay trên bản đồ:

- 🟥 Số yêu cầu cần giúp · 🟨 Đang xử lý · 🟩 Đã hoàn thành · 📍 Số điểm hỗ trợ
- Thống kê theo khu vực, theo tình nguyện viên, theo loại quyên góp, theo thời gian (giờ/ngày)
- Tỷ lệ hủy yêu cầu (`cancel_rate`) để đánh giá hiệu quả điều phối
- AI-lite: phát hiện khu vực quá tải, hiển thị heatmap vùng nguy cấp

---

## Cài đặt & Chạy thử

> Yêu cầu: Node.js đã cài sẵn, và một project Firebase đã khởi tạo (Firestore enabled).

```bash
# 1. Clone project
git clone <repo-url>
cd sos-mien-trung

# 2. Cài dependencies
npm install

# 3. Cấu hình Firebase
# Tạo file .env hoặc cập nhật src/firebase.js với:
# apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId

# 4. (Tùy chọn) Seed dữ liệu mẫu
node seedData.mjs

# 5. Chạy ở môi trường dev
npm run dev

# 6. Build production
npm run build
```

---

## Kiểm thử

Hệ thống đã được kiểm thử thủ công trên 3 trình duyệt (Chrome, Firefox, Edge) cho các luồng chính:

- ✅ Gửi yêu cầu SOS (validate dữ liệu, hiển thị marker tức thì)
- ✅ Cập nhật trạng thái cứu trợ (Nhận hỗ trợ / Hoàn thành) — đồng bộ real-time giữa các tab/thiết bị
- ✅ Tìm kiếm & lọc theo khu vực
- ✅ Đăng ký tình nguyện viên / quyên góp
- ✅ Trang quản trị: đăng nhập, quản lý yêu cầu, quản lý vật tư
- ✅ Responsive trên desktop, tablet, mobile
- ✅ Đồng bộ Firestore real-time giữa nhiều tab/thiết bị (độ trễ < 1 giây)

---

## Hạn chế hiện tại

- Vị trí dựa trên địa chỉ khai báo, chưa lấy GPS thực tế từ thiết bị
- Chưa có thông báo đẩy (push notification) chủ động đến tình nguyện viên
- Cơ chế bảo mật/phân quyền còn ở mức cơ bản (phù hợp demo, chưa production-ready)
- Chưa hỗ trợ chat/liên lạc trực tiếp giữa người cần hỗ trợ và TNV

## Hướng phát triển tiếp theo

- 📍 Tích hợp định vị GPS thực tế từ thiết bị
- 🔔 Push notification thời gian thực
- 🔐 Firebase Authentication (SĐT/email)
- 📱 Ứng dụng di động (Mobile App)
- 🧠 Tăng cường AI hỗ trợ dự báo & phân tích dữ liệu
- 🛣️ Tối ưu tuyến đường cứu trợ

---

## Thành viên thực hiện

| Họ tên | MSSV |
|---|---|
| Nguyễn Phạm Minh Tuyến | 25AI065 |
| Hoàng Võ Thành Tâm | 25AI046 |
| Nguyễn Thị Thúy Vân | 25AI066 |
| Trần Nhật Minh | 25AI025 |

**Lớp:** 25GAI
**Trường:** Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn (VKU), Khoa Khoa học Máy tính
**Đồ án:** Best Web Design — *SOS Miền Trung, Đà Nẵng, tháng 6/2026*

---

## Lời cảm ơn

Nhóm xin gửi lời cảm ơn đến Công ty Cổ phần VietMap đã cung cấp Maps API miễn phí phục vụ nghiên cứu, giúp hệ thống hiển thị chính xác các điểm cứu trợ trên bản đồ Việt Nam.

## License

Đồ án phục vụ mục đích học tập — vui lòng cập nhật License phù hợp nếu triển khai thực tế.
