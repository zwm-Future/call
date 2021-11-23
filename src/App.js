import { HashRouter, BrowserRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

import routes from './routers';
import renderRoutes from './utils/renderRoutes'
const authed = true //登录权限
const authPath = '/login' 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {renderRoutes(routes,authed,authPath)}
      </BrowserRouter>
    </div>
  );
}

export default App;