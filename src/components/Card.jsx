import { STATUS_ICONS, PRIORITY_ICONS } from '../utils';
import './Card.css';

function Card({ ticket }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-info">
          <div className="avatar">
            {ticket.userName?.[0] || '?'}
            <span className="status-indicator"></span>
          </div>
        </div>
      </div>
      <div className="card-title">
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-footer">
        <div className="priority-tag">
          {PRIORITY_ICONS[ticket.priority]}
        </div>
        {ticket.tag.map((tag, index) => (
          <div key={index} className="feature-tag">
            <span>○</span>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;