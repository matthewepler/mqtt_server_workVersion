import React from 'react'

import '../styles/Pill.css'

function Pill (props) {
  return (
    <div id={`${props.id}-${props.eventType}-pill`} className='pill'>
      <div id={`${props.id}-${props.eventType}-pill-left`} className='pill-left'>
        <div className='pill-label'>{props.label}</div>
      </div>
      <div className='pill-right'>
        <div id={`${props.id}-${props.eventType}-pill-count`} className='pill-count'>{props.data}</div>
      </div>
    </div>
  )
}

export default Pill
