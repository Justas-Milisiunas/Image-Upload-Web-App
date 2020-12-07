import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import ImageList from './ImageList';
import ImageDetails from './ImageDetails';
import NavigationBar from './NavigationBar';
import Notifications from './Notifications';

const App = () => {
  return (
    <div>
      <Notifications />
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/images" exact component={ImageList} />
          <Route path="/images/:id" component={ImageDetails} />
          <Route path="/login" exact component={LoginForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
