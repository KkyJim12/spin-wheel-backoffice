import AuthLayout from "layouts/AuthLayout";
import AppLayout from "layouts/AppLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "pages/Auth/Login";
import DashboardPage from "pages/Dashboard/Dashboard";
import UserIndexPage from "pages/User/Index";
import UserCreatePage from "pages/User/Create";
import UserEditPage from "pages/User/Edit";
import CodeIndexPage from "pages/Code/Index";
import CodeCreatePage from "pages/Code/Create";
import CodeEditPage from "pages/Code/Edit";
import PrizeIndexPage from "pages/Prize/Index";
import PrizeCreatePage from "pages/Prize/Create";
import PrizeEditPage from "pages/Prize/Edit";
import EventIndexPage from "pages/Event/Index";
import EventCreatePage from "pages/Event/Create";
import EventEditPage from "pages/Event/Edit";
import SettingIndexPage from "pages/Setting/Index";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </Route>
          <Route path="/dashboard">
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </Route>
          <Route path="/user" exact>
            <AppLayout>
              <UserIndexPage />
            </AppLayout>
          </Route>
          <Route path="/user/create">
            <AppLayout>
              <UserCreatePage />
            </AppLayout>
          </Route>
          <Route path="/user/:id/edit">
            <AppLayout>
              <UserEditPage />
            </AppLayout>
          </Route>
          <Route path="/code" exact>
            <AppLayout>
              <CodeIndexPage />
            </AppLayout>
          </Route>
          <Route path="/code/create">
            <AppLayout>
              <CodeCreatePage />
            </AppLayout>
          </Route>
          <Route path="/code/:id/edit">
            <AppLayout>
              <CodeEditPage />
            </AppLayout>
          </Route>
          <Route path="/prize" exact>
            <AppLayout>
              <PrizeIndexPage />
            </AppLayout>
          </Route>
          <Route path="/prize/create">
            <AppLayout>
              <PrizeCreatePage />
            </AppLayout>
          </Route>
          <Route path="/prize/:id/edit">
            <AppLayout>
              <PrizeEditPage />
            </AppLayout>
          </Route>
          <Route path="/event" exact>
            <AppLayout>
              <EventIndexPage />
            </AppLayout>
          </Route>
          <Route path="/event/create">
            <AppLayout>
              <EventCreatePage />
            </AppLayout>
          </Route>
          <Route path="/event/:id/edit">
            <AppLayout>
              <EventEditPage />
            </AppLayout>
          </Route>
          <Route path="/setting">
            <AppLayout>
              <SettingIndexPage />
            </AppLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
