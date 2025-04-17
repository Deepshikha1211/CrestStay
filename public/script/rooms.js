// Initialize Lucide icons
lucide.createIcons();

document.addEventListener("DOMContentLoaded", function () {
    // Global functions
    function closeModal() {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
        });
        
        const overlay = document.querySelector(".modal-overlay");
        if (overlay) overlay.style.display = "none";
        
        document.body.style.overflow = "auto";
    }

    // Attach close event to all buttons with class "close-btn"
    document.querySelectorAll(".close-btn").forEach(button => {
        button.addEventListener("click", closeModal);
    });

    // Attach close event to the modal overlay (background)
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) {
        overlay.addEventListener("click", closeModal);
    }

    // Wishlist Functionality
    const wishlist = new Set();
    const wishlistToggle = document.getElementById('wishlistToggle');
    const wishlistModal = document.getElementById('wishlistModal');
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistCount = document.getElementById('wishlistCount');

    function updateWishlistButton() {
        wishlistCount.textContent = wishlist.size;
    }

    function renderWishlist() {
        wishlistItems.innerHTML = '';
        wishlist.forEach(room => {
            const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('wishlist-item');
            wishlistItem.innerHTML = `
                <span>${room}</span>
                <button class="btn remove-btn" data-room="${room}">Remove</button>
            `;
            wishlistItems.appendChild(wishlistItem);
        });
    }

    // Remove from Wishlist (Using Event Delegation)
    wishlistItems.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            const roomName = event.target.getAttribute("data-room");
            wishlist.delete(roomName);
            updateWishlistButton();
            renderWishlist();
        }
    });

    // Open Modal Function
    function openModal(modal) {
        modal.style.display = "block";
        document.querySelector(".modal-overlay").style.display = "block";
        document.body.style.overflow = "hidden";
    }

    // Wishlist Toggle Event
    wishlistToggle.addEventListener('click', function() {
        openModal(wishlistModal);
    });

    // Price Range Filter
    const priceRange = document.getElementById('priceRange');
    const priceRangeDisplay = document.getElementById('priceRangeDisplay');
    const roomCards = document.querySelectorAll('.room-card');

    priceRange.addEventListener('input', function() {
        const maxPrice = parseInt(this.value);
        priceRangeDisplay.textContent = `$${maxPrice}`;

        roomCards.forEach(card => {
            const priceText = card.querySelector('.price').textContent;
            const price = parseInt(priceText.replace('$', '').replace(' per night', ''));
            
            card.style.display = price <= maxPrice ? 'block' : 'none';
        });
    });

    // Modal for Room Details and Booking
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    const bookNowButtons = document.querySelectorAll(".book-now");
    const roomDetailsModal = document.getElementById("roomDetailsModal");
    const bookingModal = document.getElementById("bookingModal");
    const confirmBookingButton = document.getElementById("confirmBooking");

    viewDetailsButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("modalTitle").innerText = this.dataset.room;
            document.getElementById("modalBeds").innerText = this.dataset.beds;
            document.getElementById("modalFacilities").innerText = this.dataset.facilities;
            document.getElementById("modalRating").innerText = this.dataset.rating;
            openModal(roomDetailsModal);
        });
    });

    bookNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("bookingRoom").innerText = this.dataset.room;
            openModal(bookingModal);
        });
    });

    // Confirm Reservation
    confirmBookingButton.addEventListener("click", function () {
        alert("Your reservation has been confirmed!");
        closeModal();
    });

    // Set min dates for check-in and check-out
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    document.getElementById('checkin').min = formatDate(today);
    document.getElementById('checkout').min = formatDate(tomorrow);

    document.getElementById('checkin').addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const checkoutMinDate = new Date(checkinDate);
        checkoutMinDate.setDate(checkoutMinDate.getDate() + 1);
        document.getElementById('checkout').min = formatDate(checkoutMinDate);

        // Reset checkout if it's before the new min date
        const checkoutInput = document.getElementById('checkout');
        const checkoutDate = new Date(checkoutInput.value);
        if (checkoutDate <= checkinDate) {
            checkoutInput.value = formatDate(checkoutMinDate);
        }
    });
});
