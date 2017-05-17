import React from 'react'

// components
import Pill from '../components/Pill'

// styles
import '../styles/TagRow.css'

function TagRow (props) {
  return (
    <div className='tag-row'>
      {/* Meta */}
      <div id='meta' className='tag-section'>
        <h4>Meta</h4>
        <div id='tagId'>999999</div>
        <div id='name'>First Lastname</div>
        <div id='site'>51 Jay St.</div>
      </div>

      {/* Time Delta */}
      <div id='time-delta' className='tag-section'>
        <h4>∆ Time</h4>
        <div id='time-delta-data'>99:99</div>
      </div>

      {/* Events */}
      { props.toggles.events &&
        <div id='events-wrapper' className='tag-section'>
          <h4>Events</h4>
          <div id='events'>
            <Pill id={'fall'} label={'Fall'} data={'999'} />
            <Pill id={'struck-by'} label={'Struck By'} data={'999'} />
            <Pill id={'button-press-safety'} label={'(!) Safety'} data={'999'} />
            <Pill id={'button-press-emergency'} label={'(!) Emer.'} data={'999'} />
            <Pill id={'noise'} label={'Noise'} data={'999'} />
            <Pill id={'vibration'} label={'Vibration'} data={'999'} />
            <Pill id={'motion'} label={'Motion'} data={'999'} />
            <Pill id={'heat'} label={'Heat'} data={'999'} />
            <Pill id={'cold'} label={'Cold'} data={'999'} />
            <Pill id={'gait'} label={'Gait'} data={'999'} />
          </div>
        </div>
      }

      {/* Motions */}
      { props.toggles.motions &&
        <div id='motions-wrapper' className='tag-section'>
          <h4>Motions</h4>
          <div id='motions'>
            <Pill id={'bad-bends'} label={'Bad Bends'} data={'999'} />
            <Pill id={'steps'} label={'Steps'} data={'99999'} />
            <Pill id={'trips'} label={'Trips'} data={'999'} />
            <Pill id={'slips'} label={'Slips'} data={'999'} />
            <Pill id={'squats'} label={'Squats'} data={'999'} />
            <Pill id={'twists'} label={'Twists'} data={'999'} />
            <Pill id={'reaches'} label={'Reaches'} data={'999'} />
            <Pill id={'jumps'} label={'Jumps'} data={'999'} />
          </div>
        </div>
      }

      {/* EnvHi */}
      { props.toggles.envhi &&
        <div id='envHi' className='tag-section'>
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
        <div id='envLo' className='tag-section'>
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
        <div id='orientation' className='tag-section'>
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
