import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function MyOrder () {
  const [orderData, setOrderData] = useState('')
  //console.log( "order data afdsfdskf ",orderData)
  const fetchMyOrder = async () => {
    await fetch('https://food-order-app-backend-5v3t.onrender.com/api/auth/myOrderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    })
      .then(async res => {
        let response = await res.json()
        setOrderData(response.orderData.order_data)
      })
      .catch(err => {
        console.error('Error fetching order data:', err)
      })
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])
  //console.log("order data aarha hai  ",orderData)
  return (
    <div className='min-vh-100'>
      <div>
        <Navbar />  
      </div>
      <div className='container mb-5'>
        <div className=' '>
          {orderData && orderData.length > 0 ? (
            orderData.map((order, index) => {
              return (
                <div key={index}>
                  {order.map((items, idx) => {
                    return items.Order_date ? (
                      <div key={idx} className='m-auto mt-5'>
                        <h4>Order Date: {items.Order_date}</h4>
                        <hr />
                      </div>
                    ) : (
                     <div className=''>
                       <div key={idx} className=' d-flex '>
                        <div
                          className='card mt-3'
                          style={{
                            width: '16rem',
                            maxHeight: '360px'
                          }}
                        >
                          <img
                            src={items.img}
                            className='card-img-top'
                            alt={items.name}
                            style={{
                              height: '120px',
                              objectFit: 'fill'
                            }}
                          />
                          <div className='card-body'>
                            <h5 className='card-title'>{items.name}</h5>
                            <div className='container w-100 p-0'>
                              <span className='m-1'>Qty: {items.qty}</span>
                              <span className='m-1'>Size: {items.size}</span>
                              <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                ₹{items.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                     </div>
                    )
                  })}
                </div>
              )
            })
          ) : (
            <div className=' d-flex justify-content-center mt-5 container '>
              <Link
                className='btn bg-success roundedrem navbar-brand fs-3 '
                to='/'
              >
                Go Order
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  )
}
