 // Initialize Lucide icons
 document.addEventListener("DOMContentLoaded", () => {
    // Declare lucide if it's not already defined
    if (typeof lucide === "undefined") {
      window.lucide = {
        createIcons: () => {
          // This is a placeholder.  In a real application,
          // you would likely load the Lucide library here or
          // ensure it's loaded via a script tag in your HTML.
          console.warn("Lucide icons not properly initialized. Ensure Lucide library is loaded.")
        },
      }
    }
  
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  
    // Toggle sidebar
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebar = document.getElementById("sidebar")
  
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
        sidebar.classList.toggle("collapsed")
      })
    }
  
    // Toggle mobile menu
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("nav")
  
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
      })
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contactForm")
    const formSuccess = document.getElementById("formSuccess")
  
    if (contactForm && formSuccess) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission
        setTimeout(() => {
          contactForm.style.display = "none"
          formSuccess.style.display = "block"
        }, 1000)
      })
    }
  
    // FAQ accordion
    const faqItems = document.querySelectorAll(".faq-item")
  
    if (faqItems.length > 0) {
      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")
  
        if (question) {
          question.addEventListener("click", () => {
            // Close all other items
            faqItems.forEach((otherItem) => {
              if (otherItem !== item) {
                otherItem.classList.remove("active")
              }
            })
  
            // Toggle current item
            item.classList.toggle("active")
          })
        }
      })
    }
  })
  
  