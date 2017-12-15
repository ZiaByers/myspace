import React, { Component } from 'react';
import { Header, Segment, List, Card } from 'semantic-ui-react';
import axios from 'axios'
import { setHeaders } from '../actions/headers'
import User from './User'
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/allUsers'

class Home extends Component {
  state = { users: [] }

  componentDidMount() {
    this.props.dispatch(getAllUsers())
  }

  render() {
    const users = [1,2,3]

    return (
      <Segment basic>
        <Header as='h1'>MySpace Members</Header>
        <Card.Group>
          {
            users.map( user => {
              if(this.props.isAuthenticated !== user.id)
                return <User id={user.id} />
            })
          }
        </Card.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.id, users: state.allUsers }
}

export default connect(mapStateToProps)(Home);
