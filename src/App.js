import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import LoginPage from "./views/LoginPage/LoginPage"
import RegisterPage from "./views/RegisterPage/RegisterPage"
import Footer from "./views/Footer/Footer"
import NavBar from "./views/NavBar/NavBar"
import NotFound from "./views/NotFound"
import Profile from './views/ProfilePage/ProfilePage'
import Setting from './views/ProfilePage/Setting'
import UploadRecipePage from './views/UploadRecipePage/UploadRecipePage'

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <BrowserRouter>
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
              <Route exact path="/Home" component={Home} />
              <Route exact path="/">
                <Redirect to="/Home" />
              </Route>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Setting} />
              <Route exact path="/recipe/upload" component={UploadRecipePage} />
              <Route component={NotFound}/>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
