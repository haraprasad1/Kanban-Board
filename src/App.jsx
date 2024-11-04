import { useState, useEffect } from 'react';
import DisplayMenu from './components/DisplayMenu';
import TicketColumn from './components/TicketColumn';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  const handleDisplayChange = (newGrouping, newOrdering) => {
    setGrouping(newGrouping);
    setOrdering(newOrdering);
  };

  const groupAndSortTickets = () => {
    const enrichedTickets = tickets.map(ticket => ({
      ...ticket,
      userName: users.find(u => u.id === ticket.userId)?.name,
      available: users.find(u => u.id === ticket.userId)?.available
    }));

    let grouped = {};
    switch (grouping) {
      case 'status':
        grouped = enrichedTickets.reduce((acc, ticket) => {
          if (!acc[ticket.status]) acc[ticket.status] = [];
          acc[ticket.status].push(ticket);
          return acc;
        }, {});
        break;
      case 'user':
        grouped = enrichedTickets.reduce((acc, ticket) => {
          const userName = ticket.userName || 'Unassigned';
          if (!acc[userName]) acc[userName] = [];
          acc[userName].push(ticket);
          return acc;
        }, {});
        break;
      case 'priority':
        const priorityMap = {
          4: 'Urgent',
          3: 'High',
          2: 'Medium',
          1: 'Low',
          0: 'No Priority'
        };
        grouped = enrichedTickets.reduce((acc, ticket) => {
          const priority = priorityMap[ticket.priority];
          if (!acc[priority]) acc[priority] = [];
          acc[priority].push(ticket);
          return acc;
        }, {});
        break;
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  };

  const groupedTickets = groupAndSortTickets();

  return (
    <div className="app">
      <nav className="navbar">
        <DisplayMenu 
          grouping={grouping}
          ordering={ordering}
          onDisplayChange={handleDisplayChange}
        />
      </nav>
      <main className="board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <TicketColumn
            key={group}
            title={group}
            tickets={tickets}
            groupBy={grouping}
          />
        ))}
      </main>
    </div>
  );
}

export default App;