import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth.service"

//import toast from "react-hot-toast"


const SignupForm = () => {

    const [signupData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
    })


    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignUpData({ ...signupData, [name]: value })
    }


    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signup(signupData)
            .then(() => {
                //notifySignUp()
                navigate("/login")
            })
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





// const notifySignUp = () =>
//     toast("Sign Up successful", {
//         icon: "💰",
//         position: 'top-center',
//         duration: 4000,
//         style: {
//             background: '#373737',
//             color: '#098',
//             border: '1px solid #098',
//             padding: '16px'
//         }

//     })

// const notifySignUp = () =>
//     toast("Sign Up successful", {
//         icon: "💜",
//     })