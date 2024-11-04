import { useMemo } from 'react';
import Column from './Column';
import { groupTickets, sortTickets } from '../utils';
import './Board.css';

function Board({ tickets, users, grouping, ordering }) {
  const groupedAndSortedTickets = useMemo(() => {
    const grouped = groupTickets(tickets, users, grouping);
    return Object.entries(grouped).map(([key, tickets]) => ({
      title: key,
      tickets: sortTickets(tickets, ordering)
    }));
  }, [tickets, users, grouping, ordering]);

  return (
    <div className="board">
      {groupedAndSortedTickets.map(({ title, tickets }) => (
        <Column key={title} title={title} tickets={tickets} />
      ))}
    </div>
  );
}

export default Board;