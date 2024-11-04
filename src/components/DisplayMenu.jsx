import { useState, useRef, useEffect } from 'react';
import './DisplayMenu.css';

function DisplayMenu({ grouping, ordering, onDisplayChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="display-menu" ref={menuRef}>
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="icon">☰</span>
        Display
        <span className="arrow">▼</span>
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-item">
            <label>Grouping</label>
            <select 
              value={grouping} 
              onChange={(e) => onDisplayChange(e.target.value, ordering)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="menu-item">
            <label>Ordering</label>
            <select 
              value={ordering} 
              onChange={(e) => onDisplayChange(grouping, e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayMenu;