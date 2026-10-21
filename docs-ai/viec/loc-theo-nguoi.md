# 📌 PHÂN CÔNG & TIẾN ĐỘ THEO TỪNG VAI TRÒ

## 👥 1. Vai trò trong dự án
- **Bạn (Product Owner & Developer):** Đưa ra yêu cầu, duyệt kế hoạch, quyết định công nghệ và nghiệm thu sản phẩm.
- **AI Antigravity (Mentor & Co-developer):** Đề xuất giải pháp, giải thích khái niệm, soạn code mẫu, hỗ trợ vận hành và sửa lỗi khi bạn cho phép.

---

## 🚦 2. Trạng thái công việc

### ✅ ĐÃ XONG (Completed 100%)
- [x] **Giai đoạn 1: Setup Nền tảng** (Next.js 16, TypeScript, Tailwind v4, server dev cổng 3005).
- [x] **Tài liệu & Bộ nhớ dự án** (Đầy đủ thư mục `docs-ai/` và cập nhật `CLAUDE.md`).
- [x] **Font chữ thương hiệu** (Chuyển đổi hoàn hảo sang Google Roboto không chân chuẩn tiếng Việt).
- [x] **Nhận diện thương hiệu mới:** Logo Chú Vịt Vàng Suy Nghĩ [ThinkingDuckLogo.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/src/components/common/ThinkingDuckLogo.tsx), dải màu Xanh Rêu Rừng Rậm & Hạt nhám Grain Texture.
- [x] **Trang chủ (`/`)**: Giao diện nhập Game PIN, nút điều hướng Host, Soạn câu hỏi và 4 khối màu biểu tượng.
- [x] **Màn hình Người chơi (`/play`)**: Nhập biệt danh, 10 linh vật Avatar, sảnh chờ, 4 nút bấm cảm ứng cực đại và phản hồi điểm số.
- [x] **Màn hình Host (`/host`)**: Sinh mã PIN lớn, mã QR quét điện thoại, đếm ngược thời gian, hiện đồ thị kết quả, bảng vàng Leaderboard và bục vinh danh Podium.
- [x] **Bộ não Realtime hai chiều (`src/lib/syncEngine.ts`)**: Kết nối tức thì giữa 2 tab hoặc tab ẩn danh.
- [x] **Hệ thống Âm thanh (`src/lib/sound.ts`)**: Tiếng đếm ngược hồi hộp, tiếng chuông trả lời đúng, buzz sai, và kèn vinh danh Fanfare.
- [x] **Hiệu ứng thị giác**: Pháo hoa giấy Confetti bung nở rực rỡ khi trao giải.
- [x] **Cơ sở dữ liệu đám mây Supabase Cloud:** Tạo bảng, chạy schema/seed, bảo mật server RPC.
- [x] **Mã nguồn độc lập trên GitHub:** Đã liên kết và đẩy lên `https://github.com/NhuHaa/quizzzlive-game`.
- [x] **Triển khai Web toàn cầu trên Vercel:** Đã hoạt động chính thức tại `https://quizzzlive-game-35dn.vercel.app`.
- [x] **Đại tu giao diện Quản Trị (`/host/dashboard`):**
  - Căn lề Logo và tên web thẳng tắp với nội dung.
  - Đồng bộ chiều cao `h-11 sm:h-12` và bo góc `rounded-2xl` cho các nút Header (`VI / EN`, `Host Quản Lý`, `Khóa`).
  - Chuyển toàn bộ các nút cam sang màu Xanh Lá Rừng Rậm / Emerald đồng bộ.
  - Rút ngắn độ dài nút Toolbar, canh trái icon, thụt lề êm ái.
  - Sửa triệt để lỗi chữ đè logo kính lúp trong thanh tìm kiếm bằng inline paddingLeft 56px.

### ⏳ BƯỚC TIẾP THEO (Tùy chọn Mở rộng sau khi Bạn Review)
- [ ] Tổ chức trận đấu thử nghiệm trực tiếp qua mạng 4G/Wifi với bạn bè.
- [ ] Nhập thêm các bộ đề thi trắc nghiệm mới từ file Excel/CSV.
- [ ] Bổ sung thêm kho linh vật / avatar hoạt hình nâng cao (nếu cần).

### ⚠️ ĐANG VƯỚNG (Blockers)
- *Không có vướng mắc nào.* Toàn bộ hệ thống web và cloud đang vận hành trơn tru!
