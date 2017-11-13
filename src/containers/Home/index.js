import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'

class Home extends React.Component {
  componentDidMount = () => {
    document.title = 'Lazyfy'
  }
  render = () => (
    <Layout>
      <div className="text-center">
        <h1>Bienvenido a Lazyfy</h1>
        <p>Contenidos Landing Page</p>
      </div>
    </Layout>
  )
}

export default Home
