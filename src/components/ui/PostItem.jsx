import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import locale from 'date-fns/locale/ru';
import { motion } from 'framer-motion';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Image from 'react-bootstrap/Image';
import { fadeInOut } from '../../utils';

export default function PostItem({ message, deletePostHandler, user }) {
  const createdDate = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale });
  return (
    <Col xs={12} className="mb-4">
      <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeInOut}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <span style={{ color: 'GrayText' }}>
              {' '}
              {message.User.id === user.id ? 'Вы' : message.User.name}
            </span>
            <span>{createdDate}</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={2} className="d-none d-md-block">
                <Image
                  src={`/avatars/${message.User.avatar}`}
                  width="100px"
                  rounded
                  style={{ objectFit: 'cover' }}
                />
              </Col>
              <Col md={10}>
                <blockquote className="blockquote mb-0">
                  <p> {message.text} </p>
                </blockquote>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                {user && user.id === message.userId && (
                  <Button
                    variant="danger"
                    className="ml-auto"
                    size="sm"
                    onClick={() => deletePostHandler(message.id)}
                  >
                    Удалить
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
}
