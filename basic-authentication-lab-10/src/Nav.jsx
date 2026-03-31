import { useEffect, useState} from "react";
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, ProfileOutlined, FileProtectOutlined } from '@ant-design/icons'

const navLinks = [
  {
    key: 'public',
    label: (
      <Link to="/public">
        <HomeOutlined />
        Home
      </Link>
    )
  },
  {
    key: 'profile',
    label: (
      <Link to="/profile">
        <ProfileOutlined />
        Profile
      </Link>
    )
  },
  {
    key: 'protected',
    label: (
      <Link to="/protected">
        <FileProtectOutlined />
        Protected
      </Link>
    )
  }
]

const Nav = () => {
  const [selected, setSelected] = useState('public');
  const location = useLocation();
  useEffect(() => {
   const currentPage = location.pathname.split('/')[1];
   console.log('Navigation to', location);
   setSelected(currentPage ? currentPage : 'public');
  }, [location]);

  return (
    <div>
      <Menu items={navLinks} selectedKeys={[selected]} mode="horizontal" />
        <Outlet />
    </div>
  )
}

export default Nav