import React from 'react'
import './Filter.css'

const filter = (props) => (
  <th>
    <button 
      className='link'
      onClick={() => props.clicked(props.name)}
    >
      {props.children}
    </button>
  </th>
)

export default filter