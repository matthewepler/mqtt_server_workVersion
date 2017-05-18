import React from 'react'

function ToggleButton (props) {
  return (
    <div
      className={props.toggle ? 'toggle-button' : 'toggle-button toggle-button-off'}
      onClick={props.handleClick}
    >
      {props.title}
    </div>
  )
}

export default ToggleButton
