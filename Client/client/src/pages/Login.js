import { Button, Container, Card, Form, Row, Col} from 'react-bootstrap'



const Login = () => {

    return (
        <Container>
            <Row>
                <Card>
                    <Form>
                        <Col md>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" />
                            <Form.Text className="text-muted">
                            We'll share your email. Hahaha
                            </Form.Text>
                        </Form.Group>
                        </Col>
                        <Col md>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Type your password" />
                        </Form.Group>
                        <br/>
                        </Col>
                        <Button varian="primary">Login</Button>
                        <br/><br/>
                    </Form>
                </Card>
            </Row>
        </Container>
    )
}

export default Login


