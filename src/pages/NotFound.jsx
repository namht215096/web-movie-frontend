import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-white">Trang không tồn tại</p>
      <p className="mt-2 text-gray-400">Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Về trang chủ
      </Link>
    </main>
  )
}
