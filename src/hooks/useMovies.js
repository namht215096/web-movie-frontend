import { useState, useEffect } from 'react'
import { getMovies } from '../api/movies'

export function useMovies({ type, page = 1, limit = 12 } = {}) {
  const [movies, setMovies]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Dùng AbortController để huỷ request cũ nếu deps thay đổi trước khi fetch xong
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    getMovies({ type, page, limit })
      .then(({ movies, totalPages }) => {
        if (!controller.signal.aborted) {
          setMovies(movies)
          setTotalPages(totalPages)
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    // Cleanup: huỷ request nếu component unmount hoặc deps thay đổi
    return () => controller.abort()
  }, [type, page, limit])

  return { movies, loading, error, totalPages }
}
