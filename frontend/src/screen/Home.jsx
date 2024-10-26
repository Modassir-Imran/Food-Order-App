import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {
  const [search, setSearch] = useState('')

  const [foodCats, setFoodCats] = useState([])
  const [foodItems, setFoodItems] = useState([])

  const loadData = async () => {
    let response = await fetch('https://food-order-app-backend-5v3t.onrender.com/api/auth/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //console.log(response)
    response = await response.json()
    setFoodItems(response[0])
    setFoodCats(response[1])
    //console.log(response[0], response[1])
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div
        id='carouselExampleFade'
        className='carousel slide carousel-fade'
        data-bs-ride='carousel'
        style={{ objectFit: 'fill !important' }}
      >
        <div className='carousel-inner' id='carousel'>
          <div className='carousel-caption' style={{ zIndex: '10' }}>
            <div className='d-flex justify-content-center'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className='carousel-item active' data-bs-interval='2000'>
            {' '}
            {/* 5-second interval */}
            <img
              src='https://media.istockphoto.com/id/1186759790/photo/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-tikka-is-an-indian.jpg?s=612x612&w=0&k=20&c=cITToqM1KEnrixXjoLhEciqP24SxdKtW3QXykq-W5OE='
              style={{ filter: 'brightness(60%)', objectFit: 'fill' }}
              className='d-block w-100 h-300'
              alt='...'
            />
          </div>
          <div className='carousel-item' data-bs-interval='2000'>
            {' '}
            {/* 5-second interval */}
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg'
              className='d-block w-100'
              style={{ filter: 'brightness(60%)', objectFit: 'fill' }}
              alt='...'
            />
          </div>
          <div className='carousel-item' data-bs-interval='2000'>
            {' '}
            {/* 5-second interval */}
            <img
              src='https://media.istockphoto.com/id/1477086663/photo/hot-madras-paneer-and-vegetable-masala-with-rice.jpg?s=612x612&w=0&k=20&c=AumwKNhzUu4GU7ox2lqa0wqMW7g7y2fn7QRDf3jACA4='
              className='d-block w-100'
              style={{ filter: 'brightness(60%)', objectFit: 'fill' }}
              alt='...'
            />
          </div>
          <div className='carousel-item' data-bs-interval='2000'>
            {' '}
            {/* 5-second interval */}
            <img
              src='https://media.istockphoto.com/id/1325081007/photo/paneer-tikka.jpg?s=612x612&w=0&k=20&c=jji6LMqzO_guDye3GZDZEKBYU4f7ASlXD9oYkgoRWG8='
              className='d-block w-100'
              style={{ filter: 'brightness(60%)', objectFit: 'fill' }}
              alt='...'
            />
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carouselExampleFade'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carouselExampleFade'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>

      {/* ----------------------Items------------------------------- */}
      <div className='container'>
        {foodCats.length > 0 ? (
          foodCats.map(data => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItems.length > 0 ? (
                foodItems
                  .filter(
                    item =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(filterItems => (
                    <div
                      key={filterItems._id}
                      className='col-12 col-md-6 col-lg-3'
                    >
                      <Card
                        foodItem={filterItems} // Pass the filtered item here
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No data found</div>
              )}
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
