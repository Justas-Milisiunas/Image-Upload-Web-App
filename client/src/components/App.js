import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import NavigationBar from './NavigationBar';

const App = () => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return (
    <div>
      <LoginForm />
      {/* {isSignedIn ? 'Logged In' : 'Logged Out'}
      <NavigationBar /> */}
    </div>
  );
};

export default App;
