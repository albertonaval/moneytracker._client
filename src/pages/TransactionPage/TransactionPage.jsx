


import { Container, Row, Col } from "react-bootstrap"
import Transaction from "../../components/Transaction/Transaction"




const TransactionPage = () => {


    return (
        <>
            <div className="transactions">
                <Container className="mt-3 text-center">
                    <Row>
                        <Col>
                            <Transaction />
                        </Col>
                    </Row>
                </Container>
            </div>


        </>

    )

}

export default TransactionPage