import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import api from '../../helpers/api'
import cookie from 'js-cookie'
import decode from 'jwt-decode'


class Signup extends React.Component {
  state = {process: false, err: '', email: '', password: '', name: '', surname: ''}
  change = e => this.setState({[e.target.id]: e.target.value})
  signup = () => {
    const {email, password, name, surname} = this.state
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    data.append('name', name)
    data.append('surname', surname)

    this.setState({process: true}, () => {
      api({url: 'register', method: 'post', body: data})
      .then(res => {
        this.setState({process: false, err: ''})
        cookie.set('token', res.data)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  render = () => {
    return (
      <Layout>
        <div className="col-md-offset-3 col-md-6">
          <h2 className="text-center">Regístrate con tu e-mail</h2><br />
          <form className="lazyForms">

            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                placeholder='Nombre'
                value={this.state.name}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='surname'
                placeholder='Apellido'
                value={this.state.surname}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Dirección de correo electrónico'
                value={this.state.email}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Contraseña'
                value={this.state.password}
                onChange={this.change}
                />
            </div>
            <div>{this.state.err}</div>
            <div className="text-center">
              <button type='button' className='btn-lazyfy' onClick={this.signup}>
                {this.state.process ? 'Cargando...': 'Regístrate'}
              </button>
            </div>
            <div className="text-center">
              <br />¿Ya tienes una cuenta? <Link to='/login'> Inicia sesión</Link>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default Signup
