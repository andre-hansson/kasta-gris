import { BrowserRouter } from 'react-router';
import Router from './Router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex-full px-4 py-6">
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;
