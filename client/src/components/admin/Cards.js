import React from 'react';
import CardModel from './CardModel';
import { Container, Row, Col } from 'reactstrap';

const Cards = props => {
  return (
    <Container className='d-flex justify-content-sm-center'>
      <Row>
        <Col className='m-3'>
          <CardModel
            icon={'users'}
            who={'Users'}
            nbre={props.users.length - 1}
            to={'/admin'}
          />
        </Col>
        <Col className='m-3'>
          <CardModel
            icon={'ad'}
            who={'ads'}
            nbre={props.ads.length}
            to={'/admin/ads'}
          />
        </Col>
        <Col className='m-3'>
          <CardModel
            icon={'car-alt'}
            who={'Categories'}
            nbre={props.categories.length}
            to={'/admin/categories'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
