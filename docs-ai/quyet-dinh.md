# 🧭 NHẬT KÝ QUYẾT ĐỊNH DỰ ÁN (DECISION LOG)

Tài liệu này ghi lại các lựa chọn kiến trúc quan trọng đã thống nhất cùng lý do lựa chọn:

### 1. Tách riêng thư mục `new-kahoot-project/` / `quizzz-live-project/`
* **Quyết định:** Tổ chức thư mục dự án độc lập, rõ ràng cấu trúc.
* **Lý do:** Giúp người học bắt đầu từ con số 0 tuyệt đối, nắm vững từng dòng code và không bị phân tâm bởi các file có sẵn.

### 2. Chọn Next.js 16 + React 19 + Supabase Realtime
* **Quyết định:** Sử dụng giải pháp Serverless Fullstack với Supabase thay vì tự dựng Server WebSocket (Node.js + Socket.io).
* **Lý do:**
  - Tiết kiệm thời gian cấu hình hạ tầng mạng phức tạp.
  - Supabase cung cấp cơ sở dữ liệu Postgres lưu trữ bộ câu hỏi lâu dài và kênh Realtime ổn định.
  - Dễ dàng xuất bản (deploy) lên Vercel miễn phí mà không cần thuê VPS riêng.

### 3. Thiết kế giao diện với Tailwind CSS v4 & Hệ biến màu Kahoot
* **Quyết định:** Sử dụng 4 màu nhận diện chuẩn: Đỏ (`#e21b3c` - ▲), Lam (`#1368ce` - ◆), Vàng (`#d89e00` - ●), Lục (`#26890c` - ■) kết hợp hiệu ứng `box-shadow` nảy 3D.
* **Lý do:** Tạo cảm xúc chơi game quen thuộc, sinh động và bắt mắt ngay từ cái nhìn đầu tiên.

### 4. Thiết lập cổng chạy mặc định `3005`
* **Quyết định:** Gán script `"dev": "next dev -p 3005"`.
* **Lý do:** Tránh xung đột cổng với cổng `3000` mặc định thường được các ứng dụng khác chiếm giữ.

### 5. Nguyên tắc cộng tác cùng AI
* **Quyết định:** Tuân thủ quy trình 5 bước: *Hướng dẫn ➜ Đề xuất ➜ Trình bày xem trước ➜ Hỏi ý kiến ➜ Bạn duyệt mới ghi file hoặc chạy lệnh.*
* **Lý do:** Đảm bảo người học kiểm soát 100% dự án của mình, hiểu tường tận bản chất từng bước thực hiện.

### 6. Sử dụng font chữ không chân Roboto (Sans-Serif)
* **Quyết định:** Tích hợp bộ font Google **Roboto** (`weight: 400, 500, 700, 900`, subset `vietnamese`) qua module `next/font/google`.
* **Lý do:** Font không chân mang phong cách hiện đại, thanh thoát, hiển thị sắc nét trên cả màn hình di động và máy chiếu từ xa, hỗ trợ tiếng Việt đầy đủ không bị lỗi hiển thị.

### 7. Hệ thống âm thanh tổng hợp qua Web Audio API (`src/lib/sound.ts`)
* **Quyết định:** Tự sinh âm thanh trực tiếp bằng bộ tạo dao động tần số (Oscillator) của trình duyệt.
* **Lý do:** Không cần tải các tệp MP3 nặng nề, không sợ lỗi mạng 404, không dính bản quyền, phát tức thì không trễ (zero-latency).

### 8. Cơ chế đồng bộ Realtime hai chiều (`src/lib/syncEngine.ts`)
* **Quyết định:** Kết hợp Web `BroadcastChannel` và `StorageEvent` để đồng bộ thời gian thực giữa các tab/cửa sổ trình duyệt.
* **Lý do:** Cho phép người dùng thử nghiệm chơi 2 người (1 tab Host chiếu TV, 1 tab Player điện thoại) ngay lập tức trên máy tính cá nhân mà không bị phụ thuộc vào cấu hình API Key bên ngoài.

### 9. Hiển thị đầy đủ Câu hỏi & Nội dung 4 Đáp án trên màn hình Người chơi (`/play`)
* **Quyết định:** Thêm khung câu hỏi + đồng hồ đếm ngược trên đầu màn hình và hiển thị toàn bộ nội dung chữ của 4 đáp án (thay vì chỉ hiện 4 khối màu).
* **Lý do:** Giúp người chơi có thể tự đọc đề và suy ngẫm trực tiếp trên thiết bị của mình mà không cần phải nhìn lên màn hình Host.
