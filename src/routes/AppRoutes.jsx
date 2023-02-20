
import { Route, Routes } from "react-router-dom"

import HomePage from "../pages/HomePage/Homepage"
import SignupPage from "../pages/SignupPage/Signuppage"
import LoginPage from "../pages/LoginPage/Loginpage"
import PrivateRoutes from "./PrivateRoutes"
import TransactionPage from "../pages/TransactionPage/TransactionPage"







const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoutes />}>
                <Route path="/transaction" element={<TransactionPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes


