import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card (props) {
  let data = useCart()

  let dispatch = useDispatchCart()
  let options = props.options
  let priceOptions = Object.keys(options)

  const refPrice = useRef()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')

  useEffect(() => {
    if (refPrice.current) {
      setSize(refPrice.current.value)
    }
  }, [])

  const handleAddToCart = async () => {
    let foodItemInCart = data.find(
      item => item.id === props.foodItem._id && item.size === size
    )

    if (foodItemInCart) {
      await dispatch({
        type: 'UPDATE',
        id: props.foodItem._id,
        img:props.foodItem.img,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      })
    } else {
      await dispatch({
        type: 'ADD',
        id: props.foodItem._id,
        img:props.foodItem.img,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      })
    }
  }

  let finalPrice = qty * parseInt(options[size], 10)
  return (
    <div>
      <div className='card mt-3' style={{ width: '16rem', maxHeight: '360px' }}>
        <img
          src={props.foodItem.img}
          className='card-img-top'
          style={{ height: '150px', objectFit: 'cover' }}
          alt='...'
        />
        <div className='card-body'>
          <h5 className='card-title'>{props.foodItem.name}</h5>
          <div className='container w-100 col'>
            <select
              className='m-2 h-100 bg-success rounded'
              onChange={e => setQty(parseInt(e.target.value, 10))}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
              })}
            </select>
            <select
              className='m-2 h-100 bg-success rounded'
              ref={refPrice}
              onChange={e => setSize(e.target.value)}
            >
              {priceOptions.map(data => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                )
              })}
            </select>
            <div className='d-inline h-100 fs-8'>₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className='btn btn-success justify-center ms-2'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
