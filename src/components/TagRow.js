import React from 'react'
import classnames from 'classnames'

// components
import Pill from '../components/Pill'

// styles
import '../styles/TagRow.css'

function TagRow (props) {
  let solo = true
  for (let key in props.toggles) {
    if (props.toggles[key]) {
      solo = false
      break
    }
  }

  const expandMaxWidth = classnames({
    'tag-section': true,
    'info': true,
    'expand-max-width': solo
  })

  const infoStyle = classnames({
    'single-row': solo
  })

  return (
    <div id={`${props.id}-tag-row`} className={'tag-row'}>
      {/* Info */}
      <div className={expandMaxWidth}>
        <h4>Info</h4>
        <div className={infoStyle}>
          <div id={`${props.id}-tagId`} className='tagId'>{props.id}</div>
          <div id={`${props.id}-name`} className='name'>{props.name}</div>
          <div id={`${props.id}-site`} className='site'>{props.site}</div>
        </div>
      </div>

      {/* Last Heard */}
      <div className='last-heard tag-section'>
        <h4>Last Heard</h4>
        <div id={`${props.id}-last-heard-data`} className='last-heard-data'> - </div>
      </div>

      {/* Events */}
      { props.toggles.events &&
        <div className='events-wrapper tag-section'>
          <h4>Events</h4>
          <div className='events'>
            <Pill id={props.id} eventType={'fall'} label={'Fall'} data={'0'} />
            <Pill id={props.id} eventType={'struck-by'} label={'Struck By'} data={'0'} />
            <Pill id={props.id} eventType={'button-press-safety'} label={'(!) Safety'} data={'0'} />
            <Pill id={props.id} eventType={'button-press-emergency'} label={'(!) Emer.'} data={'0'} />
            <Pill id={props.id} eventType={'noise'} label={'Noise'} data={'0'} />
            <Pill id={props.id} eventType={'vibration'} label={'Vibration'} data={'0'} />
            <Pill id={props.id} eventType={'motion'} label={'Motion'} data={'0'} />
            <Pill id={props.id} eventType={'heat'} label={'Heat'} data={'0'} />
            <Pill id={props.id} eventType={'cold'} label={'Cold'} data={'0'} />
            <Pill id={props.id} eventType={'gait'} label={'Gait'} data={'0'} />
          </div>
        </div>
      }

      {/* Motions */}
      { props.toggles.motions &&
        <div className='motions-wrapper tag-section'>
          <h4>Motions</h4>
          <div className='motions'>
            <Pill id={props.id} eventType={'bad_bend'} label={'Bad Bends'} data={'0'} />
            <Pill id={props.id} eventType={'step'} label={'Steps'} data={'0'} />
            <Pill id={props.id} eventType={'trip'} label={'Trips'} data={'0'} />
            <Pill id={props.id} eventType={'slip'} label={'Slips'} data={'0'} />
            <Pill id={props.id} eventType={'squat'} label={'Squats'} data={'0'} />
            <Pill id={props.id} eventType={'twist'} label={'Twists'} data={'0'} />
            <Pill id={props.id} eventType={'reach'} label={'Reaches'} data={'0'} />
            <Pill id={props.id} eventType={'jump'} label={'Jumps'} data={'0'} />
          </div>
        </div>
      }

      {/* EnvHi */}
      { props.toggles.envhi &&
        <div className='envHi tag-section'>
          <h4>EnvHi</h4>
          <div className='data-row'>
            <div className='data-row-label'>Mic.</div>
            <div id={`${props.id}-mic`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Humid.</div>
            <div id={`${props.id}-humid`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Baro.</div>
            <div id={`${props.id}-baro`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>UV</div>
            <div id={`${props.id}-uv`} className='data-row-data'>N/A</div>
          </div>
        </div>
      }

      {/* EnvLo */}
      { props.toggles.envlo &&
        <div className='envLo tag-section'>
          <h4>EnvLo</h4>
          <div className='data-row'>
            <div className='data-row-label'>Temp.</div>
            <div id={`${props.id}-temp`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Alt.</div>
            <div id={`${props.id}-alt`} className='data-row-data'> - </div>
          </div>
        </div>
      }

      {/* Orientation */}
      { props.toggles.orientation &&
        <div className='orientation tag-section'>
          <h4>Orientation</h4>
          <div className='data-row'>
            <div className='data-row-label'>W:</div>
            <div id={`${props.id}-orient-w`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>X:</div>
            <div id={`${props.id}-orient-x`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Y:</div>
            <div id={`${props.id}-orient-y`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Z:</div>
            <div id={`${props.id}-orient-z`} className='data-row-data'> - </div>
          </div>
        </div>
      }

      {/* Accel */}
      { props.toggles.accel &&
        <div className='accel tag-section'>
          <h4>Accel</h4>
          <div className='data-row'>
            <div className='data-row-label'>X:</div>
            <div id={`${props.id}-accel-x`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Y:</div>
            <div id={`${props.id}-accel-y`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Z:</div>
            <div id={`${props.id}-accel-z`} className='data-row-data'> - </div>
          </div>
        </div>
      }

      {/* Gyro */}
      { props.toggles.gyro &&
        <div className='gyro tag-section'>
          <h4>Gyro</h4>
          <div className='data-row'>
            <div className='data-row-label'>X:</div>
            <div id={`${props.id}-gyro-x`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Y:</div>
            <div id={`${props.id}-gyro-y`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Z:</div>
            <div id={`${props.id}-gyro-z`} className='data-row-data'> - </div>
          </div>
        </div>
      }

      {/* Magno */}
      { props.toggles.magno &&
        <div className='magno tag-section'>
          <h4>Magno</h4>
          <div className='data-row'>
            <div className='data-row-label'>X:</div>
            <div id={`${props.id}-magno-x`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Y:</div>
            <div id={`${props.id}-magno-y`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Z:</div>
            <div id={`${props.id}-magno-z`} className='data-row-data'> - </div>
          </div>
        </div>
      }

      {/* Meta */}
      { props.toggles.meta &&
        <div className='meta tag-section'>
          <h4>Meta</h4>
          <div className='data-row'>
            <div className='data-row-label'>Batt:</div>
            <div id={`${props.id}-batt`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Ext:</div>
            <div id={`${props.id}-ext`} className='data-row-data'> - </div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Ver:</div>
            <div id={`${props.id}-ver`} className='data-row-data'> - </div>
          </div>
        </div>
      }
    </div>
  )
}

export default TagRow
