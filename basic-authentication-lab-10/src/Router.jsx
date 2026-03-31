import { Routes, Route} from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'

import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

const Router = () => {
  return (
    <Authenticator>
    <Routes>
      <Route path="/" element={<Nav />} >
        <Route index element={<Public />} />
        <Route path="protected" element={<Protected />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Public />} />
      </Route>
    </Routes>
    </Authenticator>
  )
}

export default Router;