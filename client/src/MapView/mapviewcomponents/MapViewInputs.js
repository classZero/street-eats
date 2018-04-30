import React, { Component } from 'react'

class MapViewInputs extends Component {
  render () {
    return (
    <div>

      <input type="text" placeholder="street address" />
      <select>
        <option value="street">Street</option>
        <option value="way">Way</option>
        <option value="road">Road</option>
        <option value="avenue">Avenue</option>
        <option value="drive">Drive</option>
        <option value="lane">Lane</option>
        <option value="terrace">Terrace</option>
        <option value="court">Court</option>
      </select>
      <input type="cell" placeholder="when will you open" />
      <input type="cell" placeholder="when will you close" />
      
      <h5>Optional Fields:</h5>
      <p>this will be the icon of your marker on the map:<input type="file" /></p>
      <input style={{width:'500px'}} type="text" placeholder="special info, to be seen by customers who click on your location EX. behind the target" />
      <br/>

      <button type="submit">Submit</button>

    </div>
      
    )
  }
}

export default MapViewInputs
