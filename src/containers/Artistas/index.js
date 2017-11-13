import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import Artist from './Artist'
import api from '../../helpers/api'

class Artists extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('artists')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.message})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay Artistas</div>
    return (
      <Layout>
        <h1>Artistas</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/artists/new'>Crear Artista +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(artist => <Artist key={artist._id} {...artist} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Artists
