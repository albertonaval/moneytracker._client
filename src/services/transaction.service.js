
import axios from 'axios'


class TransactionService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/transaction`
        })

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = {
                    Authorization: `Bearer ${storedToken}`
                }
            }

            return config
        })
    }

    getTransactionByUser() {
        return this.api.get("/")
    }

    newTransaction(transactionData) {
        return this.api.post("/new", transactionData)
    }

    updateTransaction(id, transactionData) {
        return this.api.put(`/update/${id}`, transactionData)
    }

    deleteTransaction(id) {
        return this.api.delete(`/delete/${id}`)
    }

    deleteAllTransactions(id) {
        return this.api.delete(`/deletemany/${id}`)
    }

}

const transactionServices = new TransactionService()

export default transactionServices
