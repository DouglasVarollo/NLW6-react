import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route component={Home} exact path="/" />
        <Route component={NewRoom} path="/rooms/new" />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
