document.addEventListener('DOMContentLoaded', () => {
    // Sign Up Logic
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3800/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === 'User registered successfully.') {
                    window.location.href = 'signin.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

    // Sign In Logic
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3800/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === 'Sign in successful.') {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email); // Store user email
                    window.location.href = 'filter.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please check your credentials and try again.');
            });
        });
    }
});
