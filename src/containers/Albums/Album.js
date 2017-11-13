import React from 'react'
import {Link} from 'react-router-dom'

const Album = props => (
    <div className="row artistItemList">
      <Link to={'/albums/' + props._id}>
        <div className="col-md-6"><img width="200px" src={props.image} alt={props.name} /></div>
        <div className="col-md-6">
          <div><b>{props.name}</b></div>
          {props.artist ? <div>Artista: {props.artist.name}</div> : null}
          <div>Año: {props.year}</div>
          <div>Número de canciones: {props.track}</div>

        </div>
      </Link><br /><br />
    </div>

)

export default Album
