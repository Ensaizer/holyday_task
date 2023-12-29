import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../customHooks/useAuth';

export default function LoginPage() {
  const { signInHandler } = useAuth();
  return (
    <Row>
      <Col className="mt-5">
        <h2 className="text-center">Войти</h2>
        <Form onSubmit={signInHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password" />
          </Form.Group>
          <Button type="submit" variant="primary">
            Войти
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
