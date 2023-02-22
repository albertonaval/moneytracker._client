import { useContext, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate } from "react-router-dom"


import WOW from "wowjs"
import { AuthContext } from "../../context/auth.context"

const HomePage = () => {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        new WOW.WOW({
            live: false,
        }).init()
    }, [])

    return (
        <>
            {!user ? (
                <Container className="py-5">
                    <Row className="mt-5 pb-5 align-items-center justify-content-lg-end wow fadeInUp " data-wow-duration="2s">
                        <Col lg={{ span: 7 }} className="text-center">
                            <div className="d-flex my-5 pb-5">
                                <img src="https://res.cloudinary.com/dqvwx536e/image/upload/v1675869713/undraw_digital_currency_qpak_dys0zn.svg" alt="Team" width="100%" />
                            </div>
                        </Col>
                        <Col lg={{ span: 5 }} className="text-center d-flex justify-content-lg-end justify-content-md-center pb-5 mb-5">
                            <div className="text-start ">
                                <h1 className="mt-5 textPrimary">Money Tracker</h1>
                                <h4 className="pt-5 textSecondary">Be ready to save money</h4>
                                <h4 className="textSecondary">Get ready to buy your future whim</h4>
                                <p className="footer mt-3"> ©️ Developed by <a href="https://github.com/albertonaval">Alberto Naval</a></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Navigate to="/transaction" />
            )}
        </>

    )
}

export default HomePage

