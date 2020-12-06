import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import ImageList from './ImageList';
import NavigationBar from './NavigationBar';

const App = () => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/images" exact component={ImageList} />
          <Route path="/login" exact component={LoginForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
