import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PostItem from './PostItem';

export default function PostsPart({ allPosts, deletePostHandler, user }) {
  return (
    <Col sm={12} md={10} style={{ overflow: 'hidden' }} className="flex-1">
      <Row>
        {allPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            deletePostHandler={deletePostHandler}
            user={user}
          />
        ))}
      </Row>
    </Col>
  );
}
