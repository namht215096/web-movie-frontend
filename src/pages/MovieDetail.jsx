import { useParams } from 'react-router-dom'

export default function MovieDetail() {
  const { slug } = useParams()

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white">Chi tiết phim</h1>
      <p className="mt-2 text-gray-400">Slug: <span className="text-red-400">{slug}</span></p>
    </main>
  )
}
