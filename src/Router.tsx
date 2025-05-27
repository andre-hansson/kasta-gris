import { Route, Routes } from 'react-router';
import { Routes as AppRoutes } from './routes';
import { HomePage } from './pages';

const Router = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Root} element={<HomePage />} />
    </Routes>
  );
};
export default Router;
