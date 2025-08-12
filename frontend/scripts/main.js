// Function to toggle the mobile navigation menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

// Function to handle the "Start Searching Colleges" button click
function startSearch() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'filter.html';
    } else {
        window.location.href = 'signin.html';
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Function to update the navbar based on login state
function checkLoginState() {
    const authButtonsContainer = document.getElementById('authButtons');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    authButtonsContainer.innerHTML = ''; // Clear existing content

    if (isLoggedIn && userEmail) {
        // Create welcome message and logout button
        const welcomeMessage = document.createElement('span');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.textContent = `Welcome, ${userEmail.split('@')[0]}`;

        const logoutButton = document.createElement('button');
        logoutButton.className = 'auth-btn';
        logoutButton.textContent = 'Logout';
        logoutButton.onclick = logout;

        authButtonsContainer.appendChild(welcomeMessage);
        authButtonsContainer.appendChild(logoutButton);
    } else {
        // Create sign-in and sign-up buttons
        const signinButton = document.createElement('a');
        signinButton.href = 'signin.html';
        signinButton.className = 'auth-btn';
        signinButton.textContent = 'Sign In';

        const signupButton = document.createElement('a');
        signupButton.href = 'signup.html';
        signupButton.className = 'auth-btn';
        signupButton.textContent = 'Sign Up';

        authButtonsContainer.appendChild(signinButton);
        authButtonsContainer.appendChild(signupButton);
    }
}

// Run the check on every page load
document.addEventListener('DOMContentLoaded', checkLoginState);
