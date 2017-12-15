import React from 'react'
import { Card, Image, Button, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setHeaders } from '../actions/headers'

class User extends React.Component {
  state = { user: { id: 0, email: '', name: '', nickname: '', friends: [] }, friended: false }

  componentDidMount() {
    const { id } = this.props
    axios.get(`/api/users/${id}`)
      .then( res => {
        this.setState({ user: res.data })
        if( this.props.userFriends.includes(res.data.id) )
          this.setState({ friended: true })
      })
      .catch( err => console.log(err) )
  }

  handleFriendAdd = () => {
    const { id, dispatch } = this.props
    axios.put(`/api/friends/${id}`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        this.setState({ friended: true })
      })
      .catch( err => console.log(err))
  }

  handleUnfriend = () => {
    const { id, dispatch } = this.props
    axios.delete(`/api/friends/${id}`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        this.setState({ friended: false })
      })
      .catch( err => console.log(err))
  }

  isFriend = () => {
    const { id } = this.state.user
    const { friended } = this.state
    if(friended)
      return (
        [
          <Segment inverted compact color='green'>Friended</Segment>,
          <Button negative onClick={this.handleUnfriend}>Unfriend</Button>
        ]
      )
    return <Button positive onClick={this.handleFriendAdd}>Add Friend</Button>
  }

  loggedInUser = () => {
    const { isAuthenticated } = this.props
    if(isAuthenticated)
      return(
        <Card.Content extra>
          { this.isFriend() }
        </Card.Content>
      )
  }

  render() {
    const { isAuthenticated } = this.props
    const { email, name, nickname, friends } = this.state.user
    return(
      <Card>
        <Card.Content>
          <Image floated='left' size='tiny' src={`https://robohash.org/${name}`} />
          <Card.Header>
            {name || email}
          </Card.Header>
          <Card.Meta>
            Friends: { friends.length }
          </Card.Meta>
        </Card.Content>
        {this.loggedInUser()}
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.id, userFriends: state.user.friends }
}

export default connect(mapStateToProps)(User)
