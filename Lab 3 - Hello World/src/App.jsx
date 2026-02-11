import './App.css'
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';


function App() {

  return (
    <>
      <Authenticator>
        {({ signOut, user}) => (
          <main>
            <h1>Hello, {user.username}, from AWS Amplify</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </>
  )
}

export default withAuthenticator(App);
