import { Container, Alert, Card, Row, Col, Button } from 'react-bootstrap'
import React, { useReducer, useEffect } from "react"
import Connect from "../../connect/Connect"
import Pagination from '../blogs/Pagination'



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

const getCollection = (url, params = { page: 1, perPage: 4, userId : null }) => { // params = { page: 1, perPage: 4 }
    const page = params.page
    const perPage = params.perPage
    const userId = params.userId
    const connect = new Connect(url, "GET", { page: page, perPage: perPage, userId: userId })
    return connect.requestData()
}

const MyList = (props) => {

    const url = props.url
    const data = props.data // rehat!

    console.log(data)

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
            getCollection(url, { page: currentPage, perPage: dataPerPage, userId: data.id }).then(data => {
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
    }, [currentPage, dataPerPage, allPage, url, data.id])

    const load = (targetPage) => {

        getCollection(url, { page: targetPage, perPage: dataPerPage, userId : data.id }).then(data => {
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
        <>
            <Container>
                <Row>
                    <Col md>
                        { loading ?
                            collection.map(result =>
                                <div className='App blogs' key={result.id}>
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
                                            <hr/>
                                            <Card.Text>
                                                { result.content }
                                            </Card.Text>
                                            <Button>Edit</Button>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                </div>
                            ) : <Alert variant="success">Data sedang diproses... </Alert>
                        }
                    </Col>
                    <Col md>
                        <div className='LoginList'>
                            <h1>Hello</h1>
                        </div>
                    </Col>
                </Row>
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
        </>)
    
}

export default MyList