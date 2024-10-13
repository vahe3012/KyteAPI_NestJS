// Fetch data using callbacks
// function fetchWithCallback(url, callback) {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) throw new Error('Network response was not ok');
//       return response.json();
//     })
//     .then((data) => callback(null, data))
//     .catch((error) => callback(error));
// }
//
// document
//   .getElementById('user-form')
//   .addEventListener('submit', function (event) {
//     event.preventDefault();
//
//     const userId = document.getElementById('userId').value;
//     const userDataDiv = document.getElementById('user-data');
//     userDataDiv.innerHTML = ''; // Clear previous results
//
//     // Fetch user, bookings, and flights data using callback
//     fetchWithCallback(`/api/user/${userId}`, (error, data) => {
//       if (error) {
//         userDataDiv.innerHTML = `<p class="error">${error.message}</p>`;
//         return;
//       }
//
//       // Display user data
//       userDataDiv.innerHTML = `
//       <h2>User Information</h2>
//       <p><strong>Name:</strong> ${data.user.name}</p>
//       <p><strong>Email:</strong> ${data.user.email}</p>
//       <p><strong>Phone:</strong> ${data.user.phone}</p>
//
//       <h3>Bookings</h3>
//       <ul>
//         ${data.bookings
//           .map(
//             (booking) => `
//           <li>
//             <strong>Booking ID:</strong> ${booking.id},
//             <strong>Status:</strong> ${booking.status},
//             <strong>Booking Date:</strong> ${new Date(booking.booking_date).toLocaleDateString()}
//           </li>`,
//           )
//           .join('')}
//       </ul>
//
//       <h3>Flights</h3>
//       <ul>
//         ${data.flights
//           .map(
//             (flight) => `
//           <li>
//             <strong>Flight Number:</strong> ${flight.flight_number},
//             <strong>Departure:</strong> ${flight.departure_airport} at ${new Date(flight.departure_time).toLocaleString()},
//             <strong>Arrival:</strong> ${flight.arrival_airport} at ${new Date(flight.arrival_time).toLocaleString()},
//             <strong>Price:</strong> $${flight.price}
//           </li>`,
//           )
//           .join('')}
//       </ul>
//     `;
//     });
//   });

// Fetch data using Promises
document
  .getElementById('user-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const userDataDiv = document.getElementById('user-data');
    userDataDiv.innerHTML = ''; // Clear previous results

    fetch(`/api/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found or an error occurred');
        }
        return response.json();
      })
      .then((data) => {
        userDataDiv.innerHTML = `
        <h2>User Information</h2>
        <p><strong>Name:</strong> ${data.user.name}</p>
        <p><strong>Email:</strong> ${data.user.email}</p>
        <p><strong>Phone:</strong> ${data.user.phone}</p>

        <h3>Bookings</h3>
        <ul>
          ${data.bookings
            .map(
              (booking) => `
            <li>
              <strong>Booking ID:</strong> ${booking.id}, 
              <strong>Status:</strong> ${booking.status}, 
              <strong>Booking Date:</strong> ${new Date(booking.booking_date).toLocaleDateString()}
            </li>`,
            )
            .join('')}
        </ul>

        <h3>Flights</h3>
        <ul>
          ${data.flights
            .map(
              (flight) => `
            <li>
              <strong>Flight Number:</strong> ${flight.flight_number}, 
              <strong>Departure:</strong> ${flight.departure_airport} at ${new Date(flight.departure_time).toLocaleString()},
              <strong>Arrival:</strong> ${flight.arrival_airport} at ${new Date(flight.arrival_time).toLocaleString()},
              <strong>Price:</strong> $${flight.price}
            </li>`,
            )
            .join('')}
        </ul>
      `;
      })
      .catch((error) => {
        userDataDiv.innerHTML = `<p class="error">${error.message}</p>`;
      });
  });
