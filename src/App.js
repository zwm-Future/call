import { HashRouter } from 'react-router-dom';
import React from 'react'

import routes from './routers';
import renderRoutes from './utils/renderRoutes'

const authPath = '/login'
function App() {
  return (
    <div className="App">
        <HashRouter>
          {renderRoutes(routes, authPath)}
        </HashRouter>
    </div>
  );
}

export default App;