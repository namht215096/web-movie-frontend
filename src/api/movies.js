const BASE_URL = 'http://localhost:3001'

// json-server v1: phân trang dùng _page + _per_page, response trả { data, pages, items }

export async function getMovies({ type, page = 1, limit = 12 } = {}) {
  const params = new URLSearchParams()

  if (type) params.append('type', type)
  params.append('_page', page)
  params.append('_per_page', limit)

  const res = await fetch(`${BASE_URL}/movies?${params}`)
  if (!res.ok) throw new Error('Không thể tải danh sách phim')

  const json = await res.json()
  // v1 trả về { data: [...], pages, items }
  return {
    movies: json.data ?? [],
    total: json.items ?? 0,
    totalPages: json.pages ?? 1,
  }
}

// Lấy chi tiết 1 phim theo slug
export async function getMovieBySlug(slug) {
  const res = await fetch(`${BASE_URL}/movies?slug=${slug}`)
  if (!res.ok) throw new Error('Không thể tải thông tin phim')

  const data = await res.json()
  if (!data.length) throw new Error('Không tìm thấy phim')

  return data[0]
}

// Tìm kiếm phim theo tên (v1 dùng title= hoặc q= với _search endpoint tuỳ config)
export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/movies?title=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Không thể tìm kiếm phim')

  return res.json()
}

// Lấy phim nổi bật (rating cao nhất)
export async function getTopMovies(limit = 6) {
  const res = await fetch(`${BASE_URL}/movies?_sort=rating&_order=desc&_per_page=${limit}&_page=1`)
  if (!res.ok) throw new Error('Không thể tải phim nổi bật')

  const json = await res.json()
  return json.data ?? []
}
