const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  console.log('evaluating new user', event.request.userAttributes)

  let isAdmin = false;
  const adminEmails = ['kimberg@madisoncollege.edu'];

  // if the user is one of the admins, set the isAdmin variable to true
  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true;
  }


  if (isAdmin) {
    console.log(' user should be an admin, adding to group...')
    const groupParams = {
      GroupName: 'Admin',
      UserPoolId: event.userPoolId,
    };
    const addUserParams = {
      GroupName: 'Admin',
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };
    /**
     * Check if the group exists; if it doesn't, create it.
     */
    try {
      await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
    } catch (e) {
      await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
    }
    /**
     * Then, add the user to the group.
     */
    try {
      await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));
    } catch(error) {
      console.error('Error adding user to admin group', error)
    }

  } else {
    console.log('user is not an admin, continuing')
  }
  
  return event;
};