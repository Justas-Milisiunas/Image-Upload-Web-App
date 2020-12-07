import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './Authentication/LoginForm';
import ImageList from './Image/ImageList';
import ImageDetails from './Image/ImageDetails';
import NavigationBar from './NavigationBar';
import Notifications from './Notifications';
import BreadCrumbs from './BreadCrumbs';
import UserProfile from './User/UserProfile';

const App = () => {
  return (
    <div>
      <Notifications />
      <BrowserRouter>
        <NavigationBar />
        {/* <BreadCrumbs /> */}
        <Switch>
          <Route path="/images" exact component={ImageList} />
          <Route path="/images/:id" component={ImageDetails} />
          <Route path="/profile" exact component={UserProfile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
