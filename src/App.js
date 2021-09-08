import AuthLayout from 'layouts/AuthLayout';
import AppLayout from 'layouts/AppLayout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from 'pages/Auth/Login';
import DashboardPage from 'pages/Dashboard/Dashboard';
import UserIndexPage from 'pages/User/Index';
import UserCreatePage from 'pages/User/Create';
import UserEditPage from 'pages/User/Edit';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <Route path='/login'>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </Route>
          <Route path='/dashboard'>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </Route>
          <Route path='/user' exact>
            <AppLayout>
              <UserIndexPage />
            </AppLayout>
          </Route>
          <Route path='/user/create'>
            <AppLayout>
              <UserCreatePage />
            </AppLayout>
          </Route>
          <Route path='/user/:id/edit'>
            <AppLayout>
              <UserEditPage />
            </AppLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
