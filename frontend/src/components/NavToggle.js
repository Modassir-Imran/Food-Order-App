import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import menu from '../assets/Images/menu_icon.png'
import '../index.css' // Assuming you place the CSS in an external file
import { Badge } from 'react-bootstrap'
import { useCart } from './ContextReducer'
import Cart from '../screen/Cart'
import Modal from '../Modal'

const NavToggle = () => {

  const [visible, setVisible] = useState(false)
  const [cartView, setCartView] = useState(false)

  const data = useCart()
  

  return (
    <div className='dropdown-container d-md-block d-lg-none' style={{ position: 'relative' }}>
      {/* Dropdown Button */}
      <div className='dropdown '>
      <div
                  className='btn mx-4 bg-white text-success'
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
                
        <button
          className='btn btn-secondary bg-white dropdown-toggle-btn'
          type='button'
          id='dropdownMenuButton'
          data-bs-toggle='dropdown'
          aria-expanded={visible}
          aria-controls='NavToggle'
          onClick={() => setVisible(!visible)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: 'none',
          }}
        >
          <img src={menu} alt='Menu Icon'  width={'25px'} />
        </button>

        {/* Dropdown Menu */}
        <ul
          className={`dropdown-menu ${visible ? 'show' : ''}`}
          aria-labelledby='dropdownMenuButton'
          style={{
            position: 'absolute',
            top: '120%',
            borderRadius: '20px',
            right: '0',
            width: '300px',
            zIndex: '1000',
            backgroundColor: '#343131',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
          }}
        >
          <li>
            <Link
              className='dropdown-item'
              to='/'
              style={{
                fontSize: '1.5rem',
                padding: '1rem  2rem',
                paddingTop: '1.5rem',
              }}
            >
              HOME
            </Link>
            <hr />
            <li>
              <Link
                className='dropdown-item'
                to='/myorder'
                style={{
                  fontSize: '1.5rem',
                  padding: '1rem  2rem',
                  paddingTop: '1.5rem',
                }}
              >
                MY ORDER
              </Link>
              <hr />
            </li>
          </li>
          <li>
            <Link
              className='dropdown-item'
              to='/login'
              style={{
                fontSize: '1.5rem',
                padding: '1rem 2rem',
              }}
            >
              LOGIN
            </Link>
            <hr />
          </li>
          <li>
            <Link
              className='dropdown-item text-danger'
              to='/createuser'
              style={{
                fontSize: '1.5rem',
                padding: '1rem 2rem',
                paddingBottom: '1.5rem',
              }}
            >
              LOGOUT
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavToggle
