// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Handle loading indicator
    const loadingIndicator = document.getElementById('loading');
    if (loadingIndicator) {
        // Hide loading indicator with fade effect
        loadingIndicator.style.opacity = '0';
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 500);
    }

    // Password Toggle Functionality
    function setupPasswordToggle(toggleId, passwordId) {
        const toggleButton = document.getElementById(toggleId);
        const passwordInput = document.getElementById(passwordId);
        
        if (toggleButton && passwordInput) {
            toggleButton.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });
        }
    }

    // Setup password toggles
    setupPasswordToggle('togglePassword', 'loginPassword');
    setupPasswordToggle('toggleSignupPassword', 'signupPassword');

    // Password Strength Checker
    const signupPassword = document.getElementById('signupPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const progressBar = document.querySelector('.password-strength .progress-bar');

    if (signupPassword && passwordStrength && progressBar) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let strengthText = 'Weak';
            let strengthColor = 'bg-danger';

            // Check password strength
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;

            // Update strength indicator
            switch(strength) {
                case 0:
                    strengthText = 'Weak';
                    strengthColor = 'bg-danger';
                    break;
                case 1:
                    strengthText = 'Fair';
                    strengthColor = 'bg-warning';
                    break;
                case 2:
                    strengthText = 'Good';
                    strengthColor = 'bg-info';
                    break;
                case 3:
                    strengthText = 'Strong';
                    strengthColor = 'bg-success';
                    break;
                case 4:
                    strengthText = 'Very Strong';
                    strengthColor = 'bg-success';
                    break;
            }

            passwordStrength.textContent = strengthText;
            progressBar.style.width = `${(strength / 4) * 100}%`;
            progressBar.className = `progress-bar ${strengthColor}`;
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Simulate API call
            showAlert('Logging in...', 'info');
            
            setTimeout(() => {
                // For demo purposes, show success message
                showAlert('Login successful!', 'success');
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
                
                // Update UI to show logged in state
                updateLoginState(true);
            }, 1500);
        });
    }

    // Handle Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('termsCheck').checked;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match!', 'danger');
                return;
            }

            if (!termsAccepted) {
                showAlert('Please accept the terms and conditions', 'danger');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, password });
            
            // Simulate API call
            showAlert('Creating account...', 'info');
            
            setTimeout(() => {
                // For demo purposes, show success message
                showAlert('Account created successfully!', 'success');
                const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                signupModal.hide();
                
                // Update UI to show logged in state
                updateLoginState(true);
            }, 1500);
        });
    }

    // Handle Social Login
    document.querySelectorAll('.btn-outline-dark, .btn-outline-primary').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.querySelector('i').classList.contains('fa-google') ? 'Google' : 'Facebook';
            showAlert(`Logging in with ${provider}...`, 'info');
            // Here you would implement actual social login
        });
    });

    // Alert Function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Update Login State
    function updateLoginState(isLoggedIn) {
        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
        const signupBtn = document.querySelector('[data-bs-target="#signupModal"]');
        
        if (isLoggedIn) {
            loginBtn.innerHTML = '<i class="fas fa-user me-2"></i>My Account';
            signupBtn.style.display = 'none';
        } else {
            loginBtn.innerHTML = 'Login';
            signupBtn.style.display = 'block';
        }
    }

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically make an API call to your backend
            console.log('Contact form submission:', { name, email, message });
            
            // For demo purposes, show success message
            alert('Message sent successfully!');
            this.reset();
        });
    }

    // Handle Image Upload
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const plantType = document.getElementById('plantType').value;
            const imageFile = document.getElementById('imageUpload').files[0];

            if (!imageFile) {
                alert('Please select an image to upload');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Image upload attempt:', { plantType, imageFile });
            
            // For demo purposes, show loading state
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <div class="text-center">
                    <div class="spinner-border text-success mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Analyzing image...</p>
                </div>
            `;

            // Simulate API call delay
            setTimeout(() => {
                resultsDiv.innerHTML = `
                    <div class="text-center">
                        <i class="fas fa-check-circle text-success fa-3x mb-3"></i>
                        <h5>Analysis Complete</h5>
                        <p>No diseases detected in the image.</p>
                    </div>
                `;
            }, 2000);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .btn, .form-control');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation styles
    document.querySelectorAll('.card, .btn, .form-control').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial animation check
    animateOnScroll();

    // Form Validation Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function updateInputValidation(input, isValid) {
        input.classList.remove('is-valid', 'is-invalid');
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        return isValid;
    }

    // Real-time validation for login form
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');

    if (loginEmail && loginPassword) {
        loginEmail.addEventListener('input', function() {
            updateInputValidation(this, validateEmail(this.value));
        });

        loginPassword.addEventListener('input', function() {
            updateInputValidation(this, validatePassword(this.value));
        });
    }

    // Real-time validation for signup form
    const signupNameInput = document.getElementById('signupName');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (signupNameInput && signupEmailInput && signupPasswordInput && confirmPasswordInput) {
        signupNameInput.addEventListener('input', function() {
            updateInputValidation(this, this.value.length >= 2);
        });

        signupEmailInput.addEventListener('input', function() {
            updateInputValidation(this, validateEmail(this.value));
        });

        signupPasswordInput.addEventListener('input', function() {
            const isValid = validatePassword(this.value);
            updateInputValidation(this, isValid);
            
            // Update password strength indicator
            if (passwordStrength && progressBar) {
                const strength = calculatePasswordStrength(this.value);
                updatePasswordStrength(strength);
            }
        });

        confirmPasswordInput.addEventListener('input', function() {
            const isValid = this.value === signupPasswordInput.value && this.value.length >= 8;
            updateInputValidation(this, isValid);
        });
    }

    // Password strength calculation
    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    }

    function updatePasswordStrength(strength) {
        const strengthText = document.getElementById('passwordStrength');
        const progressBar = document.querySelector('.password-strength .progress-bar');
        
        let strengthLabel, strengthColor;
        switch(strength) {
            case 0:
                strengthLabel = 'Weak';
                strengthColor = 'bg-danger';
                break;
            case 1:
                strengthLabel = 'Fair';
                strengthColor = 'bg-warning';
                break;
            case 2:
                strengthLabel = 'Good';
                strengthColor = 'bg-info';
                break;
            case 3:
                strengthLabel = 'Strong';
                strengthColor = 'bg-success';
                break;
            case 4:
                strengthLabel = 'Very Strong';
                strengthColor = 'bg-success';
                break;
        }

        if (strengthText) strengthText.textContent = strengthLabel;
        if (progressBar) {
            progressBar.style.width = `${(strength / 4) * 100}%`;
            progressBar.className = `progress-bar ${strengthColor}`;
        }
    }
}); 