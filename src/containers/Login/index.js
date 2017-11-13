import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import api from '../../helpers/api'
import cookie from 'js-cookie'
import decode from 'jwt-decode'

class Login extends React.Component {
  state = {process: false, email: '', password: ''}
  change = e => this.setState({[e.target.id]: e.target.value})
  login = () => {
    const {email, password} = this.state
    this.setState({process: true}, () => {
      api({url: 'login', method: 'post', body: JSON.stringify({email, password})})
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
          <h2 className="text-center">Inicia sesión</h2><br />
          <form className="lazyForms">
            <div className='form-group'>
              <input
                type='email'
                  className='form-control' id='email' placeholder='Dirección de correo electrónico'
                  value={this.state.email}
                  onChange={this.change}
                  />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' id='password' placeholder='Contraseña'
                value={this.state.password}
                onChange={this.change}
                />
              <br />
            </div>
            <div className="text-center">
              <button type='button' className='btn-lazyfy' onClick={this.login}>Iniciar sesión</button>
            </div>
            <div className="text-center">
              <br />¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
            </div>
          </form>
        </div>
      </Layout>

      )
    }
  }

export default Login
