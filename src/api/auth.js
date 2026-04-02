const BASE_URL = 'http://localhost:3001'

// Đăng nhập: tìm user theo email, kiểm tra password ở client
export async function loginApi({ email, password }) {
  const res = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`)
  if (!res.ok) throw new Error('Lỗi kết nối máy chủ')

  const users = await res.json()
  if (!users.length) throw new Error('Email hoặc mật khẩu không đúng')

  const user = users[0]
  if (user.password !== password) throw new Error('Email hoặc mật khẩu không đúng')

  // Trả về user nhưng bỏ password
  const { password: _, ...safeUser } = user
  return safeUser
}

// Đăng ký: kiểm tra email tồn tại rồi tạo user mới
export async function registerApi({ name, email, password }) {
  // Kiểm tra email đã tồn tại chưa
  const checkRes = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`)
  if (!checkRes.ok) throw new Error('Lỗi kết nối máy chủ')

  const existing = await checkRes.json()
  if (existing.length) throw new Error('Email này đã được sử dụng')

  // Tạo user mới
  const newUser = {
    name,
    email,
    password,
    avatar: '',
    role: 'user',
    createdAt: new Date().toISOString(),
  }

  const createRes = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
  if (!createRes.ok) throw new Error('Không thể tạo tài khoản')

  const created = await createRes.json()
  const { password: _, ...safeUser } = created
  return safeUser
}
