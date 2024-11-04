import { STATUS_ICONS, PRIORITY_ICONS } from '../utils';
import Card from './Card';
import './Column.css';

function Column({ title, tickets, grouping }) {
  const getIcon = () => {
    if (grouping === 'status') return STATUS_ICONS[title] || '📋';
    if (grouping === 'priority') return PRIORITY_ICONS[
      Object.entries(PRIORITY_MAP).find(([_, value]) => value === title)?.[0]
    ] || '📋';
    return '👤';
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          {getIcon()}
          <h2>{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-right">
          <button className="add-button">+</button>
          <button className="options-button">⋯</button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Column;