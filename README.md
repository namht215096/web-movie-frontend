# MovieWeb

Ứng dụng xem phim (React + Vite + Tailwind). Dữ liệu phim demo dùng **json-server**.

## Cài đặt

```bash
npm install
```

## Chạy JSON Server (API phim giả lập)

Trong thư mục gốc dự án:

```bash
npm run server
```

- Server chạy tại **http://localhost:3001**
- File dữ liệu: **`db.json`** (cập nhật tự động khi sửa file, nhờ `--watch`)
- Ví dụ endpoint: **http://localhost:3001/movies**

Giữ terminal này mở trong lúc dev để trang danh sách phim gọi API được.

## Chạy frontend (Vite)

Terminal khác:

```bash
npm run dev
```

Mở **http://localhost:5173**

## Backend đăng nhập (JWT)

Nếu dùng đăng nhập / đăng ký, chạy thêm server trong thư mục `backend`:

Currently, two official plugins are available:

Mặc định: **http://localhost:4000**

## Tóm tắt khi dev đầy đủ

| Lệnh | Thư mục | Mục đích |
|------|---------|----------|
| `npm run dev` | gốc | Giao diện (Vite) |
| `npm run server` | gốc | API phim (json-server) |

---

Template gốc Vite: [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react).
