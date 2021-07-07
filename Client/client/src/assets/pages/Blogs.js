import React, {useState, useEffect} from 'react'
import { Container, Card, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Connect from '../../connect/Connect'

const url = 'http://localhost:5000/blogs'

const Blog = () => {
    
    const [state, setState] = useState([])
    
    useEffect(() => {

        const connect = new Connect(url, 'POST')

        async function fetchData () {
            const data = await connect.postData()
            setState(data)
        }
        fetchData()
    }, [])

    if (state.length !== 0) {
        // console.log(state)
        return (
            <Container>
                <h1>Hello</h1>
                {
                    state.map(result =>
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
                    )
                }
            </Container>
        )
    } else {
        return (
            <Alert variant="success">Data sedang diproses... </Alert>
        )
    }
    
}

export default Blog