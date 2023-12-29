import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../customHooks/useAuth';

export default function SignUpPage() {
  const { signUpHandler } = useAuth();

  return (
    <Row>
      <Col className="mt-5">
        <Form onSubmit={signUpHandler}>
          <h2 className="text-center">Зарегистрироваться</h2>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="enter your name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="enter email name@example.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" placeholder="city" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name="age" placeholder="age" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" name="filename" placeholder="avatar" required />
          </Form.Group>
          <Button type="submit" variant="primary">
            Зарегистрироваться
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
