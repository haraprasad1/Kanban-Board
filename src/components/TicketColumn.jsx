import TicketCard from './TicketCard';
import './TicketColumn.css';

function TicketColumn({ title, tickets, groupBy }) {
  const getIcon = () => {
    switch (groupBy) {
      case 'status':
        return {
          'Backlog': '⭕',
          'Todo': '📋',
          'In Progress': '⏳',
          'Done': '✅',
          'Canceled': '❌'
        }[title] || '📋';
      case 'priority':
        return {
          'Urgent': '⚡',
          'High': '🔴',
          'Medium': '🟡',
          'Low': '🔵',
          'No Priority': '⚪'
        }[title] || '⚪';
      default:
        return '👤';
    }
  };

  return (
    <div className="ticket-column">
      <div className="column-header">
        <div className="header-left">
          <span className="column-icon">{getIcon()}</span>
          <h3>{title}</h3>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-actions">
          <button className="action-button">+</button>
          <button className="action-button">⋯</button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket} 
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
}

export default TicketColumn;