import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import api from '../../helpers/api'
import Song from './Song'

class Songs extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('songs')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay canciones</div>
    return (
      <Layout>
        <h1>Canciones</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/songs/new'>Crear Canción +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(song => <Song key={song._id} {...song} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Songs
