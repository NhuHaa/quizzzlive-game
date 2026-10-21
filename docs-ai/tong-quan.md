# ⚡ Tổng Quan Dự Án: Kahoot-SelfHost

## 🎯 1. Mục tiêu & Bản chất
Nền tảng thi đấu trắc nghiệm tương tác thời gian thực kiểu Kahoot chạy trên kiến trúc Serverless, kết nối màn hình lớn quản trò (Host) và tay cầm di động (Player).

## 🛠️ 2. Công nghệ cốt lõi (Tech Stack)
- **Frontend / Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Backend & Realtime:** Supabase (PostgreSQL, Realtime Broadcast & Presence, RPC Server Actions chấm điểm bảo mật).
- **Âm thanh & Hiệu ứng:** Web Audio API (tổng hợp âm thanh trực tiếp trên client, zero-latency, không phụ thuộc file MP3) + Canvas Confetti.
- **Xử lý dữ liệu:** SheetJS (`xlsx`) đọc/xuất file mẫu đề thi Excel & CSV.

## 🗺️ 3. Luồng & Các tuyến đường chính (Routes)
- `/`: Trang chủ – nhập Game PIN 6 số để tham gia phòng chơi.
- `/host/dashboard`: Quản lý ngân hàng đề thi, tạo/sửa câu hỏi, import từ Excel.
- `/host/game/[pin]`: Màn hình chiếu chính (Sảnh chờ Lobby + QR Code, Câu hỏi, Đồ thị kết quả, Bảng xếp hạng Leaderboard, Bục vinh danh Podium 3 bậc).
- `/play/[pin]`: Giao diện người chơi trên điện thoại (Đặt Nickname, chọn Avatar, 3 loại câu hỏi: 4 màu trắc nghiệm, Đúng/Sai, Điền từ).

## 📐 4. Luật chơi & Thuật toán
- **Kahoot Latency Decay Formula:** Điểm tối đa 1000đ/câu, suy giảm dần theo thời gian phản hồi (tối thiểu 500đ nếu trả lời đúng). Thưởng chuỗi liên tiếp (Streak Bonus).
- **Bảo mật:** Không gửi đáp án đúng về máy người chơi; chấm điểm hoàn toàn phía server qua Supabase RPC.
