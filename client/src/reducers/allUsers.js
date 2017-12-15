const allUsers = (state = [], action) => {
  switch(action.type) {
    case 'USERS':
      return action.users
    default:
      return state
  }
}
