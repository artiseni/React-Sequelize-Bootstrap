import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Card, Form, Row, Col} from 'react-bootstrap'
import Connect from '../connect/Connect'

const Login = () => {

    const [getData, setData] = useState({
        email: '',
        password : ''
    })

    const history = useHistory()

    const getText = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData({ ...getData, [name]: value })
        
    }

    // get result from API
    const resultHandler = (data) => {
        data.type === 'cors' ?
            data.json().then(result => {
                result = result.message
                alert(result)
            }) : history.push({ pathname: '/home', state : data })
    }

    const login = async () => {
        if (getData.email === '' || getData.password === '') {
            alert('Data tidak boleh kosong')
        } else {
            const connect = new Connect(`http://localhost:5000/login`, 'POST', getData)
            const res = await connect.requestData()
            resultHandler(res)
        }
    }

    return (
        <Container>
            <Row>
                <Card>
                    <Form>
                        <Col md>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={ e => getText(e)} placeholder="example@email.com" />
                            <Form.Text className="text-muted">
                            We'll share your email. Hahaha
                            </Form.Text>
                        </Form.Group>
                        </Col>
                        <Col md>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={ e => getText(e)} placeholder="Type your password" />
                        </Form.Group>
                        <br/>
                        </Col>
                        <Button varian="primary" onClick={login}>Login</Button>
                        <br/><br/>
                    </Form>
                </Card>
            </Row>
        </Container>
    )
}

export default Login


