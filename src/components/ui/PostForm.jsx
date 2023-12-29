import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGrop from 'react-bootstrap/InputGroup';

export default function PostForm({ postSubmitHandler }) {
  return (
    <Form onSubmit={postSubmitHandler} className="mt-1">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>You message</Form.Label>
        <InputGrop>
          <Form.Control
            type="text"
            name="text"
            placeholder="you text here"
            aria-describedby="basic-addon1"
          />
          <Button variant="primary" id="button-addon1" type="submit">
            send
          </Button>
        </InputGrop>
      </Form.Group>
    </Form>
  );
}
