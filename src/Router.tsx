import { Route, Routes } from "react-router"
import { Routes as AppRoutes } from './routes'
import { DashboardPage } from "./pages";

const Router = () => {
    return (<Routes>
        <Route path={AppRoutes.Root} element={<DashboardPage />} />
    </Routes>)
}
export default Router;