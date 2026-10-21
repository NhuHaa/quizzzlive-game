# 📝 Ghi Chú Tiến Độ Dự Án QuizLive (Kahoot Self-Host)

*Cập nhật lần cuối: Buổi tối ngày 20/10/2026*

---

## 📌 Công Việc Hiện Tại
- **Mục tiêu:** Tùy biến nhận diện thương hiệu (Font Roboto, Logo vịt vàng suy nghĩ, phong cách Behance xanh rêu - cam đất nung - hạt grain) và chuẩn bị triển khai lên GitHub & Vercel để chơi qua Wifi/4G.
- **Trạng thái hiện tại:** Giao diện đã được người dùng review và duyệt 100%. Đang chuẩn bị chuyển sang cấu hình Supabase Cloud và Deploy Vercel.

---

## ✅ Việc Đã Hoàn Thành Hôm Nay (20/10/2026)

### 1. Tùy biến Font chữ & Khắc phục lỗi hiển thị
- [x] Chuyển đổi font toàn bộ hệ thống sang font không chân **`Roboto`** từ Google Fonts (weights `300, 400, 500, 700, 900`, hỗ trợ tiếng Việt đầy đủ) tại `src/app/layout.tsx`.
- [x] Sửa triệt để lỗi font fallback sang Times New Roman (loại bỏ cyclic reference biến `--font-sans` trong `src/app/globals.css`).

### 2. Thiết kế giao diện theo phong cách Poster Nghệ thuật Behance (Stratman Law Firm)
- [x] Đổi background trang chủ sang dải màu **Xanh rêu rừng rậm trầm sâu** (`#112017` $\rightarrow$ `#1A3324` $\rightarrow$ `#0D1811`).
- [x] Áp dụng màu **Trắng ngọc trai** cho tiêu đề chính và dải chuyển sắc hoàng hôn (`#FAF8F5` $\rightarrow$ `#EAD1C5` $\rightarrow$ `#C85D3B`).
- [x] Thiết kế nút CTA "Vào Chơi Ngay" bằng **màu cam đất nung (Burnt Earth / Terracotta `#B84E2E`)**, ít tươi, mộc mạc và sang trọng.
- [x] Tích hợp lớp phủ **hạt nhám Grain Texture (`.grain-texture`)** với chế độ `mix-blend-overlay` tạo cảm giác bề mặt giấy in mỹ thuật cao cấp.

### 3. Thiết kế linh vật Logo & Hoàn thiện cụm điều khiển
- [x] Tạo component vector SVG độc quyền **[ThinkingDuckLogo.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/src/components/common/ThinkingDuckLogo.tsx)**: Chú vịt vàng chống cằm suy nghĩ 🤔, mắt liếc lên, dấu chấm hỏi ý tưởng phát sáng nhấp nháy, có hiệu ứng nhún nhảy khi hover.
- [x] Thay thế đồng bộ chữ `K!` cũ ở Header, màn hình Host và màn hình Player bằng chú vịt vàng suy nghĩ.
- [x] Thu gọn thanh Header về giữa (`max-w-5xl mx-auto`), tạo lề an toàn `px-6 sm:px-10`, khắc phục lỗi logo và chữ EN bị tràn ra sát mép màn hình.
- [x] Mở rộng nút chọn ngôn ngữ `VI / EN` to rõ, thoáng đãng, không bị co cụm bó hẹp.
- [x] Xử lý triệt để thanh trượt âm lượng: Thiết kế con trượt tròn to màu cam đất viền trắng kem, ray trượt xanh rêu rõ nét, kéo di chuyển 0% - 100% êm ái.

### 4. Xử lý lỗi hệ thống & Chuẩn hóa tài liệu
- [x] Khắc phục triệt để lỗi Hydration warning (`bis_skin_checked="1"`) do extension Bitdefender chèn vào bằng `suppressHydrationWarning` và `MutationObserver` trong `next/script`.
- [x] Soạn thảo bản kế hoạch chi tiết toàn diện 5 giai đoạn: lưu tại [docs-ai/ke-hoach-chi-tiet.md](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/docs-ai/ke-hoach-chi-tiet.md).

---

## ⏳ Việc Sẽ Làm Tiếp Vào Ngày Mai (Theo Kế Hoạch 5 Bước)

1. **[Bước 1] Thao tác trên tab Supabase (`New Project`):**
   - Đặt tên dự án `quizlive-game`, tạo mật khẩu cơ sở dữ liệu.
   - Chọn Region: **`Southeast Asia (Singapore)`** (độ trễ thấp nhất cho mạng VN).
   - Nhấn **Create new project**.
2. **[Bước 2] Chạy tập lệnh cơ sở dữ liệu trên Supabase:**
   - Vào **SQL Editor** trên Supabase.
   - Sao chép toàn bộ nội dung [supabase/schema.sql](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/supabase/schema.sql) $\rightarrow$ Dán và bấm **Run**.
   - Sao chép [supabase/seed.sql](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/supabase/seed.sql) $\rightarrow$ Dán và bấm **Run** để nạp câu hỏi mẫu.
3. **[Bước 3] Lấy 3 chìa khóa API từ Supabase (Project Settings > API):**
   - `Project URL`
   - `anon public key`
   - `service_role secret key`
4. **[Bước 4] Đẩy mã nguồn lên GitHub:**
   - Chạy lệnh git commit và đẩy toàn bộ các thay đổi giao diện mới lên GitHub cá nhân.
5. **[Bước 5] Triển khai (Deploy) lên Vercel:**
   - Import repository từ GitHub vào Vercel.
   - Dán 3 biến môi trường Supabase vào mục **Environment Variables**.
   - Bấm **Deploy** để nhận link chính thức dạng `https://ten-du-an.vercel.app`.
6. **[Bước 6] Chạy thử trận đấu trực tiếp:**
   - Mở màn hình Host trên máy tính/TV $\rightarrow$ Chiếu mã PIN & QR Code.
   - Dùng điện thoại bật 4G hoặc Wifi quét mã QR tham gia và trả lời trắc nghiệm thời gian thực!
