import { HashRouter, BrowserRouter } from 'react-router-dom';
import React, { useContext } from 'react'
// import { renderRoutes } from 'react-router-config';

import routes from './routers';
import renderRoutes from './utils/renderRoutes'
import { Authtext } from '@/auth'

// const authed = false //登录权限
const authPath = '/login'
function App() {
  const { authed } = useContext(Authtext);
  const hasAuth = authed || localStorage.getItem("user");
  return (
    <div className="App">
        <HashRouter>
          {renderRoutes(routes, hasAuth, authPath)}
        </HashRouter>
    </div>
  );
}

export default App;