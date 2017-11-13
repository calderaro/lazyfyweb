import React from 'react'
import './style.css'

const Confirm = props => (
  <div className="modalDelete">
    <div>
      <h2>Eliminar</h2>
      <p>¿Estás seguro que quieres borrar este elemento?</p>
      <button className="btn-lazyfy" onClick={props.delete}>Sí, estoy seguro</button>
      <button className="btn-lazyfy"  onClick={props.toggle}>No</button>
    </div>
  </div>
)

export default Confirm
