import { Component } from 'react';
import Login from './components/Login component/login';
import Activate from './components/Activation Message Component/activate';
import Register from './components/Register component/register';
import Error from './components/Error Component/error';
import Profile from './components/Profile Component/profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ResetPassword from './components/Reset Password Component/resetPassword';
import PasswordChange from './components/Password Change Component/passwordChange';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to="/login" />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/error' element={<Error />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/activate' element={<Activate />} />
          <Route path='/forgot-password' element={<ResetPassword />} />
          <Route exact path='/passwordchange' element={<PasswordChange />} />
          
          {/* Catch-all route for any undefined path */}
          
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
