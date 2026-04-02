import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/phim/${movie.slug}`}
      className="group relative block rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-red-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay khi hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Badge loại phim */}
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded bg-red-500 text-white">
          {movie.type === 'phim-bo' ? 'Phim bộ' : 'Phim lẻ'}
        </span>

        {/* Rating */}
        <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded bg-black/70 text-yellow-400">
          <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {movie.rating}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration} phút</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="px-1.5 py-0.5 text-xs rounded bg-gray-700 text-gray-300">
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
