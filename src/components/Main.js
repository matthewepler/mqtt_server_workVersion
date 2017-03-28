import React from 'react'
import { Button } from 'react-bootstrap'

// static files
import bill from '../../public/img/billMurray.jpg'

// styles
import '../styles/Main.css' // will load compiled css from ./App.scss

function Main (props) {
  return (
    <div>
      <img src={bill} alt='bill murray' />
      <div className='likes'>
        <Button bsStyle='primary' onClick={props.handleLikeClick}>Like</Button>
        {props.likes}
      </div>
    </div>
  )
}

Main.propTypes = {
  likes: React.PropTypes.number,
  handleLikeClick: React.PropTypes.func
}

Main.defaultProps = {
  likes: 0
}

export default Main
