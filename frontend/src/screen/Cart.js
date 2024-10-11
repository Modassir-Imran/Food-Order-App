import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
  import deleteIcon from '../assets/Images/delete.png'

export default function Cart () {
  let data = useCart()

 // console.log("cart data is ",  data)
  
  let dispatch = useDispatchCart()  

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckout = async () => {
    try {
      let userEmail = localStorage.getItem('userEmail')

      let response = await fetch('http://localhost:3003/api/auth/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      })  

      if (response.status === 200) {
        dispatch({ type: 'DROP' })
        alert('Order placed successfully!')
      } 
      
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  let totalPrice = data.reduce(
    (total, food) => total + parseFloat(food.price),
    0
  )
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn p-0'>
                    <img
                      src={deleteIcon}
                      width='20px'
                      className='opacity-50'
                      onClick={() => {
                        dispatch({ type: 'REMOVE', index: index })
                      }}
                      alt=''
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='fs-2'>Total Price: {totalPrice}/-</div>
        <div>
          <button className='btn bg-success mt-5 px-4 ' onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}
