import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"

import authServices from "../../services/auth.service"
import toast from "react-hot-toast"

import { useNavigate } from "react-router-dom"

const LoginForm = () => {

    const { storeToken, authenticateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const notify = () =>
        toast("Welcome", {
            icon: "👋🏼",
            position: 'top-center',
            duration: 4000,
            style: {
                background: '#373737',
                color: '#098',
                border: '1px solid #098',
                padding: '16px'
            }

        })

    const [errors, setErrors] = useState()

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                notify()
                navigate("/transaction")
            })
            .catch(err => setErrors(err.response.data.message))
    }

    const { email, password } = loginData




    return (
        <Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="text-muted">Email</Form.Label>
                <Form.Control className="form-contol" type="email" name="email" value={email}
                    onChange={handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control className="form-control" type="password" name="password" value={password}
                    onChange={handleInputChange}></Form.Control>
            </Form.Group>

            <p>{errors}</p>

            <Button className="btn btn-dark p-2" type="submit">Login</Button>
        </Form>


    )

}

export default LoginForm