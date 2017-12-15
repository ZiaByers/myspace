import React from 'react'
import axios from 'axios'
import {
  Segment,
  Header
} from 'semantic-ui-react'

class UserPage extends React.Component {
  state = { user: { id: 0, name: '', nickname: '', email: '', image: '', posts: [] }}

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/users/${id}`)
      .then( res => {
        this.setState({ user: res.data })
      })
      .catch( err => console.log(err) )

    axios.get(`/api/users/${id}/posts`)
      .then( res => this.setState({ user: { ...this.state.user, posts: res.data } }) )
      .catch( err => console.log(err) )
  }

  hasName = () => {
    const { name, email } = this.state.user
    if(name)
      return email
  }

  hasNickname = () => {
    const { nickname } = this.state.user
    if(nickname)
      return `Nickname: ${nickname}`
  }

  render() {
    const { name, nickname, email, image } = this.state.user
    return(
      <Segment>
        <Header as='h1'>{name || email}</Header>
        <Header as='h3'>{this.hasNickname()}</Header>
        <Header as='h4'>
          {this.hasName()}
        </Header>
      </Segment>
    )
  }
}

export default UserPage
