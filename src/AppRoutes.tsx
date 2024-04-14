import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./Pages/HomePage";
import AuthCallbackPage from "./Pages/AuthCallbackPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageTiffineServicePage from "./Pages/ManageTiffineServicePage";

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage/>} />

            <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
            <Route path="/manage-tiffineService" element={<Layout><ManageTiffineServicePage/></Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;