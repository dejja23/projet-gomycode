import React from 'react';
import CardUsers from './CardUsers';
import { Row, Col } from 'reactstrap';

const Cards = () => {
  return (
    <Row>
      <Col>
        <CardUsers />
      </Col>
      <Col>
        <CardUsers />
      </Col>
      <Col>
        <CardUsers />
      </Col>
    </Row>
  );
};

export default Cards;
