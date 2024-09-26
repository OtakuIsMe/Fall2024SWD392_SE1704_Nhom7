import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div id='header'>
        <p className='logo'>WorkChill</p>
        <ul className='list'>
            <li><div>Trang chủ</div></li>
            <li><div>Địa điểm</div></li>
            <li><div>Phòng</div></li>
            <li><div>Về Chúng Tôi</div></li>
            <li><div>Gói Thành Viên</div></li>
        </ul>
        <div className="account">
          <button className='login'>Log in</button>
          <button className='register'>Register</button>
        </div>
    </div>
  )
}

export default Header