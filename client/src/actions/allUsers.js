import axios from 'axios'

export const getAllUsers = () => {
  return (dispatch) => {
    axios.get('/api/users')
      .then( res => {
        dispatch({ type: 'USERS', users: res.data})
      })
  }
}
