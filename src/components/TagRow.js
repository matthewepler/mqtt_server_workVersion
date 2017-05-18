import React from 'react'

// components
import Pill from '../components/Pill'

// styles
import '../styles/TagRow.css'

function TagRow (props) {
  return (
    <div id={`${props.id}-tag-row`} className='tag-row'>
      {/* Meta */}
      <div className='meta tag-section'>
        <h4>Meta</h4>
        <div id={`${props.id}-tagId`} className='tagId'>{props.id}</div>
        <div id={`${props.id}-name`} className='name'>{props.name}</div>
        <div id={`${props.id}-site`} className='site'>{props.site}</div>
      </div>

      {/* Last Heard */}
      <div className='last-heard tag-section'>
        <h4>Last Heard</h4>
        <div id={`${props.id}-last-heard-data`} className='last-heard-data'>99:99</div>
      </div>

      {/* Events */}
      { props.toggles.events &&
        <div className='events-wrapper tag-section'>
          <h4>Events</h4>
          <div className='events'>
            <Pill id={`${props.id}-fall`} label={'Fall'} data={'999'} />
            <Pill id={`${props.id}-struck-by`} label={'Struck By'} data={'999'} />
            <Pill id={`${props.id}-button-press-safety`} label={'(!) Safety'} data={'999'} />
            <Pill id={`${props.id}-button-press-emergency`} label={'(!) Emer.'} data={'999'} />
            <Pill id={`${props.id}-noise`} label={'Noise'} data={'999'} />
            <Pill id={`${props.id}-vibration`} label={'Vibration'} data={'999'} />
            <Pill id={`${props.id}-motion`} label={'Motion'} data={'999'} />
            <Pill id={`${props.id}-heat`} label={'Heat'} data={'999'} />
            <Pill id={`${props.id}-cold`} label={'Cold'} data={'999'} />
            <Pill id={`${props.id}-gait`} label={'Gait'} data={'999'} />
          </div>
        </div>
      }

      {/* Motions */}
      { props.toggles.motions &&
        <div className='motions-wrapper tag-section'>
          <h4>Motions</h4>
          <div className='motions'>
            <Pill id={`${props.id}-bad-bends`} label={'Bad Bends'} data={'999'} />
            <Pill id={`${props.id}-steps`} label={'Steps'} data={'99999'} />
            <Pill id={`${props.id}-trips`} label={'Trips'} data={'999'} />
            <Pill id={`${props.id}-slips`} label={'Slips'} data={'999'} />
            <Pill id={`${props.id}-squats`} label={'Squats'} data={'999'} />
            <Pill id={`${props.id}-twists`} label={'Twists'} data={'999'} />
            <Pill id={`${props.id}-reaches`} label={'Reaches'} data={'999'} />
            <Pill id={`${props.id}-jumps`} label={'Jumps'} data={'999'} />
          </div>
        </div>
      }

      {/* EnvHi */}
      { props.toggles.envhi &&
        <div className='envHi tag-section'>
          <h4>EnvHi</h4>
          <div className='data-row'>
            <div className='data-row-label'>Mic.</div>
            <div className='data-row-data'>9999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Humid.</div>
            <div className='data-row-data'>999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Baro.</div>
            <div className='data-row-data'>9999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>UV</div>
            <div className='data-row-data'>N/A</div>
          </div>
        </div>
      }

      {/* EnvLo */}
      { props.toggles.envlo &&
        <div className='envLo tag-section'>
          <h4>EnvLo</h4>
          <div className='data-row'>
            <div className='data-row-label'>Temp.</div>
            <div className='data-row-data'>999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Alt.</div>
            <div className='data-row-data'>9999.99</div>
          </div>
        </div>
      }

      {/* Orientation */}
      { props.toggles.orientation &&
        <div className='orientation tag-section'>
          <h4>Orientation</h4>
          <div className='data-row'>
            <div className='data-row-label'>W:</div>
            <div className='data-row-data'>999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>X:</div>
            <div className='data-row-data'>999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Y:</div>
            <div className='data-row-data'>999</div>
          </div>
          <div className='data-row'>
            <div className='data-row-label'>Z:</div>
            <div className='data-row-data'>999</div>
          </div>
        </div>
      }
    </div>
  )
}

export default TagRow
