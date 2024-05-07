import React from 'react'
import {Link,useNavigate} from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div>
      <img src="https://i.pinimg.com/originals/5d/12/d0/5d12d0e14bd2110a430aa44555a2bdcb.png" alt="logo" className='logo'  />
      { auth ?
      <ul className='nav_ul'>
        <li><Link to='/'>Product</Link></li>
        <li><Link to='/add-product'>Add Product</Link></li>
        <li><Link to='/update/:id'>Update Product</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/signup' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
      :
      <ul className='nav_ul nav_right'>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
      </ul>
      }
    </div>
  )
}

export default Nav
