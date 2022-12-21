import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/new-user" exact>
          <NewUser />
        </Route>
        <Route path="/users/:samAccountName">
          <EditUser />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
