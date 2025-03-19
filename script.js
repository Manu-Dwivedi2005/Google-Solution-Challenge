// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Password Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login password toggle
    const togglePassword = document.getElementById('togglePassword');
    const loginPassword = document.getElementById('loginPassword');
    
    if (togglePassword && loginPassword) {
        togglePassword.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Signup password toggle
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const signupPassword = document.getElementById('signupPassword');
    
    if (toggleSignupPassword && signupPassword) {
        toggleSignupPassword.addEventListener('click', function() {
            const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            signupPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Password strength checker
    const signupPasswordInput = document.getElementById('signupPassword');
    const passwordStrengthIndicator = document.getElementById('passwordStrength');
    const progressBar = document.querySelector('.password-strength .progress-bar');

    if (signupPasswordInput && passwordStrengthIndicator && progressBar) {
        signupPasswordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let color = '';

            // Length check
            if (password.length >= 8) strength += 25;

            // Contains number
            if (/\d/.test(password)) strength += 25;

            // Contains letter
            if (/[a-zA-Z]/.test(password)) strength += 25;

            // Contains special character
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

            // Update progress bar
            progressBar.style.width = strength + '%';

            // Update strength text and color
            if (strength <= 25) {
                color = '#dc3545';
                passwordStrengthIndicator.textContent = 'Weak';
            } else if (strength <= 50) {
                color = '#ffc107';
                passwordStrengthIndicator.textContent = 'Medium';
            } else if (strength <= 75) {
                color = '#17a2b8';
                passwordStrengthIndicator.textContent = 'Strong';
            } else {
                color = '#28a745';
                passwordStrengthIndicator.textContent = 'Very Strong';
            }

            progressBar.style.backgroundColor = color;
        });
    }

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Show success message
            alert('Login successful!');
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('termsCheck').checked;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!termsAccepted) {
                alert('Please accept the terms and conditions');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, password, termsAccepted });
            
            // Show success message
            alert('Account created successfully!');
            window.location.href = 'login.html';
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically make an API call to your backend
            console.log('Contact form submission:', { name, email, message });
            
            // Show success message and reset form
            alert('Message sent successfully!');
            this.reset();
        });
    }

    // Image upload handling
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
            console.log('Image upload:', { plantType, imageFile });

            // Show loading state
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <div class="text-center">
                    <div class="spinner-border text-success mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Analyzing image...</p>
                </div>
            `;

            // Simulate API call
            setTimeout(() => {
                resultsDiv.innerHTML = `
                    <div class="alert alert-success">
                        <h5>Analysis Complete</h5>
                        <p>Plant Type: ${plantType}</p>
                        <p>Status: Healthy</p>
                        <p>Confidence: 98%</p>
                    </div>
                `;
            }, 2000);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});

// Handle Consultation Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const expertType = document.getElementById('expertType').value;
            const consultationDate = document.getElementById('consultationDate').value;
            const consultationTime = document.getElementById('consultationTime').value;
            const consultationNotes = document.getElementById('consultationNotes').value;

            // Here you would typically send this data to your backend
            // For now, we'll just show a success message
            alert('Thank you for booking a consultation! We will contact you shortly to confirm your appointment.');
            consultationForm.reset();
        });
    }
});

// Forum Post Creation
function createForumPost() {
    // This would be implemented when the backend is ready
    console.log('Forum post creation functionality will be implemented with backend integration');
}

// Knowledge Base Search
function searchKnowledgeBase(query) {
    // This would be implemented when the backend is ready
    console.log('Knowledge base search functionality will be implemented with backend integration');
}

// Expert Availability Check
function checkExpertAvailability(expertId, date) {
    // This would be implemented when the backend is ready
    console.log('Expert availability check functionality will be implemented with backend integration');
}

// Handle Forum Topic Navigation
document.addEventListener('DOMContentLoaded', function() {
    const forumTopics = document.querySelectorAll('.list-group-item-action');
    forumTopics.forEach(topic => {
        topic.addEventListener('click', function(e) {
            e.preventDefault();
            const topicName = this.querySelector('h6').textContent;
            // This would be implemented when the backend is ready
            console.log(`Navigating to topic: ${topicName}`);
        });
    });
});

// Handle Knowledge Base Resource Navigation
document.addEventListener('DOMContentLoaded', function() {
    const resourceButtons = document.querySelectorAll('.btn-outline-success');
    resourceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceType = this.textContent.trim();
            // This would be implemented when the backend is ready
            console.log(`Navigating to resource type: ${resourceType}`);
        });
    });
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Handle Image Upload for Forum Posts
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // This would be implemented when the backend is ready
            console.log('Image upload functionality will be implemented with backend integration');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Handle User Authentication
function handleLogin(event) {
    event.preventDefault();
    // This would be implemented when the backend is ready
    console.log('Login functionality will be implemented with backend integration');
}

function handleSignup(event) {
    event.preventDefault();
    // This would be implemented when the backend is ready
    console.log('Signup functionality will be implemented with backend integration');
}

// Handle Real-time Updates
function initializeRealTimeUpdates() {
    // This would be implemented when the backend is ready
    console.log('Real-time updates functionality will be implemented with backend integration');
}

// Initialize all event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize real-time updates
    initializeRealTimeUpdates();

    // Add form validation to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this.id)) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });
}); 
