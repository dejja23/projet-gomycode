import React from 'react';
import { Card, Button, CardTitle, CardText, Badge } from 'reactstrap';

const CardUsers = () => {
  return (
    <Card className='text-center'>
      <CardTitle>
        <i class='fas fa-users'></i>
      </CardTitle>
      <CardText>
        <Badge color='primary' pill>
          5
        </Badge>
        Users
      </CardText>
      <Button>Button</Button>
    </Card>
  );
};

export default CardUsers;
