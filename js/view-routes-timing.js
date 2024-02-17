document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch data and update schedule
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    fetchSchedule(from, to);
});

function fetchSchedule(from, to) {
    // Simulated data for demonstration
    const scheduleData = [
        { Bus: 'BIT Mesra', departure: '11:00 AM', arrival: '12:00 PM' },
        { Bus: 'BIT Mesra', departure: '01:30 AM', arrival: '03:30 PM' }
        // Add more data as needed
    ];

    const scheduleElement = document.getElementById('schedule');
    scheduleElement.innerHTML = ''; // Clear previous results

    // Create table for schedule
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Bus</th>
            <th>Departure</th>
            <th>Arrival</th>
        </tr>
    `;
    scheduleData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Bus}</td>
            <td>${item.departure}</td>
            <td>${item.arrival}</td>
        `;
        table.appendChild(row);
    });
    scheduleElement.appendChild(table);
}
