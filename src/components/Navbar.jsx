import { useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import './Navbar.css';

function Navbar({ grouping, ordering, onDisplayChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupingChange = (e) => {
    onDisplayChange(e.target.value, ordering);
  };

  const handleOrderingChange = (e) => {
    onDisplayChange(grouping, e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <FiSliders />
        <span>Display</span>
        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select value={ordering} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;