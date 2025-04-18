document.getElementById("loginButton").addEventListener("click", function() {
    window.location.href = "/api/login";
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});