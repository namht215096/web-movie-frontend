import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Thể loại', to: '/the-loai' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setIsOpen(false)
    }
  }

  return (
    <nav className="relative bg-gray-900 shadow-lg">
      <div className="container px-6 py-3 mx-auto md:flex md:items-center md:justify-between">

        {/* Logo + mobile toggle */}
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm6 3l5 3-5 3V9z"/>
            </svg>
            <span className="text-xl font-bold text-white tracking-wide">
              Movie<span className="text-red-500">Web</span>
            </span>
          </NavLink>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="toggle menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav links + search */}
        <div
          className={`${
            isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0'
          } absolute inset-x-0 z-20 w-full px-6 py-4 bg-gray-900 transition-all duration-300 ease-in-out md:static md:flex md:items-center md:justify-between md:p-0 md:w-auto`}
        >
          {/* Links */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-red-500 text-white font-semibold'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Search + Auth */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-3 mt-4 md:mt-0 md:ml-6">
            <form onSubmit={handleSearch} className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm phim..."
                className="w-full py-2 pl-9 pr-4 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 md:w-56"
              />
            </form>

            {/* Auth */}
            {user ? (
              <div className="relative mt-3 md:mt-0" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold ring-2 ring-red-400">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-white md:hidden">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/ho-so"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false) }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/dang-nhap"
                className="mt-3 md:mt-0 inline-block px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
