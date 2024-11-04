import './TicketCard.css';

function TicketCard({ ticket, groupBy }) {
  const priorityLabels = {
    4: '⚡ Urgent',
    3: '🔴 High',
    2: '🟡 Medium',
    1: '🔵 Low',
    0: '⚪ No Priority'
  };

  const statusIcons = {
    'Backlog': '⭕',
    'Todo': '📋',
    'In Progress': '⏳',
    'Done': '✅',
    'Canceled': '❌'
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {groupBy !== 'user' && (
          <div className="user-avatar">
            {ticket.userName?.[0] || '?'}
            <span className={`status-dot ${ticket.available ? 'available' : ''}`} />
          </div>
        )}
      </div>
      
      <div className="ticket-title">
        {groupBy !== 'status' && (
          <span className="status-icon">{statusIcons[ticket.status]}</span>
        )}
        <p>{ticket.title}</p>
      </div>
      
      <div className="ticket-footer">
        {groupBy !== 'priority' && (
          <div className="priority-tag">
            {priorityLabels[ticket.priority]}
          </div>
        )}
        {ticket.tag.map((tag, index) => (
          <div key={index} className="tag">
            <span className="tag-dot">●</span>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCard;