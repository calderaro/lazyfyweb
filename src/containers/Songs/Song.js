import React from 'react'
import {Link} from 'react-router-dom'

const Song = props => (
    <div className="row artistItemList">
      <Link to={'/songs/' + props._id}>
        <div className="col-md-7">
          <audio controls>
            <source src={props.file} type="audio/mpeg"></source>
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="col-md-5">
          <div><b>{props.name}</b></div>
          {props.album ? <div>Album: {props.album.name}</div> : null}
          <div>Duración: {props.duration}</div>
          <div>Número de canción: {props.track}</div>

        </div>
      </Link><br /><br />
    </div>

)

export default Song
