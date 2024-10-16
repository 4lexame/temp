import React from 'react';
import { Card } from 'react-bootstrap';

export default function UserListCard() {
  return (
    <Card  className="m-0" style={{ width: '360px' }}>
        <Card.Body>
            <Card.Text>{fullName}</Card.Text>
            <Card.Text>{userName}</Card.Text>
        </Card.Body>
    </Card>
  )
}
