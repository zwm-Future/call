import { HashRouter, BrowserRouter } from 'react-router-dom';
import React, { useContext } from 'react'
// import { renderRoutes } from 'react-router-config';

import routes from './routers';
import renderRoutes from './utils/renderRoutes'
import { Authtext } from '@/auth'

// const authed = false //登录权限
const authPath = '/login'
function App() {
  const { hasAuth } = useContext(Authtext);
  return (
    <div className="App">
        <BrowserRouter>
          {renderRoutes(routes, hasAuth, authPath)}
        </BrowserRouter>
    </div>
  );
}

export default App;