import { Component } from 'react';
import Login from './components/Login component/login';
import Activate from './components/Activation Message Component/activate';
import Error from './components/Error Component/error';
import Profile from './components/Profile Component/profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ForgetPassword from './components/Forget Password Component/forgetPassword';
import PasswordChange from './components/Password Change Component/passwordChange';
import RequestsPage from './pages/RequestsPage';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register component/register';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<Navigate to="/login" />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/activate' element={<Activate />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route exact path='/passwordchange' element={<PasswordChange />} />
          {/* New Home and Requests routes */}
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/requests' element={<RequestsPage/>} />
          {/* Catch-all route for any undefined path */}
          <Route exact path='/error' element={<Error />} />

          {/* Protected Routes */}
          <Route
            exact
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/error" />} />
          <Route path='/requests' element={
            <PrivateRoute>
              <RequestsPage />
            </PrivateRoute>
          } />
          <Route path='/home' element={<PrivateRoute><div /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><div /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
