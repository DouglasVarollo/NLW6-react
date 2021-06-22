import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={NewRoom} path="/rooms/new" />
    </BrowserRouter>
  );
}

export default App;
