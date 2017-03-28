import React from 'react'
import { shallow } from 'enzyme'

import Main from './Main'

describe('The Main UI component', () => {
  let minProps
  let wrapper
  let onClick

  beforeEach(() => {
    onClick = jest.fn()

    minProps = {
      likes: 0,
      handleLikeClick: onClick
    }

    wrapper = shallow(<Main {...minProps} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('calls the passed function when the Like button is clicked', () => {
    wrapper.find('Button').simulate('click')
    expect(onClick).toBeCalled()
  })
})

