import { useState } from 'react'
import MovieCard from './MovieCard'
import { useMovies } from '../hooks/useMovies'

export default function MovieGrid({ type, title = 'Danh sách phim' }) {
  const [page, setPage] = useState(1)
  const { movies, loading, error, totalPages } = useMovies({ type, page })

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-gray-800 animate-pulse">
              <div className="aspect-[2/3] bg-gray-700" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
          <p className="text-red-400 font-semibold">{error}</p>
          <p className="text-gray-500 text-sm mt-1">Hãy chắc chắn rằng json-server đang chạy: <code className="text-gray-400">npm run server</code></p>
          <button
            onClick={() => setPage(1)}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Grid phim */}
      {!loading && !error && (
        <>
          {movies.length === 0 ? (
            <p className="text-gray-400 text-center py-20">Không có phim nào.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                    p === page
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Sau →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
