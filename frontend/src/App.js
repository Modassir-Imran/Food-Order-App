import './App.css'
import Home from './screen/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screen/Login.jsx'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screen/Signup.js'
import { CartProvider } from './components/ContextReducer.js'
import MyOrder from './screen/MyOrder.js'

function App () {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorder' element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
