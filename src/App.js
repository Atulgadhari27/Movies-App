import './App.css';
import Navbar from './Components/navbar';
import Banner from './Components/banner';
import MoviesDisplay from './Components/MoviesDisplay';
import Favourites from './Components/favourites';
import { BrowserRouter as Router, Switch, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <MoviesDisplay {...props}/>
          </>
        )}/>
        <Route path='/favourites' component={Favourites} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
    </Router>
  );
}
export default App;
