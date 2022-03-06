import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class navbar extends Component {
  render() {
    return (
      <div className = 'nav-bar'>
        <Link to='/' style={{textDecoration: 'none'}}><h1>Movies App</h1></Link>
        <Link to='/favourites' style={{textDecoration: 'none'}}><h3>favourites</h3></Link>
      </div>
    )
  }
}
