import { fetchAuthSession } from 'aws-amplify/auth'

async function checkUser(updateUser) {
    
    try {

        const userData = await fetchAuthSession();

        if (!userData.tokens) {
            console.log('no user token found. userData: ', userData)
            updateUser({});
            return;
        }

    const { accessToken: { payload } } = userData.tokens;

    const username =
      payload['cognito:username'] ||
      payload.username ||
      payload.sub

    const isAuthorized =
      payload['cognito:groups'] &&
      payload['cognito:groups'].includes('Admin')

    updateUser({
      username,
      isLoggedIn: true,
      isAuthorized
  })
    } catch (error) {
    console.error('checkUser failed ', error)
    }
}

export default checkUser