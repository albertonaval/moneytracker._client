import { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import transactionServices from "../../services/transaction.service"

const Transaction = () => {

    const { user } = useContext(AuthContext)

    const [transactionDataInput, setTransactionDataInput] = useState({
        operation: "",
        price: "",
        description: "",
    })

    const [transactionData, setTransactionData] = useState([])
    const [transactionDataCopy, setTransactionDataCopy] = useState([])
    const [transactionId, setTransactionId] = useState("")

    const handleInputChange = e => {
        const { value, name } = e.target

        setTransactionDataInput({ ...transactionDataInput, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        transactionServices
            .getTransactionByUser(user._id)
            .then(() => {
                return transactionServices.newTransaction(transactionDataInput)
            })
            .then(() => {
                getTransactionByUser()
                setTransactionDataInput({
                    operation: "",
                    price: "",
                    description: ""
                })
            })
            .catch(err => console.log({ message: "Internal server error", err }))
    }

    const getTransactionByUser = () => {
        transactionServices
            .getTransactionByUser(user._id)
            .then(res => {
                setTransactionData(res.data)
                setTransactionDataCopy(res.data)
            })
            .catch(err => console.log({ message: "Internal server error", err }))
    }

    const deleteTransactionById = () => {
        transactionServices
            .deleteTransaction(transactionData[transactionId]._id, { new: true })
            .then(() => getTransactionByUser())
            .catch(err => console.log({ message: "Internal server error", err }))
    }

    const deleteAllTransaction = () => {
        transactionServices
            .deleteAllTransactions(user._id)
            .then(() => getTransactionByUser())
            .catch(err => console.log({ message: "Internal server error", err }))
    }

    const handleMouseOver = id => {
        setTransactionId(id)
    }

    const handleMouseOut = () => {
        setTransactionId("")
    }

    const handleSearchInput = e => {
        if (e.target.value === "") {
            setTransactionData(transactionDataCopy)
        } else {
            const filteredTransactionsByName = transactionDataCopy.filter(elm => elm.transaction[0].operation.toLowerCase().includes(e.target.value.toLowerCase()))
            setTransactionData(filteredTransactionsByName)

            // const filteredTransactionsByDescription = transactionDataCopy.filter(elm => console.log(elm.transaction[0]))

            const filteredTransactionsByDescription = transactionDataCopy.filter(elm => elm.transaction[0].description.toLowerCase().includes(e.target.value.toLowerCase()))
            setTransactionData(filteredTransactionsByDescription)

        }
    }

    useEffect(() => {
        getTransactionByUser()
    }, [])

    let balance = 0
    transactionData.map((elm) =>
        balance += elm.transaction[0].price)

    balance = balance.toFixed(2)
    const fraction = balance.split('.')[1]
    balance = balance.split('.')[0]


    const { operation, price, description } = transactionDataInput

    return (
        <>
            <main className="mt-5 p-3">
                <section>
                    <h1 className={balance < 0 ? "balance" : "balanceGreen"}>
                        {balance}
                        <span className="balanceSpan">{fraction}</span>
                        <i className="bi bi-piggy-bank-fill ml-3"></i>
                    </h1>
                    <input type="text" className="searchInput mt-2" placeholder="🔍 Search..." onChange={handleSearchInput} />
                    <Form onSubmit={handleFormSubmit}>
                        <div className="basic">
                            <div className="inputOperation">
                                <Form.Group className="mb-3" controlId="operationname">
                                    <Form.Control className="form-contol" type="text" name="operation"
                                        value={operation}
                                        onChange={handleInputChange}
                                        placeholder="Transaction's name"
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                            <div className="inputPrice">
                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Control className="form-contol" type="number" name="price"
                                        value={price}
                                        onChange={handleInputChange}
                                        placeholder="0 €"
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="description">
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control className="form-contol" type="text" name="description"
                                    value={description}
                                    onChange={handleInputChange}
                                    placeholder="Transaction's description"
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="d-flex gap-4">
                            <Button className="btn btn-dark addButton" type="submit">
                                <i className="bi bi-cloud-plus"><span className="px-3">Add transaction</span></i>
                            </Button>
                            <Button className="btn btn-dark deleteButton" type="submit" onClick={deleteAllTransaction}>
                                <i className="bi bi-cloud-minus"><span className="px-3">Delete transactions</span></i>
                            </Button>
                        </div>
                    </Form>
                </section>
                {!transactionData ? (
                    <h1 className="m-3 p-2">CARGANDO...</h1>
                ) : (
                    <div className="transactions">
                        {transactionData.map((elm, idx) => {
                            let date = new Date(elm.updatedAt)
                            return (
                                <>
                                    <div className="transaction" key={idx}
                                        onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
                                        <div className="left">
                                            <div className="name">{elm.transaction[0].operation}</div>
                                            <div className="description">{elm.transaction[0].description}</div>
                                        </div>
                                        <div className="right">
                                            <div className={elm.transaction[0].price < 0 ? "price" : "priceGreen"}>    {elm.transaction[0].price}
                                                <span className="p-1">
                                                    <i className="bi bi-currency-euro"></i>
                                                </span>
                                            </div>
                                            <div className="datetime">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
                                        </div>
                                        <div className="trashButton">
                                            {transactionId === idx ?
                                                <i className="bi bi-trash3-fill" onClick={deleteTransactionById}
                                                ></i>
                                                : <i className="bi bi-trash3-fill" style={{ color: "transparent" }}></i>
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                )
                }
            </main>
        </>

    )

}

export default Transaction


