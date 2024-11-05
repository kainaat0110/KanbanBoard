// const fetchTickets = async () => {
//     try {
//       const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment '); 
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Fetched data from API:', data);
//       return data.tickets || []; 
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       return []; 
//     }
//   };
  
  // export default fetchTickets; 
  export const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return {
        tickets: data.tickets || [],
        users: data.users || []
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { tickets: [], users: [] };
    }
  };
  export default fetchData;