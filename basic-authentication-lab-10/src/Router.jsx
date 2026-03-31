import { Routes, Route} from 'react-router-dom'

import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Nav />} >
        <Route index element={<Public />} />
        <Route path="protected" element={<Protected />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Public />} />
      </Route>
    </Routes>
  )
}

export default Router;