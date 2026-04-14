import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons'
import { Hub } from 'aws-amplify/utils'
import checkUser from './checkUser'

const getNavLinks = (isAdmin) => {
    const navLinks = [
        {
            key: 'Home',
            label: (
                <Link to="/">
                    <HomeOutlined />
                    Home
                </Link>
            )
        },
        {
            key: 'profile',
            label: (
                <Link to="/profile">
                    <UserOutlined />
                    Profile
                </Link>
            )
        },
    ]
    if (isAdmin) {
        navLinks.push({
            key: 'pdmin',
            label: (
                <Link to="/admin">
                    <UserOutlined />
                    Admin
                </Link>
            )
        })
    }

    return navLinks;
}

const Nav = () => {
  const [selectedPage, setSelectedPage] = useState('Home');
  const location = useLocation();

  const [user, updateUser] = useState({})

  useEffect(() => {
    // see if the user is authorized and listen for login status changes
    checkUser(updateUser)
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data;
      console.log('event: ', event)
      if (event === 'signIn' || event === 'signOut') {
        checkUser(updateUser)
      }
    })
    

    // determine the current page
    const currentPage = location.pathname.split('/')[1]
    setSelectedPage(currentPage ? currentPage : 'Home')
  }, [location])

  return (
    <>
      <Menu items={getNavLinks(user.isAuthorized)} selectedKeys={[selectedPage]} mode="horizontal" />
      <Outlet />
    </>
  )
}

export default Nav