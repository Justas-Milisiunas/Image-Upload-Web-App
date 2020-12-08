import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ImageList from './Image/ImageList';
import ImageDetails from './Image/ImageDetails';
import NavigationBar from './NavigationBar';
import Notifications from './Notifications';
import UserProfile from './User/UserProfile';
import ImageCreate from './Image/ImageCreate';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Notifications />
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/images" exact component={ImageList} />
          <Route path="/images/create" exact component={ImageCreate} />
          <Route path="/images/:id" component={ImageDetails} />
          <Route path="/profile" exact component={UserProfile} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
