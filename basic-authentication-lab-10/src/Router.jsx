import { Routes, Route} from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'

import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'
import AlsoPublic from './AlsoPublic'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Nav />} >
        <Route index element={<Public />} />
        <Route path="alsopublic" element={<AlsoPublic />} />
        <Route path="protected" element={
          <Authenticator>
             <Protected />
          </Authenticator>
        } 
        />
        <Route path="profile" element={
          <Authenticator>
             <Profile />
          </Authenticator>
        } />
        <Route path="*" element={<Public />} />
      </Route>
    </Routes>
  )
}

export default Router;