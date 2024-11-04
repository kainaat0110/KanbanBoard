import React from 'react';
import '../css/TicketCard.css'; 
import ToDo from '../icons/To-do.svg';
import inProgress from '../icons/in-progress.svg';
import backlog from '../icons/Backlog.svg';
import done from '../icons/Done.svg';
import cancelled from '../icons/Cancelled.svg';
import noPriority from '../icons/No-priority.svg';
import lowPriority from '../icons/Img - Low Priority.svg';
import mediumPriority from '../icons/Img - Medium Priority.svg';
import highPriority from '../icons/Img - High Priority.svg';
import urgent from '../icons/SVG - Urgent Priority colour.svg';

const priorityIcons = {
  Todo: ToDo,                 // Icon for "To Do"
  'In progress': inProgress,  // Icon for "In Progress"
  Done: done,                 // Icon for "Completed"
  Backlog: backlog,           // Icon for "Backlog"
  Cancelled: cancelled,
  1: lowPriority,
  2: mediumPriority,
  3: highPriority,
  4: urgent,
  0: noPriority,        // Icon for "Cancelled"
};

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h4 style={{ color: 'grey' }}>{ticket.id}</h4>
      <h3>{ticket.title}</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={priorityIcons[ticket.priority]} alt={ticket.tag} style={{ width: '15px', height: '15px', marginRight: '8px', border: '1px solid #ddd', padding: '4px', borderRadius: '3px' }} />
        <p style={{ border: '1px solid #ddd', padding: '4px', borderRadius: '3px' }}>
          {ticket.tag}
        </p>

      </div>
    </div>
  );
};

export default TicketCard;
