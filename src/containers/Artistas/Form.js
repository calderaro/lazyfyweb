import React from 'react'
import Layout from '../../components/Layout/'
import Confirm from '../../components/Confirm/'
import api from '../../helpers/api'

class ArtistsForm extends React.Component {
  state = {process: false, err: '', name: '', description: '', image: null, modal: false}
  componentDidMount = () => {
    if (this.props.match.params.id) this.load()
  }
  change = e => {
    const type = e.target.type
    const value = type === 'file' ? e.target.files[0] : e.target.value
    this.setState({[e.target.id]: value})
  }
  load = e => {
    const id = this.props.match.params.id
    this.setState({process: true}, () => {
      api('artists/' + id)
      .then(res => this.setState({process: false, ...res.data[0]}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  create = (e) => {
    const {name, description, image} = this.state
    const data = new FormData()

    data.append('name', name)
    data.append('description', description)
    data.append('image', image)

    this.setState({process: true}, () => {
      api({
        url: 'artists',
        method: 'post',
        body: data
      })
      .then(res => this.props.history.push('/artists'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.message})
      })
    })
  }
  update = (e) => {
    const {_id, name, description, image} = this.state
    const data = new FormData()

    if (name) data.append('name', name)
    if (description) data.append('description', description)
    if (image) data.append('image', image)

    this.setState({process: true}, () => {
      api({
        url: 'artists/' + _id,
        method: 'put',
        body: data
      })
      .then(res => this.props.history.push('/artists'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  delete = (e) => {
    const {_id} = this.state

    this.setState({process: 'delete'}, () => {
      api({
        url: 'artists/' + _id,
        method: 'delete'
      })
      .then(res => this.props.history.push('/artists'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'Problemas de conexión'})
      })
    })
  }
  toggleModal = () => this.setState({modal: !this.state.modal})
  render = () => {
    return (
      <Layout>
        {this.state.modal ? <Confirm delete={this.delete} toggle={this.toggleModal} /> : null}
        <div className="col-md-offset-3 col-md-6">
          <h2 className="text-center">Crear Artista</h2><br />
          <form className="lazyForms">
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
              <textarea
                className='form-control'
                id='description'
                placeholder='descripción'
                value={this.state.description}
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

export default ArtistsForm
