import React, { useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Card, Form, Navbar, Nav, Row, Col } from 'react-bootstrap'
import Connect from '../connect/Connect'



const TYPE = {
    FIELD: 'field',
    PAGE : 'page'
}

const signUpReduce = (state, action) => {
    switch (action.type) {
        case TYPE.FIELD:
            return {
                ...state,
                [action.fieldName] : action.payload
            }
        case TYPE.PAGE:
            return {
                ...state,
                isEmpty : false,
                resData : action.payload
            }
        default:
            return state
    }
}

const Signup = () => {
    
    const [state, dispatch] = useReducer(signUpReduce, {
        username: '',
        email: '',
        password1: '',
        password2: ''
    })

    const history = useHistory()

    const inputUser = (e) => {
        dispatch({
            type: TYPE.FIELD,
            fieldName: e.target.name,
            payload : e.target.value
        })
    }


    // get result from API
    const resultHandler = (data) => {
        data.type === 'cors' ?
            data.json().then(result => {
                result = result.message
                alert(result)
            }) : history.push({ pathname: '/home', state : data })
    }


    const getInput = async () => {
        if (state.username === '' || state.email === '' || state.password1 === '' || state.password2 === '' ) {
            alert ('Data tidak boleh kosong!')
        } else if (state.password1 !== state.password2) {
            alert('Password tidak sama!')
        } else {
            const data = keyChanger(state)
            const connect = new Connect(`http://localhost:5000/signup`, 'POST', data)
            const res = await connect.requestData()
            resultHandler(res)
        }
    }

    const keyChanger = (data) => {
        const renameKey = (object, key, newKey) => {
            const clone = object => Object.assign({}, object);
            const cloneObj = clone(object)
            const targetKey = cloneObj[key]
            delete cloneObj[key]
            cloneObj[newKey] = targetKey
            return cloneObj
        }
        data = renameKey(data, 'password1', 'password')
        data = renameKey(data, 'password2', 'password')
        return data
    }

    return (
        <>
            <div className='navbar-top'>    
                <Navbar bg="primary" variant="dark" className="p-2" >
                    <Navbar.Brand href="/" > SimpleBlog </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login" >Login</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
            <Container>
                <Row>
                    <Card className="App Signup">
                        <Form>
                            <Col md>
                                <Form.Group controlId="formText">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" onChange={inputUser} name='username' />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@gmail.com" onChange={inputUser} name='email' />
                                    <Form.Text className="text-muted">
                                    Gmail only
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group controlId="formPassword1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Type your password" onChange={inputUser} name='password1' />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group controlId="formPassword2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Re-type your password" onChange={inputUser} name='password2' />
                                </Form.Group>    
                                <br/>
                            </Col>
                            <Button varian="primary" onClick={getInput}>Signup</Button>
                            <br/><br/>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    ) 
}

export default Signup


