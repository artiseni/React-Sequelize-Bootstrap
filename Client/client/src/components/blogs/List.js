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
                loading: action.loading,
                collection: action.collection,
                currentPage: action.currentPage,
                dataPerPage: action.dataPerPage,
                firstPage: action.firstPage,
                lastPage: action.lastPage,
                previous: action.previous,
                next: action.next,
                allPage: action.allPage
            }
        default:
            return state
    }
}

const List = () => {

    const [reducePage, reduce] = useReducer(funReducer, {
        loading: false,
        collection: [],
        currentPage: 1,
        dataPerPage: 4,
        firstPage: false,
        lastPage: false,
        previous: true,
        next: true,
        allPage: 0
    })
    
    const {
        collection,
        loading,
        lastPage,
        firstPage,
        currentPage,
        dataPerPage,
        allPage,
        previous,
        next
    } = reducePage

    useEffect(() => {
        const fetchApi = () => {
            getCollection({ page: currentPage, perPage: dataPerPage }).then(data => {
                reduce({
                    type: 'info',
                    loading: true,
                    collection : data.rows,
                    currentPage: currentPage,
                    dataPerPage : dataPerPage,
                    firstPage: (currentPage === 1),
                    lastPage: (currentPage === allPage),
                    previous: (currentPage === 1),
                    next: (currentPage === allPage),
                    allPage : Math.ceil(data.count/dataPerPage)
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
                dataPerPage : dataPerPage,
                firstPage: (currentPage === 1),
                lastPage: (targetPage === allPage),
                previous: (targetPage === 1),
                next: (targetPage === allPage),
                allPage : Math.ceil(data.count/dataPerPage)
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
                
                <Pagination
                    totalPage={allPage}
                    perPage={dataPerPage}
                    load={load}
                    currentPage={currentPage}
                    firstPage={firstPage}
                    lastPage={lastPage}
                    page={currentPage}
                    previous={previous}
                    next={next}
                />

            </Container>
        )
    
}

export default List