import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../screen/Cart'
import { useCart } from './ContextReducer'
import NavToggle from './NavToggle'

const Navbar = () => {
  const [cartView, setCartView] = useState(false)
  const nevigate = useNavigate()

  const data = useCart()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    nevigate('/')
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-success'>
        <div className='container-fluid'>
          <Link className='navbar-brand fs-1 fst-italic' to='/'>
            GoFood
          </Link>

          {/* ---------------------navbar toggler icon ------------------- */}

          {/* <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#NavToggle'
            aria-controls='NavToggle'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button> */}
          <NavToggle />

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto mb-2'>
              <li className='nav-item'>
                <Link
                  className='nav-link active fs-5'
                  aria-current='page'
                  to='/'
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className='nav-item'>
                  <Link
                    className='nav-link active fs-5'
                    aria-current='page'
                    to='/myOrder'
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ' '
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <div className='d-flex'>
                <Link className='btn mx-1 bg-white text-success ' to='/login'>
                  Login
                </Link>
                <Link
                  className='btn mx-1 bg-white text-success '
                  to='/createuser'
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className='btn mx-1 bg-white text-success'
                  onClick={() => {
                    setCartView(true)
                  }}
                >
                  My Cart{' '}
                  {data.length !== 0 ? (
                    <Badge pill bg='danger'>
                      {data.length}{' '}
                    </Badge>
                  ) : null}
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className='btn mx-1 bg-white text-danger'
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
