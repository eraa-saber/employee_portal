import { Component } from 'react';
import Login from './components/Login component/login';
import Register from './components/Register component/register';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ResetPassword from './components/Reset Password Component/resetPassword';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
