import React from 'react'
import { Header, Form, Segment, Button } from 'semantic-ui-react'
import UserPage from './UserPage'
import { connect } from 'react-redux'
import axios from 'axios'

class Profile extends React.Component {
  state = { title: '', body: '', editing: false, posting: false }

  handleSubmit = (e) => {
    e.preventDefault()
    const { title, body } = this.state
    const post = { title, body }
    axios.post(`/api/users/${this.props.id}/posts`, { post })
      .then( res => this.setState({title: '', body: '', posting: false}) )
      .catch( err => console.log(err) )
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  isPosting = () => {
    if(this.state.posting)
      return this.newPost()
    else
      return (
        <Button
          color='teal'
          onClick={() => this.setState({ ...this.state, posting: true }) }
        >
          New Post
        </Button>
      )
  }

  newPost() {
    const { title, body } = this.state
    return(
      <Segment compact>
        <Header as='h3'>New Post</Header>
        <Form>
          <Form.Input name='title' label='title' value={title} required onChange={this.handleChange} />
          <Form.TextArea name='body' value={body} required onChange={this.handleChange} />
          <Button primary onClick={this.handleSubmit} type='submit'>Post</Button>
        </Form>
      </Segment>
    )
  }

  render() {
    return(
      <Segment basic>
        {this.isPosting()}
        <Segment basic>
          <Header as='h1'>My Profile</Header>
          <Button color='orange'>Edit</Button>
          <UserPage id={this.props.id} />
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { id: state.user.id }
}

export default connect(mapStateToProps)(Profile)
