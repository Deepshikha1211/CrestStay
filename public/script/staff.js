// Initialize Lucide icons
lucide.createIcons();
// DOM elements
const staffForm = document.getElementById('staff-form');
const modal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelRemove');
const confirmBtn = document.getElementById('confirmRemove');
const toast = document.getElementById('toast');
let staffToRemove = null;

// Form submission
staffForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addStaff();
});

// Close modal with cancel button
cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    staffToRemove = null;
});

// Confirm removal
confirmBtn.addEventListener('click', function() {
    if (staffToRemove) {
        removeStaff(staffToRemove);
        staffToRemove = null;
        modal.style.display = 'none';
        showToast('Staff member has been removed successfully', 'success');
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        staffToRemove = null;
    }
});

// Add staff function
function addStaff() {
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const joinDate = document.getElementById("joinDate").value;

    if (name === "" || role === "" || contact === "") {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const table = document.getElementById("staff-list");
    const row = table.insertRow();
    
    row.innerHTML = `
        <td>${name}</td>
        <td>${role}</td>
        <td>${department}</td>
        <td>${contact}</td>
        <td>${email}</td>
        <td>${joinDate}</td>
        <td><span class="status-badge status-active">Active</span></td>
        <td>
            <button class="btn btn-danger action-btn" onclick="confirmRemove(this)">Remove</button>
        </td>
    `;

    // Clear form
    staffForm.reset();
    showToast('New staff member added successfully', 'success');
}

// Confirm removal dialog
function confirmRemove(button) {
    staffToRemove = button;
    modal.style.display = 'flex';
}

// Remove staff function
function removeStaff(button) {
    button.parentElement.parentElement.remove();
}

// Search staff function
function searchStaff() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#staff-list tr");

    rows.forEach(row => {
        let visible = false;
        // Check first 5 columns (name, role, department, contact, email)
        for (let i = 0; i < 5; i++) {
            if (row.cells[i] && row.cells[i].textContent.toLowerCase().includes(searchValue)) {
                visible = true;
                break;
            }
        }
        row.style.display = visible ? "" : "none";
    });
}

// Show toast message
function showToast(message, type) {
    toast.textContent = message;
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('toast-success');
    } else if (type === 'error') {
        toast.classList.add('toast-error');
    }
    
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
document.addEventListener('DOMContentLoaded', () => {
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
const mainContent = document.querySelector('.main-content');

// Active link management
sidebarLinks.forEach(link => {
link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links
    sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
    
    // Add active class to clicked link
    link.parentElement.classList.add('active');

    // Section switching logic (placeholder)
    const sectionId = link.getAttribute('data-section');
    console.log(`Switched to section: ${sectionId}`);
    
    // You can add more specific section switching logic here
    // For now, this is just a demonstration
});
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
const sidebar = document.querySelector('.sidebar');
sidebar.classList.toggle('mobile-open');
}

// Add any additional sidebar-related interactivity here
});