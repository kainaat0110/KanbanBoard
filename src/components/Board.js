// src/components/Board.js
import React from 'react';
import './Board.css'; // Ensure you have a CSS file for styling
import TicketCard from './TicketCard'; // Assuming you still want to use TicketCard for ticket details

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const Board = ({ tickets, groupBy, sortBy }) => {
  // Function to group tickets by the specified criteria
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const key = ticket[groupBy] || 'Uncategorized';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([key, group]) => (
        <div key={key} className="group">
          <h2>{priorityLabels[key] || key}</h2> {/* Use the priority label for headers */}
          <div className="tickets">
            {group.map((ticket) => {
              const priorityLabel = priorityLabels[ticket.priority] || 'Unknown'; // Get the priority label
              return (
                <div key={ticket.id} className="ticket-card">
                  <TicketCard ticket={ticket} /> {/* Display other ticket details */}
                  <p className="priority">Priority: {priorityLabel}</p> {/* Display priority label */}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
