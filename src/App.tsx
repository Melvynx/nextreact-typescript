/**
 * DO NOT UPDATE
 * This is the main entry point of the application.
 */

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './chore/Router';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
