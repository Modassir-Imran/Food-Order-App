import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Signup () {
  const nevigate = useNavigate()
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch('https://food-order-app-backend-5v3t.onrender.com/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    })
    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert('Enter valid credential')
    }
    if (json.success) {
      nevigate('/login')
    }
  }

  const onChangeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: '100vh',
        backgroundSize: 'cover'
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form
          className='col-md-10 col-lg-6 col-xl-6 m-auto mt-5 border bg-dark border-success rounded p-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={credentials.name}
              onChange={onChangeHandler}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={onChangeHandler}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={credentials.password}
              onChange={onChangeHandler}
              id='exampleInputPassword1'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputAddress' className='form-label'>
              Address
            </label>
            <input
              type='address'
              className='form-control'
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChangeHandler}
              id='exampleInputAddress'
            />
          </div>

          <button type='submit' className=' m-3 btn btn-success'>
            Submit
          </button>
          <Link to='/login' className='m-3 btn btn-danger'>
            Already a user
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
