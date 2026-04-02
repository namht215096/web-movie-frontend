import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/phim-le"    element={<Movies />} />
        <Route path="/phim/:slug" element={<MovieDetail />} />
        <Route path="/dang-nhap"  element={<Login />} />
        <Route path="/dang-ky"    element={<Register />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
