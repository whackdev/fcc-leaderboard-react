import React, { Component } from 'react'
import axios from '../../config/axios.config'

import Camper from '../../components/Camper/Camper'
import Filter from '../../components/Filter/Filter'


import './Leaderboard.css'

export default class Leaderboard extends Component {
  state = {
    campers: null,
    currentState: 'recent'
  }

  toggleFilterHandler = (currentFilter) => {
    this.setState({
      currentState: currentFilter === 'recent' ? 'alltime' : 'recent'
    })
  }

  componentDidMount() {
    axios.get(`/${this.state.currentState}`)
      .then(res => {
        this.camperSortHandler(res.data, this.state.currentState)
        /*
        const sortedCampers = res.data.sort((a, b) => {
          return b[this.state.currentState] - a[this.state.currentState]
        })
        this.setState({ campers: sortedCampers }) */
      })
      .catch(err => {
        console.error(err)
      })
  }

  camperSortHandler = (objArr, filter) => {
    const sortedCampers = objArr.sort((objA, objB) => {
      return objB[filter] - objA[filter]
    })
    this.setState({ campers: sortedCampers })
  }

  filterClickedHandler = (filter) => {
    if (filter !== this.state.currentState) {
      this.setState({ currentState: filter })
      this.camperSortHandler(this.state.campers, filter)
    }
  }

  render() {
    let campers;

    if (this.state.campers) {
      campers = this.state.campers.map((camper, index) => {
        return <Camper index={index} camper={camper} key={camper.username} />
      })
    }
    

    return (
      <div className='leaderboard'>
        <h1>FreeCodeCamp Leaderboard</h1>
        {this.state.campers ? (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Camper</th>
                <Filter
                  name='recent'
                  clicked={this.filterClickedHandler}>Recent Points (30 days)</Filter>
                <Filter
                  name='alltime'
                  clicked={this.filterClickedHandler}>All Time Points</Filter>
              </tr>
            </thead>
            <tbody>
              {campers}
            </tbody>
          </table> 
        ) : <h4>Loading...!</h4> }
      </div>
    )
  }
}
