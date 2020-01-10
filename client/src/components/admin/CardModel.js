import React from 'react';
import { Card, Button, CardTitle, CardText, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const CardModel = props => {
  return (
    <Card
      className='text-center m-auto shadow card-model'
      style={{ width: '20vw', minWidth: '200px' }}
    >
      <CardTitle>
        <i class={`fas fa-${props.icon} fa-5x card-model-icon`}></i>
      </CardTitle>
      <CardText>
        <Badge className='m-2 p-3 card-model-badge' pill>
          {props.nbre}
        </Badge>
        <span className='m-2 card-model-text'>{props.who}</span>
      </CardText>

      <Link to={props.to} className='text-white text-decoration-none w-100'>
        <Button className='card-model-button w-100'>go to {props.who}</Button>
      </Link>
    </Card>
  );
};

export default CardModel;
