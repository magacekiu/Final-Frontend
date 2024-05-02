// script.js
document.querySelectorAll('.product[data-map="true"]').forEach(item => {
    item.addEventListener('click', function() {
        console.log('Map item clicked:', this.querySelector('h2').innerText);
    });
});

document.getElementById('toggle-password').addEventListener('click', function() {
    var passwordInput = document.getElementById('password');
    var toggleButton = document.getElementById('toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show Password';
   }
});

document.getElementById('signup-btn').addEventListener('click', function() {
    document.querySelector('.signup-container h1').style.display = 'block';
    document.getElementById('submit-text').textContent = 'CREATE AN ACCOUNT';
    this.classList.add('selected');
    document.getElementById('login-btn').classList.remove('selected');
});

document.getElementById('login-btn').addEventListener('click', function() {
    document.querySelector('.signup-container h1').style.display = 'none';
    document.getElementById('submit-text').textContent = 'LOG IN';
    this.classList.add('selected');
    document.getElementById('signup-btn').classList.remove('selected');
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); // Ensure cart count is updated on page load
    updateLoginStatus(); // Update login status on every page
    const cartCount = localStorage.getItem('cartItem') ? 1 : 0;
    document.querySelectorAll('.nav span').forEach(span => {
        span.textContent = `Cart (${cartCount})`;
    });
    const loginLink = document.getElementById('login-link');
    if (localStorage.getItem('token')) {
        loginLink.textContent = 'Log Out';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'Home.html'; // Redirect to home page after logout
        });
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'Login.html';
    }
});

document.querySelectorAll('.nav a[href="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        if (this.innerHTML.includes('Login')) {
            window.location.href = 'Login.html';
        }
    });
});

document.getElementById('add-to-basket').addEventListener('click', function() {
    const deliveryDate = document.getElementById('delivery-date').value;
    const purchaseOption = document.querySelector('input[name="purchase-option"]:checked').value;
    if (deliveryDate && purchaseOption) {
        const item = { deliveryDate, purchaseOption };
        localStorage.setItem('cartItem', JSON.stringify(item));
        localStorage.setItem('cartCount', '1'); // Store cart count as '1'
        updateCartCount(); // Call to update the cart count display
        window.location.href = 'Checkout.html'; // Navigate to the delivery information page
    } else {
        alert('Please select a delivery date and purchase option.');
    }
});

document.querySelector('.delivery-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const formProps = Object.fromEntries(formData);
    localStorage.setItem('deliveryInfo', JSON.stringify(formProps));
    window.location.href = 'Delivery.html'; // Navigate to the delivery page
});

document.querySelector('.place-order-button').addEventListener('click', function() {
    localStorage.removeItem('cartItem'); // Clear the cart
    localStorage.setItem('cartCount', '0'); // Reset cart count to '0'
    updateCartCount(); // Update the cart count display
    // Here you would typically also send the order data to the server
    window.location.href = 'Track.html'; // Navigate to the track order page
    alert('Order placed successfully!');
});

if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'Login.html';
} else {
    // Fetch and display orders from the server/database
}

function updateCartCount() {
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    document.querySelectorAll('.nav span').forEach(span => {
      span.textContent = `Cart (${cartCount})`;
    });
}

function updateLoginStatus() {
    const loginLink = document.getElementById('login-link');
    if (localStorage.getItem('token')) {
        loginLink.textContent = 'Log Out';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'Home.html'; // Redirect to home page after logout
        });
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'Login.html';
    }
}