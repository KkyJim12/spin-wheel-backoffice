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
          <Route path='/user'>
            <AppLayout>
              <UserIndexPage />
            </AppLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
