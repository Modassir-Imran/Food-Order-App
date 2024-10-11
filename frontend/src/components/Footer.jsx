import React from 'react';
import { Link } from 'react-router-dom';
import twitter from '../assets/Images/twitter-dark.png'
import facebook from '../assets/Images/facebook.png'
import instagram from '../assets/Images/instagram.png'


const Footer = () => {
  return (
    <footer className="container">
      <div className="mt-4">
        <hr/>
      </div>

      <div className="d-flex justify-content-evenly px-4">
        <p>&copy; 2024 GoFood All rights reserved</p>
        <div className="w-max flex items-center gap-2 mx-auto">
          <span>gofoodorder123@gmail.com</span>
        </div>
        <tr className="d-flex flex-row gap-4 type-none">
          <th>
            <Link to="">
              <img
                src={facebook}
                width={"20px"}
                className="w-5"
                alt="Facebook"
              />
            </Link>
          </th>
          <th>
            <Link to="">
              <img
                src={instagram}
                width={"20px"}
                className="w-5"
                alt="Instagram"
              />
            </Link>
          </th>
          <th>
            <Link to="">
              <img
                src={twitter}
                width={"20px"}
                className="w-5 bg-white rounded"
                alt="Twitter Dark"
              />
            </Link>
          </th>
        </tr>
      </div>
    </footer>
  );
};

export default Footer;


// {/* <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
//         <div className='col-md-4 d-flex align-items-center'>
//           <Link
//             to='/'
//             className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
//           ></Link>
//           <span className='text-muted'>© 2024 GoFood, Inc</span>
//         </div>

//         <tr className='nav col-md-4 justify-content-end list-unstyled d-flex'></tr>
//       </footer> */}