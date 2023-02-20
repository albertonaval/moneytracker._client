import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth.service"


const SignupForm = () => {

    const [signupData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignUpData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signup(signupData)
            .then(() => navigate("/login"))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { username, email, password } = signupData

    return (
        <Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label className="text-muted">Username</Form.Label>
                <Form.Control className="form-contol" type="username" name="username" value={username}
                    onChange={handleInputChange}></Form.Control>
            </Form.Group>

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

            {errors.length ? (
                <p>
                    {errors.map(elm => (
                        <p key={elm}>{elm}</p>
                    ))}
                </p>
            ) : undefined}

            <Button className="btn btn-dark mt-3 p-2" type="submit">Sign Up</Button>
        </Form>
    )



}

export default SignupForm