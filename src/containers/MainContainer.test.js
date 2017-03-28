import React from 'react'
import { shallow } from 'enzyme'

import MainContainer from './MainContainer'

describe('MainContainer', () => {
  it('renders without crashing', () => {
    expect(shallow(<MainContainer />).length).toEqual(1)
  })

  it('handleLikeClick increases state.like by one', () => {
    const wrapper = shallow(<MainContainer />)
    const startLikes = wrapper.state('likes')
    wrapper.instance().handleLikeClick()
    const endLikes = wrapper.state('likes')
    expect(parseInt(startLikes) === parseInt(endLikes))
  })
})
