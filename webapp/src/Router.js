import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Template from './Template';
import NewsList from './pages/News/NewsList';
import NewsItem from './pages/News/NewsItem';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Template>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/News" exact>
          <NewsList />
        </Route>

        <Route path="/News/:id">
          <NewsItem />
        </Route>
      </Template>
    </Switch>
  </BrowserRouter>
);

export default Router;
