
import { Link } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid className="py-2">
                    <Navbar.Brand>
                        <Link to="/" className="brand-link py-2 px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-businessplan" width="40" height="40" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#009988" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <ellipse cx="16" cy="6" rx="5" ry="3" />
                                <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                <path d="M5 15v1m0 -8v1" />
                            </svg>
                            <span className="px-2">moneytracker.</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {user ? (
                            <Nav>
                                <Link to="/" className="nav-btn m-2" onClick={logoutUser}>
                                    <Nav.Link as="div">
                                        Log Out
                                    </Nav.Link>
                                </Link>
                                <Link to="/transaction" className="nav-btn m-2" style={{ maxWidth: "max-content" }}>
                                    <Nav.Link as="div">
                                        Transaction Board
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Link to="/login" className="nav-btn m-2">
                                    <Nav.Link as="div">Login</Nav.Link>
                                </Link>
                                <Link to="/signup" className="nav-btn m-2" style={{ maxWidth: "max-content" }}>
                                    <Nav.Link as="div">
                                        Try MoneyTracker!
                                    </Nav.Link>
                                </Link>
                            </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation