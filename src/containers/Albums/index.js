import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'
import Layout from '../../components/Layout/'
import Album from './Album'

class Albums extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    document.title = 'Albums'
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('albums')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay Albums</div>
    return (
      <Layout>
        <h1>Albums</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/albums/new'>Crear Album +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(album => <Album key={album._id} {...album} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Albums
