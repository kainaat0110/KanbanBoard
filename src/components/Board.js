

// Update Board.js with user grouping logic:
import React from 'react';
import '../css/Board.css';
import TicketCard from './TicketCard';
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
import add from '../icons/add.svg';
import dotMenu from '../icons/3 dot menu.svg';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const statusCategories = {
  'Backlog': 'Backlog',
  'Todo': 'Todo',
  'In progress': 'In progress',
  'Done': 'Done',
  'Cancelled': 'Cancelled'
};

const priorityIcons = {
  Todo: ToDo,
  'In progress': inProgress,
  Done: done,
  Backlog: backlog,
  Cancelled: cancelled,
  1: lowPriority,
  2: mediumPriority,
  3: highPriority,
  4: urgent,
  0: noPriority,
};

const priorityOrder = [ '4', '3', '2', '1', '0'];

const Board = ({ tickets, users, groupBy, sortBy }) => {
  const groupedTickets = tickets.reduce((acc, ticket) => {
    let key;
    if (groupBy === 'user') {
      // Find the user for this ticket
      const user = users.find(u => u.id === ticket.userId);
      key = user ? user.name : 'Unassigned';
    } else {
      key = ticket[groupBy]?.toString() || 'Uncategorized';
    }
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});

  const getCategories = () => {
    if (groupBy === 'status') {
      return Object.keys(statusCategories).reduce((acc, status) => {
        acc[status] = groupedTickets[status] || [];
        return acc;
      }, {});
    } else if (groupBy === 'user') {
      // Create groups for all users, even if they have no tickets
      return users.reduce((acc, user) => {
        acc[user.name] = groupedTickets[user.name] || [];
        return acc;
      }, {});
    }
    return groupedTickets;
  };

  const finalGroupedTickets = getCategories();

  const getSortedGroups = () => {
    const groups = Object.entries(finalGroupedTickets);
    
    if (groupBy === 'priority') {
      return groups.sort(([keyA], [keyB]) => {
        const indexA = priorityOrder.indexOf(keyA);
        const indexB = priorityOrder.indexOf(keyB);
        return indexA - indexB;
      });
    }
    
    if (groupBy === 'status') {
      return Object.entries(statusCategories).map(([status]) => [
        status,
        finalGroupedTickets[status] || []
      ]);
    }

    if (groupBy === 'user') {
      // Sort users by availability and then alphabetically
      return groups.sort(([nameA], [nameB]) => {
        const userA = users.find(u => u.name === nameA);
        const userB = users.find(u => u.name === nameB);
        if (userA?.available !== userB?.available) {
          return userB?.available ? 1 : -1;
        }
        return nameA.localeCompare(nameB);
      });
    }
    
    return groups.sort(([a], [b]) => a.localeCompare(b));
  };

  const sortedGroups = getSortedGroups();

  const getUserAvailabilityIcon = (userName) => {
    const user = users.find(u => u.name === userName);
    return (
      <div
        className={`availability-indicator ${user?.available ? 'available' : 'unavailable'}`}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: user?.available ? '#44B700' : '#grey',
          marginRight: '8px'
        }}
      />
    );
  };

  return (
    <div className="board">
      {sortedGroups.map(([key, group]) => (
        <div key={key} className="group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {groupBy === 'user' ? (
                <>
                  {getUserAvailabilityIcon(key)}
                  <h2>{key}</h2>
                </>
              ) : (
                <>
                  <img src={priorityIcons[key]} alt={priorityLabels[key] || key} />
                  <h2>{priorityLabels[key] || key}</h2>
                </>
              )}
              <span className="ticket-count">{group.length}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <img src={add} height={20} width={20} alt="add" />
              <img src={dotMenu} height={20} width={20} alt="menu" />
            </div>
          </div>

          <div className="tickets">
            {group.map((ticket) => (
              <div key={ticket.id}>
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;