import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PostItem from './PostItem';

export default function PostsPart({ allMessages, deletePostHandler, user }) {
  return (
    <Col sm={12} md={10} style={{ overflow: 'hidden' }} className="flex-1">
      <Row>
        {allMessages.map((message) => (
          <PostItem
            key={message.id}
            message={message}
            deletePostHandler={deletePostHandler}
            user={user}
          />
        ))}
      </Row>
    </Col>
  );
}
