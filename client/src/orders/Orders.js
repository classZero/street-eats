import React, { Component } from 'react'
import './orders.css'

export class Orders extends Component {
  render() {
    return (
      <div className="order-view-container">
        <div className="order-header-container">
          <h1 className="order-header-title">Your Orders</h1>
        </div>
        <div className="order-body-container">
          <div className="order-container">
            <h2>order number 23</h2>
            <h3>Time active</h3>
            <h3>Orderers name</h3>
            <p>item 1 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 2 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 3 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 4 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 5 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <button className="order-complete-btn"> mark as done</button>
          </div>
          <div className="order-container">
            <h2>order number 233</h2>
            <h3>Time active</h3>
            <h3>Orderers name</h3>            
            <p>item 1 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 2 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 3 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 4 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 5 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <button className="order-complete-btn">mark as done</button>
          </div>
          <div className="order-container">
            <h2>order number 323</h2>
            <h3>Time active</h3>
            <h3>Orderers name</h3>            
            <p>item 1 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 2 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 3 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 4 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <p>item 5 ;lk ;ljk ;ljk ;ljk ;j l;j j ;lj jl ;j</p>
            <button className="order-complete-btn">mark as done</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Orders
