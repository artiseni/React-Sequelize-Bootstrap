import { Container, Alert, Card } from 'react-bootstrap'
import React, { useReducer, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Connect from "../../connect/Connect"
import Pagination from './Pagination'

const getCollection = (params = { page: 1, perPage: 4 }) => { // params = { page: 1, perPage: 4 }
    const url = 'http://localhost:5000/blogs'
    const page = params.page
    const perPage = params.perPage
    const connect = new Connect(url, "GET", { page: page, perPage: perPage })
    return connect.requestData()
}

const funReducer = (state, action) => {
    switch (action.type) {
        case 'info':
            return {
                ...state,
                collection: action.collection,
                loading: action.loading,
                firstPage: action.firstPage,
                lastPage: action.lastPage,
                currentPage: action.currentPage,
                dataPerPage: action.dataPerPage,
                allPage: action.allPage
            }
        default:
            return state
    }
}

const List = () => {

    const [reducePage, reduce] = useReducer(funReducer, {
        collection: [],
        loading: false,
        lastPage: false,
        firstPage: false,
        currentPage: 1,
        dataPerPage: 4,
        allPage: 0
    })
    
    const { collection, loading, lastPage, firstPage, currentPage, dataPerPage, allPage } = reducePage

    useEffect(() => {
        const fetchApi = () => {
            getCollection({ page: currentPage, perPage: dataPerPage }).then(data => {
                reduce({
                    type: 'info',
                    loading: true,
                    collection : data.rows,
                    currentPage: currentPage,
                    firstPage: (currentPage === 1),
                    dataPerPage : dataPerPage,
                    allPage : Math.ceil(data.count/dataPerPage),
                    lastPage : (currentPage === allPage)
                })
            })
        }
        fetchApi()
    }, [currentPage, dataPerPage, allPage])

    const load = (targetPage) => {

        getCollection({ page: targetPage, perPage: dataPerPage }).then(data => {
            reduce({
                type: 'info',
                loading: true,
                collection : data.rows,
                currentPage: targetPage,
                firstPage: (currentPage === 1),
                dataPerPage : dataPerPage,
                allPage : Math.ceil(data.count/dataPerPage),
                lastPage : (targetPage === allPage)
            })
        })
    }

    return (
            <Container>
                <h1>Hello</h1>
                { loading ?
                    collection.map(result =>
                        <div className='App' key={result.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        By : { result.user.username }
                                    </Card.Text>
                                    <Card.Text>
                                        Last update : { result.updatedAt }
                                    </Card.Text>
                                    <Card.Title>
                                        { result.title }
                                    </Card.Title>
                                    <Card.Text>
                                        { result.content }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br/>
                        </div>
                    ) : <Alert variant="success">Data sedang diproses... </Alert>
                }
                <Pagination totalPage={allPage} perPage={dataPerPage} load={load} firstPage={firstPage} lastPage={lastPage} page={ currentPage }/>

            </Container>
        )
    
}

export default List