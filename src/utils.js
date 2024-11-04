export const PRIORITY_MAP = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

export const STATUS_ICONS = {
  'Todo': '🔵',
  'In progress': '🟡',
  'Backlog': '⭕',
  'Done': '✅',
  'Canceled': '❌'
};

export const PRIORITY_ICONS = {
  4: '🔴',
  3: '🟡',
  2: '🟢',
  1: '⚪',
  0: '⚫'
};

export const groupTickets = (tickets, users, grouping) => {
  switch (grouping) {
    case 'status':
      return tickets.reduce((acc, ticket) => {
        if (!acc[ticket.status]) {
          acc[ticket.status] = [];
        }
        acc[ticket.status].push({
          ...ticket,
          userName: users.find(u => u.id === ticket.userId)?.name || 'Unassigned'
        });
        return acc;
      }, {});

    case 'user':
      const userGroups = users.reduce((acc, user) => {
        acc[user.name] = [];
        return acc;
      }, {'Unassigned': []});

      return tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        acc[userName].push({
          ...ticket,
          userName
        });
        return acc;
      }, userGroups);

    case 'priority':
      const priorityGroups = Object.values(PRIORITY_MAP).reduce((acc, priority) => {
        acc[priority] = [];
        return acc;
      }, {});

      return tickets.reduce((acc, ticket) => {
        const priority = PRIORITY_MAP[ticket.priority];
        acc[priority].push({
          ...ticket,
          userName: users.find(u => u.id === ticket.userId)?.name || 'Unassigned'
        });
        return acc;
      }, priorityGroups);

    default:
      return {};
  }
};

export const sortTickets = (tickets, ordering) => {
  return [...tickets].sort((a, b) => {
    if (ordering === 'priority') {
      return b.priority - a.priority;
    }
    return a.title.localeCompare(b.title);
  });
};