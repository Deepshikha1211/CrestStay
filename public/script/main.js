 // Initialize Lucide icons
 lucide.createIcons();

 document.addEventListener('DOMContentLoaded', function() {
     // Chart configuration
     const ctx = document.getElementById('guestsChart').getContext('2d');
     const guestsChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
             datasets: [{
                 label: 'Current Period',
                 data: [350, 400, 450, 400, 470, 420, 380],
                 borderColor: '#0EA5E9',
                 backgroundColor: 'rgba(14, 165, 233, 0.1)',
                 tension: 0.4,
                 fill: true
             }, {
                 label: 'Previous Period',
                 data: [320, 380, 420, 380, 430, 400, 360],
                 borderColor: '#E5E7EB',
                 backgroundColor: 'rgba(229, 231, 235, 0.1)',
                 tension: 0.4,
                 fill: true
             }]
         },
         options: {
             responsive: true,
             maintainAspectRatio: false,
             plugins: {
                 legend: {
                     display: false
                 },
                 tooltip: {
                     mode: 'index',
                     intersect: false,
                     backgroundColor: '#fff',
                     titleColor: '#111827',
                     bodyColor: '#6B7280',
                     borderColor: '#E5E7EB',
                     borderWidth: 1,
                     padding: 12,
                     displayColors: false,
                     callbacks: {
                         label: function(context) {
                             return `${context.dataset.label}: ${context.parsed.y} guests`;
                         }
                     }
                 }
             },
             scales: {
                 y: {
                     beginAtZero: true,
                     grid: {
                         drawBorder: false,
                         color: '#E5E7EB'
                     },
                     ticks: {
                         stepSize: 100,
                         padding: 10,
                         color: '#6B7280'
                     }
                 },
                 x: {
                     grid: {
                         display: false
                     },
                     ticks: {
                         padding: 10,
                         color: '#6B7280'
                     }
                 }
             },
             interaction: {
                 intersect: false,
                 mode: 'index'
             }
         }
     });

     // Handle chart period change
     document.getElementById('guestChartPeriod').addEventListener('change', function(e) {
         const period = e.target.value;
         let newData;
         switch(period) {
             case 'weekly':
                 newData = [2450, 2800, 3150, 2800, 3290, 2940, 2660];
                 break;
             case 'monthly':
                 newData = [10500, 12000, 13500, 12000, 14100, 12600, 11400];
                 break;
             default: // daily
                 newData = [350, 400, 450, 400, 470, 420, 380];
         }
         guestsChart.data.datasets[0].data = newData;
         guestsChart.update();
     });

     // Booking data
     const bookings = [
         { id: '00123', name: 'James Lebron', roomType: 'Deluxe', duration: '3 Nights', checkIn: '2024-04-05', checkOut: '2024-04-08', status: 'confirmed' },
         { id: '00124', name: 'Emma Watson', roomType: 'Suite', duration: '5 Nights', checkIn: '2024-04-10', checkOut: '2024-04-15', status: 'pending' },
         { id: '00125', name: 'Tom Hanks', roomType: 'Standard', duration: '2 Nights', checkIn: '2024-04-12', checkOut: '2024-04-14', status: 'confirmed' },
         { id: '00126', name: 'Scarlett Johansson', roomType: 'Deluxe', duration: '4 Nights', checkIn: '2024-04-15', checkOut: '2024-04-19', status: 'cancelled' },
         { id: '00127', name: 'Chris Evans', roomType: 'Suite', duration: '1 Night', checkIn: '2024-04-20', checkOut: '2024-04-21', status: 'confirmed' }
     ];

     // Function to render booking table
     function renderBookingTable(bookings) {
         const tableBody = document.getElementById('bookingTableBody');
         tableBody.innerHTML = '';
         bookings.forEach(booking => {
             const row = `
                 <tr>
                     <td>${booking.id}</td>
                     <td>${booking.name}</td>
                     <td>${booking.roomType}</td>
                     <td>${booking.duration}</td>
                     <td>${booking.checkIn}</td>
                     <td>${booking.checkOut}</td>
                     <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
                     <td>
                         <button class="action-btn edit">
                             <i data-lucide="edit-2"></i>
                         </button>
                         <button class="action-btn delete">
                             <i data-lucide="trash-2"></i>
                         </button>
                     </td>
                 </tr>
             `;
             tableBody.innerHTML += row;
         });
         // Re-initialize Lucide icons for dynamically added content
         lucide.createIcons();
     }

     // Initial render
     renderBookingTable(bookings);

     // Handle booking filters
     document.querySelectorAll('.booking-filters .filter-btn').forEach(btn => {
         btn.addEventListener('click', function() {
             document.querySelector('.booking-filters .filter-btn.active').classList.remove('active');
             this.classList.add('active');
             const filter = this.dataset.filter;
             const filteredBookings = filter === 'all' ? bookings : bookings.filter(booking => booking.status === filter);
             renderBookingTable(filteredBookings);
         });
     });

     // Handle search
     document.getElementById('searchInput').addEventListener('input', function(e) {
         const searchTerm = e.target.value.toLowerCase();
         const filteredBookings = bookings.filter(booking => 
             booking.id.toLowerCase().includes(searchTerm) ||
             booking.name.toLowerCase().includes(searchTerm) ||
             booking.roomType.toLowerCase().includes(searchTerm)
         );
         renderBookingTable(filteredBookings);
     });

     // Handle see all bookings
     document.getElementById('seeAllBookings').addEventListener('click', function() {
         renderBookingTable(bookings);
     });

     // Handle more options buttons
     document.querySelectorAll('.more-options-btn').forEach(btn => {
         btn.addEventListener('click', function() {
             console.log('More options clicked');
         });
     });

     // Handle edit and delete buttons
     document.addEventListener('click', function(e) {
         if (e.target.closest('.action-btn')) {
             const btn = e.target.closest('.action-btn');
             const action = btn.classList.contains('edit') ? 'Edit' : 'Delete';
             const bookingId = btn.closest('tr').querySelector('td:first-child').textContent;
             console.log(`${action} clicked for booking ${bookingId}`);
         }
     });

     // Add functionality to nav items
     document.querySelectorAll('.nav-item').forEach(item => {
         item.addEventListener('click', function() {
             document.querySelector('.nav-item.active').classList.remove('active');
             this.classList.add('active');
             // You can add more functionality here, like changing the main content
         });
     });

     // Add functionality to the notification button
     document.querySelector('.notification-btn').addEventListener('click', function() {
         alert('Notifications clicked');
         // You can replace this with a more sophisticated notification system
     });

     // Add functionality to the see all ratings button
     document.querySelector('.ratings-section .see-all-btn').addEventListener('click', function() {
         alert('See all ratings clicked');
         // You can implement a modal or navigate to a detailed ratings page
     });

     // Make sure all buttons have hover effects
     document.querySelectorAll('button').forEach(button => {
         button.addEventListener('mouseenter', function() {
             this.style.opacity = '0.8';
         });
         button.addEventListener('mouseleave', function() {
             this.style.opacity = '1';
         });
     });
 });

 document.addEventListener('DOMContentLoaded', function() {
     // Booking Platform Donut Chart
     const platformCtx = document.getElementById('platformChart').getContext('2d');
     const platformChart = new Chart(platformCtx, {
         type: 'doughnut',
         data: {
             labels: ['Booking.com', 'Agoda', 'Airbnb', 'Hotels.com', 'TripAdvisor', 'Traveloka'],
             datasets: [{
                 data: [29, 25, 15, 12, 9, 7],
                 backgroundColor: [
                     '#0EA5E9',
                     '#6366F1',
                     '#F59E0B',
                     '#10B981',
                     '#EF4444',
                     '#8B5CF6'
                 ],
                 borderWidth: 0
             }]
         },
         options: {
             responsive: true,
             maintainAspectRatio: false,
             cutout: '70%',
             plugins: {
                 legend: {
                     display: false
                 }
             }
         }
     });
 });

 document.getElementById('logoutBtn').addEventListener('click', function() {
     if (confirm('Are you sure you want to logout?')) {
         window.location.href = '/';
     }
 });

 // Toggle mode functionality
 const toggleModeBtn = document.getElementById('toggleMode');
 toggleModeBtn.addEventListener('click', function() {
     document.body.classList.toggle('dark-mode');
     const icon = this.querySelector('i');
     if (document.body.classList.contains('dark-mode')) {
         icon.setAttribute('data-lucide', 'sun');
     } else {
         icon.setAttribute('data-lucide', 'moon');
     }
     lucide.createIcons();
 });

 window.addEventListener('load', function() {
     setTimeout(function() {
         if (document.querySelectorAll('.lucide:not(:empty)').length === 0) {
             console.log('Icons not loaded, reinitializing...');
             lucide.createIcons();
         }
     }, 1000);
 });