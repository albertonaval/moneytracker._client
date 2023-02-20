import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"




const PrivateRoutes = () => {

    const { user, isLoading } = useContext(AuthContext)


    if (isLoading) {
        return <div className="Container">
            <h1>Cargando...</h1>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />

}

export default PrivateRoutes