import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';



function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
