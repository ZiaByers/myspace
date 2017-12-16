import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios'

class Post extends React.Component {
  state = { id: '', title: '', body: '', createdAt: '', updatedAt: '' }

  componentDidMount() {
    const { userId, id } = this.props.match.params
    axios.get(`/api/users/${userId}/posts/${id}`)
      .then( res => {
        const { id, title, body, created_at, updated_at } = res.data
        this.setState({ id, title, body, createdAt: created_at, updatedAt: updated_at })
      })
      .catch( err => console.log(err))
  }

  render() {
    const { title, body, createdAt, updatedAt } = this.state
    return(
      <Segment basic>
        <Header as='h2'>{title}</Header>
        <Segment>{body}</Segment>
        <Segment basic secondary compact floated='right'>
          <Segment basic>Created on: {createdAt}</Segment>
          <Segment basic>Last update: {updatedAt}</Segment>
        </Segment>
      </Segment>
    )
  }
}

export default Post
