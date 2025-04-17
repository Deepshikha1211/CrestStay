lucide.createIcons(); 
document.addEventListener('DOMContentLoaded', function() {
    // // Sidebar toggle functionality
    // const sidebarToggle = document.getElementById('sidebarToggle');
    // const dashboardLayout = document.querySelector('.dashboard-layout');
    
    // if (sidebarToggle && dashboardLayout) {
    //     sidebarToggle.addEventListener('click', function() {
    //         dashboardLayout.classList.toggle('sidebar-collapsed');
            
    //         // Store sidebar state in localStorage for persistence
    //         const isSidebarCollapsed = dashboardLayout.classList.contains('sidebar-collapsed');
    //         localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
    //     });
        
    //     // Restore sidebar state from localStorage
    //     const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    //     if (savedSidebarState === 'true') {
    //         dashboardLayout.classList.add('sidebar-collapsed');
    //     }
    // }
    
    // // Responsive sidebar behavior
    // function handleResponsiveSidebar() {
    //     if (window.innerWidth <= 768) {
    //         dashboardLayout.classList.add('sidebar-collapsed');
    //     } else {
    //         // Only restore if user hasn't manually collapsed
    //         const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    //         if (savedSidebarState !== 'true') {
    //             dashboardLayout.classList.remove('sidebar-collapsed');
    //         }
    //     }
    // }
    
    // // Initial check and event listener for window resize
    // handleResponsiveSidebar();
    // window.addEventListener('resize', handleResponsiveSidebar);
    
    // Dining carousel functionality
    const carousel = document.querySelector('.dining-carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel && prevButton && nextButton && dots.length) {
        // Calculate card width dynamically
        const diningCard = carousel.querySelector('.dining-card');
        const cardStyle = window.getComputedStyle(diningCard);
        const cardWidth = diningCard.offsetWidth + 
                          parseInt(cardStyle.marginLeft || 0) + 
                          parseInt(cardStyle.marginRight || 0) + 
                          20; // Adding gap
        
        // Scroll to previous card
        prevButton.addEventListener('click', function() {
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            updateDots();
        });
        
        // Scroll to next card
        nextButton.addEventListener('click', function() {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            updateDots();
        });
        
        // Update active dot based on scroll position
        function updateDots() {
            const scrollPosition = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            const scrollPercentage = maxScroll > 0 ? scrollPosition / maxScroll : 0;
            
            const activeDotIndex = Math.min(
                Math.floor(scrollPercentage * dots.length),
                dots.length - 1
            );
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
        
        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const totalCards = carousel.querySelectorAll('.dining-card').length;
                const visibleCards = Math.floor(carousel.clientWidth / cardWidth);
                const maxScrollableCards = totalCards - visibleCards;
                
                // Calculate position based on index
                const scrollAmount = maxScrollableCards > 0 ? 
                    (carousel.scrollWidth - carousel.clientWidth) * (index / (dots.length - 1)) : 0;
                
                carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            });
        });
        
        // Update dots on scroll
        carousel.addEventListener('scroll', function() {
            updateDots();
        });
        
        // Initial update
        updateDots();
        
        // Handle touch events for mobile swipe
       
    }
    
    // Countdown timer
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        // Set the target date (3 days from now for this example)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        
        function updateCountdown() {
            const currentDate = new Date();
            const difference = targetDate - currentDate;
            
            if (difference <= 0) {
                countdownElement.textContent = 'Today!';
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            if (days > 1) {
                countdownElement.textContent = `${days} days`;
            } else if (days === 1) {
                countdownElement.textContent = `${days} day`;
            } else if (hours > 0) {
                countdownElement.textContent = `${hours} hours`;
            } else {
                countdownElement.textContent = `${minutes} minutes`;
            }
        }
        
        // Initial update
        updateCountdown();
        
        // Update every minute
        setInterval(updateCountdown, 1000 * 60);
    }
    
    // // Concierge chat button
    // const chatButton = document.querySelector('.chat-button');
    // if (chatButton) {
    //     chatButton.addEventListener('click', function() {
    //         // Create chat modal
    //         const modal = document.createElement('div');
    //         modal.className = 'chat-modal';
    //         modal.innerHTML = `
    //             <div class="chat-modal-content">
    //                 <div class="chat-modal-header">
    //                     <h3>Chat with Concierge</h3>
    //                     <button class="chat-close-btn">&times;</button>
    //                 </div>
    //                 <div class="chat-messages">
    //                     <div class="chat-message concierge">
    //                         <span class="material-symbols-outlined">support_agent</span>
    //                         <div class="message-content">
    //                             <p>Hello! How can I assist you today?</p>
    //                             <span class="message-time">Just now</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="chat-input-area">
    //                     <input type="text" placeholder="Type your message..." class="chat-input">
    //                     <button class="chat-send-btn">
    //                         <span class="material-symbols-outlined">send</span>
    //                     </button>
    //                 </div>
    //             </div>
    //         `;
            
    //         document.body.appendChild(modal);
            
    //         // Add styles for the chat modal
    //         const style = document.createElement('style');
    //         style.textContent = `
    //             .chat-modal {
    //                 position: fixed;
    //                 bottom: 30px;
    //                 right: 30px;
    //                 width: 350px;
    //                 height: 450px;
    //                 background: white;
    //                 border-radius: 10px;
    //                 box-shadow: 0 5px 25px rgba(0,0,0,0.2);
    //                 z-index: 1000;
    //                 display: flex;
    //                 flex-direction: column;
    //                 overflow: hidden;
    //             }
    //             .chat-modal-content {
    //                 display: flex;
    //                 flex-direction: column;
    //                 height: 100%;
    //             }
    //             .chat-modal-header {
    //                 display: flex;
    //                 justify-content: space-between;
    //                 align-items: center;
    //                 padding: 15px;
    //                 background: #3a7bd5;
    //                 color: white;
    //             }
    //             .chat-close-btn {
    //                 background: none;
    //                 border: none;
    //                 color: white;
    //                 font-size: 24px;
    //                 cursor: pointer;
    //             }
    //             .chat-messages {
    //                 flex: 1;
    //                 padding: 15px;
    //                 overflow-y: auto;
    //             }
    //             .chat-message {
    //                 display: flex;
    //                 margin-bottom: 15px;
    //                 align-items: flex-start;
    //             }
    //             .chat-message.concierge {
    //                 align-items: flex-start;
    //             }
    //             .chat-message.user {
    //                 flex-direction: row-reverse;
    //             }
    //             .chat-message span {
    //                 margin: 0 10px;
    //                 color: #3a7bd5;
    //             }
    //             .message-content {
    //                 background: #f0f2f5;
    //                 padding: 10px;
    //                 border-radius: 10px;
    //                 max-width: 70%;
    //             }
    //             .chat-message.user .message-content {
    //                 background: #3a7bd5;
    //                 color: white;
    //             }
    //             .message-time {
    //                 display: block;
    //                 font-size: 0.7rem;
    //                 color: #999;
    //                 margin-top: 5px;
    //             }
    //             .chat-message.user .message-time {
    //                 color: rgba(255,255,255,0.7);
    //             }
    //             .chat-input-area {
    //                 display: flex;
    //                 padding: 15px;
    //                 border-top: 1px solid #eee;
    //             }
    //             .chat-input {
    //                 flex: 1;
    //                 padding: 10px;
    //                 border: 1px solid #ddd;
    //                 border-radius: 20px;
    //                 outline: none;
    //             }
    //             .chat-send-btn {
    //                 background: #3a7bd5;
    //                 color: white;
    //                 border: none;
    //                 width: 40px;
    //                 height: 40px;
    //                 border-radius: 50%;
    //                 margin-left: 10px;
    //                 cursor: pointer;
    //                 display: flex;
    //                 align-items: center;
    //                 justify-content: center;
    //             }
    //             @media (max-width: 576px) {
    //                 .chat-modal {
    //                     width: 100%;
    //                     height: 100%;
    //                     bottom: 0;
    //                     right: 0;
    //                     border-radius: 0;
    //                 }
    //             }
    //         `;
    //         document.head.appendChild(style);
            
    //         // Handle close button
    //         const closeBtn = modal.querySelector('.chat-close-btn');
    //         closeBtn.addEventListener('click', function() {
    //             document.body.removeChild(modal);
    //             document.head.removeChild(style);
    //         });
            
    //         // Handle send button
    //         const sendBtn = modal.querySelector('.chat-send-btn');
    //         const chatInput = modal.querySelector('.chat-input');
    //         const chatMessages = modal.querySelector('.chat-messages');
            
    //         function sendMessage() {
    //             const message = chatInput.value.trim();
    //             if (message) {
    //                 // Add user message
    //                 const userMessage = document.createElement('div');
    //                 userMessage.className = 'chat-message user';
    //                 userMessage.innerHTML = `
    //                     <div class="message-content">
    //                         <p>${message}</p>
    //                         <span class="message-time">Just now</span>
    //                     </div>
    //                 `;
    //                 chatMessages.appendChild(userMessage);
                    
    //                 // Clear input
    //                 chatInput.value = '';
                    
    //                 // Scroll to bottom
    //                 chatMessages.scrollTop = chatMessages.scrollHeight;
                    
    //                 // Simulate concierge response after a delay
    //                 setTimeout(() => {
    //                     const conciergeMessage = document.createElement('div');
    //                     conciergeMessage.className = 'chat-message concierge';
    //                     conciergeMessage.innerHTML = `
    //                         <span class="material-symbols-outlined">support_agent</span>
    //                         <div class="message-content">
    //                             <p>Thank you for your message. A concierge will assist you shortly.</p>
    //                             <span class="message-time">Just now</span>
    //                         </div>
    //                     `;
    //                     chatMessages.appendChild(conciergeMessage);
                        
    //                     // Scroll to bottom
    //                     chatMessages.scrollTop = chatMessages.scrollHeight;
    //                 }, 1000);
    //             }
    //         }
            
    //         sendBtn.addEventListener('click', sendMessage);
            
    //         chatInput.addEventListener('keypress', function(e) {
    //             if (e.key === 'Enter') {
    //                 sendMessage();
    //             }
    //         });
            
    //         // Focus input
    //         chatInput.focus();
    //     });
    // }
    
    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.querySelector('h4').textContent;
            
            // Create modal for each service
            const modal = document.createElement('div');
            modal.className = 'service-modal';
            modal.innerHTML = `
                <div class="service-modal-content">
                    <div class="service-modal-header">
                        <h3>${service}</h3>
                        <button class="service-close-btn">&times;</button>
                    </div>
                    <div class="service-modal-body">
                        <p>You've selected ${service}. Please provide details for your request:</p>
                        <form class="service-form">
                            <div class="form-group">
                                <label for="service-date">Date</label>
                                <input type="date" id="service-date" required>
                            </div>
                            <div class="form-group">
                                <label for="service-time">Time</label>
                                <input type="time" id="service-time" required>
                            </div>
                            <div class="form-group">
                                <label for="service-notes">Special Requests</label>
                                <textarea id="service-notes" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn-primary">Submit Request</button>
                        </form>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for the service modal
            const style = document.createElement('style');
            style.textContent = `
                .service-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .service-modal-content {
                    background: white;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .service-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid #eee;
                }
                .service-close-btn {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
                .service-modal-body {
                    padding: 20px;
                }
                .service-form {
                    margin-top: 20px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
            `;
            document.head.appendChild(style);
            
            // Handle close button
            const closeBtn = modal.querySelector('.service-close-btn');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // Handle form submission
            const form = modal.querySelector('.service-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const date = document.getElementById('service-date').value;
                const time = document.getElementById('service-time').value;
                const notes = document.getElementById('service-notes').value;
                
                // Show confirmation message
                modal.querySelector('.service-modal-body').innerHTML = `
                    <div class="confirmation-message">
                        <span class="material-symbols-outlined" style="font-size: 48px; color: #4caf50; display: block; margin: 0 auto 20px; text-align: center;">check_circle</span>
                        <h4 style="text-align: center; margin-bottom: 15px;">Request Confirmed!</h4>
                        <p>Your ${service} request has been submitted for:</p>
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        ${notes ? `<p><strong>Special Requests:</strong> ${notes}</p>` : ''}
                        <p style="margin-top: 20px;">A confirmation will be sent to your email shortly.</p>
                        <button class="btn-primary" style="display: block; margin: 20px auto 0;">Close</button>
                    </div>
                `;
                
                // Handle close button in confirmation
                modal.querySelector('.btn-primary').addEventListener('click', function() {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                });
            });
        });
    });
    
    // Reservation modification and cancellation
    const modifyBtn = document.querySelector('.reservation-summary .btn-outline:first-child');
    const cancelBtn = document.querySelector('.reservation-summary .btn-outline:last-child');
    
    if (modifyBtn) {
        modifyBtn.addEventListener('click', function() {
            if (confirm('Do you want to modify your reservation? This will take you to the reservation modification page.')) {
                alert('Redirecting to reservation modification page...');
                // In a real application, you would redirect to the modification page
            }
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            const confirmCancel = confirm('Are you sure you want to cancel your reservation? This action cannot be undone.');
            
            if (confirmCancel) {
                alert('Your reservation has been cancelled. A confirmation email will be sent shortly.');
                
                // Update reservation status
                const reservationStatus = document.querySelector('.reservation-status');
                if (reservationStatus) {
                    reservationStatus.textContent = 'Cancelled';
                    reservationStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                    reservationStatus.style.color = '#f44336';
                }
                
                // Disable buttons
                modifyBtn.disabled = true;
                cancelBtn.disabled = true;
                modifyBtn.classList.add('disabled');
                cancelBtn.classList.add('disabled');
            }
        });
    }
    
    // Language selector
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            alert(`Language changed to ${selectedLanguage}. The page will reload with your selected language.`);
            // In a real application, you would reload the page with the selected language
        });
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

// logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/';
        }
    });
    
    // Add active class to current nav item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        // For demo purposes, we'll just keep the Dashboard active
        // In a real app, you would compare link.pathname with currentPath
    });
    
    // Add CSS for disabled buttons
    const style = document.createElement('style');
    style.textContent = `
        .btn-outline.disabled,
        .btn-primary.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
});