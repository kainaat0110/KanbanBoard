import React from 'react';
import './TicketCard.css'; 

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned User: {ticket.user}</p>
    </div>
  );
};

export default TicketCard;
