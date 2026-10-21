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

### 10. Tách mã nguồn độc lập & Liên kết GitHub cá nhân chính chủ
* **Quyết định:** Tách toàn bộ dự án vào thư mục `quizzz-live-project` và đẩy lên kho GitHub cá nhân chính chủ **`NhuHaa/quizzzlive-game`**.
* **Lý do:** Đảm bảo quyền kiểm soát mã nguồn 100%, độc lập hoàn toàn với các kho tham khảo cũ.

### 11. Triển khai toàn cầu qua Vercel + Supabase Cloud
* **Quyết định:** Kết nối CI/CD tự động giữa GitHub và Vercel, sử dụng chuẩn chìa khóa API mới của Supabase (`sb_publishable_...` và `sb_secret_...`).
* **Lý do:** Cho phép người chơi thi đấu qua mạng 4G/Wifi từ khắp mọi nơi với tốc độ tải trang cực nhanh và độ trễ thấp.

### 12. Đại tu màu sắc giao diện Quản Trị (`/host/dashboard`) sang Xanh Lá đồng bộ
* **Quyết định:** Chuyển toàn bộ các nút bấm trước đó màu cam đất (`+ Tạo Bộ Đề Mới`, `Tất Cả 0`, `Phát Trực Tiếp`, nút Mở khóa...) sang màu **Xanh Lá Rừng Rậm / Emerald Rêu** (`#1D4A30` viền `#3E855A` chữ `#E8F5EE`).
* **Lý do:** Tạo cảm giác thanh thoát, hài hòa và sang trọng theo đúng nhận diện thương hiệu mà người dùng mong muốn, không còn cảm giác lệch tông hay chói mắt.

### 13. Quy chuẩn kích thước nút & Sửa lỗi hiển thị thanh tìm kiếm
* **Quyết định:**
  - Đồng bộ khung Header `Navbar` và phần nội dung chính về chung `max-w-7xl mx-auto px-4 sm:px-8` để Logo thẳng lề trái và các nút điều khiển thẳng lề phải.
  - Chuẩn hóa chiều cao nhỏ gọn `h-10 sm:h-10.5` (40px - 42px) và bo góc `rounded-xl sm:rounded-2xl` cho cả 3 nút Header: `VI / EN`, `Host Quản Lý`, `Khóa`, cùng nút `AudioControl`.
  - Tách triệt để `button` ra khỏi thuộc tính `width: 100%` trong `globals.css` để các nút không bị dãn dài tràn mép màn hình ở mức phóng to 100%.
  - Rút ngắn độ dài nút Toolbar, canh trái icon, thu gọn kích thước đều nhau bằng nút Host Quản Lý và neo sát lề phải `ml-auto`.
  - Áp dụng `style={{ paddingLeft: '56px' }}` cho ô input tìm kiếm để cố định khoảng cách an toàn, chống triệt để lỗi chữ đè lên kính lúp.
* **Lý do:** Khắc phục triệt để hiện tượng vỡ nút, dãn nút tràn thanh điều hướng hoặc bị ẩn nút Khóa khi xem ở tỷ lệ 100%, đem lại bố cục cân xứng, tinh tế và chuyên nghiệp.

### 14. Mascot Vịt Vàng Giơ Ngón Tay (Thumbs-Up 👍) Cho Màn Hình Đã Nộp Bài
* **Quyết định:** Tạo mới component [ThumbsUpDuck.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/common/ThumbsUpDuck.tsx) thay thế icon dấu tick xanh (`CheckCircle2`) ở màn hình người chơi [PlayerAnsweredView.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/player/PlayerAnsweredView.tsx).
* **Lý do:** Tránh hiểu lầm nghiêm trọng khi người chơi vừa bấm chọn đáp án thì thấy icon check xanh lá tưởng là mình đã trả lời đúng. Chú vịt vàng nháy mắt cười tươi giơ ngón tay cái 👍 biểu thị trạng thái nộp bài thành công và đang chờ các bạn cùng chơi hoàn thành.

### 15. Đại Tu Toàn Bộ Giao Diện Còn Màu Tím Sang Màu Xanh Rêu Rừng Rậm Chủ Đạo
* **Quyết định:**
  - **Phòng chờ (Lobby):** Cả Host ([LobbyView.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/host/LobbyView.tsx)) và Player ([PlayerLobby.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/player/PlayerLobby.tsx)) chuyển toàn bộ thẻ PIN, card danh sách người chơi, quầng sáng nền, nút xáo trộn câu hỏi/đáp án từ tím sang xanh rêu (`#112017`, `#152a1e`, `#2b543b`) kết hợp điểm nhấn cam đất nung `#B84E2E`.
  - **Khởi động trò chơi:** Màn hình đếm ngược "Sẵn Sàng!" (`get_ready`) phía người chơi chuyển từ tím sang xanh emerald rực rỡ.
  - **Giao diện Người chơi (`/play/[pin]`):** Khung nhập nickname, modal thư viện linh vật ([AvatarPickerModal.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/player/AvatarPickerModal.tsx)), khung câu hỏi và nút gửi ([QuestionInput.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/player/QuestionInput.tsx)) chuyển 100% sang tông xanh lá đồng bộ.
  - **Vinh danh Podium & Bảng điểm:** [HostPodiumView.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/host/HostPodiumView.tsx) và [HostLeaderboardView.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/host/HostLeaderboardView.tsx) chuyển nền và nút "Chơi Lại" từ tím sang xanh lá đồng bộ.
  - **Mặc định Theme Host:** Cập nhật `bgPreset` mặc định trong [ThemeCustomizerModal.tsx](file:///Users/linhduong/.gemini/antigravity-ide/scratch/kahoot-rep/quizzz-live-project/src/components/host/ThemeCustomizerModal.tsx) thành `forest-moss` (Xanh Rêu Rừng Rậm).
* **Lý do:** Đáp ứng chuẩn xác phản hồi của người dùng, loại bỏ triệt để màu tím còn sót lại từ giao diện nguyên bản cũ, hoàn thiện 100% nhận diện thương hiệu Poster Nghệ Thuật Behance đồng nhất trên mọi màn hình.

