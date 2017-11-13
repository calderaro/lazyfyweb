import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'
import Layout from '../../components/Layout/'
import Confirm from '../../components/Confirm/'

class AlbumsForm extends React.Component {
  state = {process: false, err: '', artist: '', name: '', description: '', image: null, artists: [], modal: false}
  componentDidMount = () => {
    if (this.props.match.params.id) this.load()
    else this.loadArtists()
  }
  change = e => {
    const type = e.target.type
    const value = type === 'file' ? e.target.files[0] : e.target.value
    this.setState({[e.target.id]: value})
  }
  load = e => {
    const id = this.props.match.params.id
    this.setState({process: true}, () => {
      Promise.all([
        api('albums/' + id),
        api('artists/')
      ])
      .then(([albums, artists]) => this.setState({
        process: false,
        ...albums.data[0],
        artist: albums.data[0].artist ? albums.data[0].artist._id : artists.data[0]._id,
        artists: artists.data
      }))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  loadArtists = e => {
    this.setState({process: true}, () => {
      api('artists/')
      .then(res => this.setState({process: false, artist: res.data[0]._id, artists: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  create = (e) => {
    const {name, year, track, image, artist} = this.state
    const data = new FormData()

    data.append('name', name)
    data.append('year', year)
    data.append('track', track)
    data.append('image', image)
    data.append('artist', artist)

    this.setState({process: 'save'}, () => {
      api({
        url: 'albums',
        method: 'post',
        body: data
      })
      .then(res => this.props.history.push('/albums'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.data.message})
      })
    })
  }
  update = (e) => {
    const {_id, name, year, track, image, artist} = this.state
    const data = new FormData()

    if (name) data.append('name', name)
    if (track) data.append('track', track)
    if (year) data.append('year', year)
    if (image) data.append('image', image)
    if (artist) data.append('artist', artist)

    this.setState({process: 'save'}, () => {
      api({url: 'albums/' + _id, method: 'put', body: data})
      .then(res => this.props.history.push('/albums'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.data.message})
      })
    })
  }
  delete = (e) => {
    const {_id} = this.state

    this.setState({process: 'delete'}, () => {
      api({url: 'albums/' + _id, method: 'delete'})
      .then(res => this.props.history.push('/albums'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.data.message})
      })
    })
  }
  toggleModal = () => this.setState({modal: !this.state.modal})
  render = () => {
    return (
      <Layout>
        {this.state.modal ? <Confirm delete={this.delete} toggle={this.toggleModal} /> : null}
        <div className="col-md-offset-3 col-md-6">
          <h2 className="text-center">Crear Album</h2><br />
          <form className="lazyForms">
            <div className='form-group'>
              <select
                className='form-control'
                id='artist'
                value={this.state.artist}
                onChange={this.change}>
                {this.state.artists.map(artist => <option value={artist._id} key={artist._id}>{artist.name}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='name'
                placeholder='Nombre'
                value={this.state.name}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='year'
                placeholder='Año'
                value={this.state.year}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='track'
                placeholder='Número de canciones'
                value={this.state.track}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                type='file'
                className='form-control'
                id='image'
                onChange={this.change}
                />
            </div>
            <div>{this.state.err}</div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <button type='button' className='btn-lazyfy btn-danger' onClick={this.toggleModal}>
                  {this.state.process === 'delete' ? 'Cargando...': 'Eliminar'}
                </button>
              </div>
              <div className="col-xs-6 text-left">
                <button type='button' className='btn-lazyfy' onClick={this.state._id ? this.update : this.create}>
                  {this.state.process === 'save' ? 'Cargando...': 'Guardar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default AlbumsForm
