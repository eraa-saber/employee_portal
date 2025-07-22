import { Component } from 'react';
import Login from './components/Login component/login';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import ForgetPassword from './components/Forget Password Component/forgetPassword';
import PasswordChange from './components/Password Change Component/passwordChange';
import RequestsPage from './pages/RequestsPage';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register component/register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to="/login"/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route exact path='/passwordchange' element={<PasswordChange/>}/>
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
