import React from 'react'
import axios from 'axios'
import {
  Segment,
  Header,
  Image,
  List
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserPage extends React.Component {
  state = { user: { id: 0, name: '', nickname: '', email: '', image: ''}, posts: []}

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/users/${id}/posts`)
      .then( res => {
        this.setState({ ...this.state, posts: res.data })
      })
      .catch( err => console.log(err) )
  }

  getUser = () => {
    const { id } = this.props.match.params
    axios.get(`/api/users/${id}`)
      .then( res => {
        const { posts } = this.state
        this.setState({ user: res.data, posts: posts })
      })
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
    const { id, name, nickname, email, image } = this.state.user
    const { posts } = this.state
    if(posts && !name)
      this.getUser()
    return(
      <Segment>
        <Image size='small' src={image || `https://robohash.org/${name}` } />
        <Header as='h1'>{name || email}</Header>
        <Header as='h3'>{this.hasNickname()}</Header>
        <Header as='h4'>
          {this.hasName()}
        </Header>
        <Header as='h3'>Posts</Header>
        <List>
        {
          posts.map( (post, i) => {
            return (
              <List.Item>
                <Link to={`/user/${id}/post/${post.id}`}>{post.title}</Link>
              </List.Item>
            )
          })
        }
        </List>
      </Segment>
    )
  }
}

export default UserPage
