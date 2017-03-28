import React, { Component } from 'react'

// components
import Main from '../components/Main'

// styles
import '../styles/index.css'

class App extends Component {
  // lifecycle methods
  constructor (props) {
    super(props)
    this.state = {
      likes: 0
    }
  }

  // custom methods
  handleLikeClick () {
    console.log(this.state.likes)
    this.setState({ likes: this.state.likes + 1 })
  }

  render () {
    return (
      <div className='main-container'>
        <h1>Well hello there.</h1>
        <Main likes={this.state.likes} handleLikeClick={() => this.handleLikeClick()} />
      </div>
    )
  }
}

export default App
