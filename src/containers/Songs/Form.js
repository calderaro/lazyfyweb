import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'
import Layout from '../../components/Layout/'
import Confirm from '../../components/Confirm/'

class SongsForm extends React.Component {
  state = {process: false, err: '', album: '', name: '', track: '', duration: '', file: null, albums: [], modal: false}
  componentDidMount = () => {
    if (this.props.match.params.id) this.load()
    else this.loadAlbums()
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
        api('songs/' + id),
        api('albums')
      ])
      .then(([songs, albums]) => this.setState({
        process: false, ...songs.data[0],
        album: songs.data[0].album ? songs.data[0].album._id : albums.data[0]._id,
        albums: albums.data
      }))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  loadAlbums = e => {
    this.setState({process: true}, () => {
      api('albums')
      .then(albums => this.setState({process: false, album: albums.data[0]._id, albums: albums.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  create = (e) => {
    const {name, duration, track, file, album} = this.state
    const data = new FormData()

    data.append('name', name)
    data.append('duration', duration)
    data.append('track', track)
    data.append('file', file)
    data.append('album', album)

    this.setState({process: 'save'}, () => {
      api({
        url: 'songs',
        method: 'post',
        body: data
      })
      .then(res => this.props.history.push('/songs'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  update = (e) => {
    const {_id, name, duration, track, file, album} = this.state
    const data = new FormData()

    if (name) data.append('name', name)
    if (track) data.append('track', track)
    if (duration) data.append('duration', duration)
    if (file) data.append('file', file)
    if (album) data.append('album', album)

    this.setState({process: 'save'}, () => {
      api({ url: 'songs/' + _id, method: 'put', body: data})
      .then(res => this.props.history.push('/songs'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  delete = (e) => {
    const {_id} = this.state

    this.setState({process: 'delete'}, () => {
      api({url: 'songs/' + _id, method: 'delete'})
      .then(res => this.props.history.push('/songs'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
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
                id='album'
                value={this.state.album}
                onChange={this.change}>
                {this.state.albums.map(album => <option value={album._id} key={album._id}>{album.name}</option>)}
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
                id='duration'
                placeholder='Duración'
                value={this.state.duration}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='track'
                placeholder='Número de canción'
                value={this.state.track}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                type='file'
                className='form-control'
                id='file'
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

export default SongsForm
