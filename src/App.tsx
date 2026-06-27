import './App.css'
import Register from './pages/Register'
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="pt-[78px]">
      <Navbar/>
      <Register/>
      <Footer/>
    </div>
  )
}

export default App