import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StateSpecificDetails from './components/StateSpecificDetails'
import Vaccination from './components/Vaccination'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateSpecificDetails} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route component={NotFound} />
  </Switch>
)

export default App
