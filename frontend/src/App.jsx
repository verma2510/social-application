import './App.css'
import Cards from './components/cards/Cards'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </Router>
  )
}

export default App;
