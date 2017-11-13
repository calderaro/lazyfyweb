import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './containers/Home/'
import Artists from './containers/Artistas/'
import ArtistsForm from './containers/Artistas/Form'
import Albums from './containers/Albums/'
import AlbumsForm from './containers/Albums/Form'
import Songs from './containers/Songs/'
import SongsForm from './containers/Songs/Form'
import Login from './containers/Login/'
import Signup from './containers/Signup/'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/artists' component={Artists} />
      <Route exact path='/artists/new' component={ArtistsForm} />
      <Route exact path='/artists/:id' component={ArtistsForm} />

      <Route exact path='/albums' component={Albums} />
      <Route exact path='/albums/new' component={AlbumsForm} />
      <Route exact path='/albums/:id' component={AlbumsForm} />

      <Route exact path='/songs' component={Songs} />
      <Route exact path='/songs/new' component={SongsForm} />
      <Route exact path='/songs/:id' component={SongsForm} />

      <Route exact path='/albums' component={Albums} />
      <Route exact path='/songs' component={Albums} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  </Router>
)

export default App;
