import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Stores from './pages/Stores';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Layout from './Layout';
import store from './store'
import UserPage from './pages/AllProducts';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <Router>
      <div>
        <Switch>
        <Route path="/" exact>
          <UserPage />
        </Route>
        <Route path="/admin/stores" exact>
          <Layout component={Stores} />
          </Route>
          <Route path="/admin/:id/categories" exact>
            <Layout component={Categories} />
          </Route>
          <Route path="/admin/:id/products" exact>
          <Layout component={Products} />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    </Provider>
  );
}

export default App;
