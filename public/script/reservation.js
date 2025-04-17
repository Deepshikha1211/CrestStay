document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const roomList = document.getElementById('roomList');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const confirmButton = document.getElementById('confirmReservation');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const modalContent = document.getElementById('modalContent');

    lucide.createIcons();

    // Initialize Flatpickr
    flatpickr("#dateRange", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.setAttribute('data-lucide', document.body.classList.contains('dark-mode') ? 'sun' : 'moon');
        lucide.createIcons();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const dateRange = document.getElementById('dateRange').value;
        const guests = parseInt(document.getElementById('guests').value);
        const roomType = document.getElementById('roomType').value.toLowerCase();

        const availableRooms = [
            { 
                type: 'Standard Room', 
                price: 100, 
                image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', 
                features: ['1 Queen Bed', 'Free Wi-Fi', 'TV', 'Air Conditioning'],
                capacity: 2
            },
            { 
                type: 'Deluxe Room', 
                price: 150, 
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', 
                features: ['1 King Bed', 'Free Wi-Fi', 'TV', 'Mini Bar', 'City View'],
                capacity: 3
            },
            { 
                type: 'Suite', 
                price: 200, 
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', 
                features: ['1 King Bed', 'Living Room', 'Jacuzzi', 'Free Wi-Fi', 'TV', 'Kitchenette'],
                capacity: 4
            }
        ];

        roomList.innerHTML = '';
        const filteredRooms = availableRooms.filter(room => 
            room.capacity >= guests && 
            (roomType === '' || room.type.toLowerCase().includes(roomType))
        );

        if (filteredRooms.length === 0) {
            roomList.innerHTML = '<p>No rooms available matching your criteria.</p>';
        } else {
            filteredRooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                roomCard.innerHTML = `
                    <img src="${room.image}" alt="${room.type}" class="room-image">
                    <div class="room-details">
                        <div class="room-type">${room.type}</div>
                        <div class="room-price">$${room.price} per night</div>
                        <div class="room-features">
                            <ul>
                                ${room.features.map(feature => `<li><i data-lucide="check-circle"></i>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="select-room" data-type="${room.type}" data-price="${room.price}">
                            <i data-lucide="check"></i>
                            Select
                        </button>
                    </div>
                `;
                roomList.appendChild(roomCard);
            });

            document.querySelectorAll('.select-room').forEach(button => {
                button.addEventListener('click', function() {
                    selectRoom(this.getAttribute('data-type'), this.getAttribute('data-price'));
                });
            });
        }
        lucide.createIcons();
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    confirmButton.onclick = function() {
        confirmButton.disabled = true;
        confirmButton.innerHTML = '<div class="loading"></div>Confirming...';
        setTimeout(() => {
            alert('Reservation confirmed! Redirecting to dashboard...');
            modal.style.display = "none";
            window.location.href = '/api/userDashboard';
        }, 2000);
    }
});

function selectRoom(roomType, price) {
    const dateRange = document.getElementById('dateRange').value;
    if (!dateRange.includes(' to ')) {
        modalContent.innerHTML = "Error! Please select valid check-in and check-out dates.";
        modal.style.display = "block";
        return;
    }
    const [checkIn, checkOut] = dateRange.split(' to ');
    const guests = document.getElementById('guests').value;
    const modal = document.getElementById('confirmationModal');

    modalContent.innerHTML = `
        <p><i data-lucide="home"></i><strong>Room Type:</strong> ${roomType}</p>
        <p><i data-lucide="calendar"></i><strong>Check-in:</strong> ${checkIn}</p>
        <p><i data-lucide="calendar"></i><strong>Check-out:</strong> ${checkOut}</p>
        <p><i data-lucide="users"></i><strong>Guests:</strong> ${guests}</p>
        <p><i data-lucide="credit-card"></i><strong>Price:</strong> $${price} per night</p>
    `;
    modal.style.display = "block";
    lucide.createIcons();
}
