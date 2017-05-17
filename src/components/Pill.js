import React from 'react'

import '../styles/Pill.css'

function Pill (props) {
  return (
    <div className='pill' id={props.id}>
      <div className='pill-left'>
        <div className='pill-label'>{props.label}</div>
      </div>
      <div className='pill-right'>
        <div className='pill-count'>{props.data}</div>
      </div>
    </div>
  )
}

export default Pill
