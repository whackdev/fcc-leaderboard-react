import React from 'react'

const camper = (props) => (
  <tr>
    <td>{props.index + 1}</td>
    <td>{props.camper.username}</td>
    <td>{props.camper.recent}</td>
    <td>{props.camper.alltime}</td>
  </tr>
)

export default camper