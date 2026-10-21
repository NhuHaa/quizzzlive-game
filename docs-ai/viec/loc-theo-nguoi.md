# 📌 PHÂN CÔNG & TIẾN ĐỘ THEO TỪNG VAI TRÒ

## 👥 1. Vai trò trong dự án
- **Bạn (Product Owner & Developer):** Đưa ra yêu cầu, duyệt kế hoạch, quyết định công nghệ và nghiệm thu sản phẩm.
- **AI Antigravity (Mentor & Co-developer):** Đề xuất giải pháp, giải thích khái niệm, soạn code mẫu, hỗ trợ vận hành và sửa lỗi khi bạn cho phép.

---

## 🚦 2. Trạng thái công việc

### ✅ ĐÃ XONG (Completed 100% Cốt lõi)
- [x] **Giai đoạn 1: Setup Nền tảng** (Next.js 16, TypeScript, Tailwind v4, server dev cổng 3005).
- [x] **Tài liệu & Bộ nhớ dự án** (Đầy đủ thư mục `docs-ai/` và cập nhật `CLAUDE.md`).
- [x] **Font chữ thương hiệu** (Chuyển đổi hoàn hảo sang Google Roboto không chân chuẩn tiếng Việt).
- [x] **Trang chủ (`/`)**: Giao diện nhập Game PIN, nút điều hướng Host, Soạn câu hỏi và 4 khối màu biểu tượng.
- [x] **Màn hình Người chơi (`/play`)**: Nhập biệt danh, 10 linh vật Avatar, sảnh chờ, 4 nút bấm cảm ứng cực đại và phản hồi điểm số.
- [x] **Màn hình Host (`/host`)**: Sinh mã PIN lớn, mã QR quét điện thoại, đếm ngược thời gian, hiện đồ thị kết quả, bảng vàng Leaderboard và bục vinh danh Podium.
- [x] **Trình Soạn Câu Hỏi (`/quiz`)**: Cho phép thêm/sửa/xóa câu hỏi trắc nghiệm và lưu vào bộ nhớ trình duyệt.
- [x] **Bộ não Realtime hai chiều (`src/lib/syncEngine.ts`)**: Kết nối tức thì giữa 2 tab hoặc tab ẩn danh.
- [x] **Hệ thống Âm thanh (`src/lib/sound.ts`)**: Tiếng đếm ngược hồi hộp, tiếng chuông trả lời đúng, buzz sai, và kèn vinh danh Fanfare.
- [x] **Hiệu ứng thị giác**: Pháo hoa giấy Confetti bung nở rực rỡ khi trao giải.

### ⏳ BƯỚC TIẾP THEO (Tùy chọn Mở rộng sau khi Bạn Review)
- [ ] Tích hợp Supabase Cloud Database để lưu trữ câu hỏi vĩnh viễn trên đám mây.
- [ ] Đưa dự án lên Vercel miễn phí để chia sẻ link cho bạn bè cùng chơi qua mạng Internet.
- [ ] Bổ sung thêm kho linh vật / avatar hoạt hình nâng cao.

### ⚠️ ĐANG VƯỚNG (Blockers)
- *Không có vướng mắc nào.* Toàn bộ hệ thống 4 route đang hoạt động trơn tru với mã `200 OK`.
