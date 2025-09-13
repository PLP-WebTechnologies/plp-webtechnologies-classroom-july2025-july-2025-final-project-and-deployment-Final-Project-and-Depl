// =========================
// RESERVATION SYSTEM
// Advanced form validation and booking functionality
// =========================

document.addEventListener('DOMContentLoaded', function() {
    
    const ReservationSystem = {
        form: document.getElementById('reservationForm'),
        
        // Form validation rules
        validationRules: {
            fullName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid full name (letters and spaces only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                required: true,
                pattern: /^(\+254|0)[17]\d{8}$/,
                message: 'Please enter a valid Kenyan phone number'
            },
            date: {
                required: true,
                custom: 'validateDate',
                message: 'Please select a valid future date'
            },
            time: {
                required: true,
                message: 'Please select a preferred time'
            },
            guests: {
                required: true,
                message: 'Please select number of guests'
            }
        },
        
        // Initialize reservation system
        init: function() {
            this.setupEventListeners();
            this.setMinDate();
            this.setupAccessibility();
        },
        
        // Set minimum date to today
        setMinDate: function() {
            const dateInput = document.getElementById('date');
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            // Set max date to 3 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
        },
        
        // Setup event listeners
        setupEventListeners: function() {
            // Form submission
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
            
            // Date change handler
            document.getElementById('date').addEventListener('change', (e) => {
                this.updateAvailableTimes(e.target.value);
            });
            
            // Guests change handler
            document.getElementById('guests').addEventListener('change', (e) => {
                this.handleGuestSelection(e.target.value);
            });
        },
        
        // Setup accessibility features
        setupAccessibility: function() {
            // Add ARIA labels and descriptions
            const form = this.form;
            form.setAttribute('aria-label', 'Restaurant reservation form');
            
            // Announce form errors to screen readers
            const errorContainer = document.createElement('div');
            errorContainer.setAttribute('aria-live', 'polite');
            errorContainer.setAttribute('aria-atomic', 'true');
            errorContainer.className = 'sr-only';
            errorContainer.id = 'form-announcements';
            form.appendChild(errorContainer);
        },
        
        // Validate individual field
        validateField: function(field) {
            const fieldName = field.name;
            const rule = this.validationRules[fieldName];
            
            if (!rule) return true;
            
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';
            
            // Required validation
            if (rule.required && !value) {
                isValid = false;
                errorMessage = `${this.getFieldLabel(field)} is required`;
            }
            
            // Pattern validation
            else if (value && rule.pattern && !rule.pattern.test(value)) {
                isValid = false;
                errorMessage = rule.message;
            }
            
            // Minimum length validation
            else if (value && rule.minLength && value.length < rule.minLength) {
                isValid = false;
                errorMessage = `${this.getFieldLabel(field)} must be at least ${rule.minLength} characters`;
            }
            
            // Custom validation
            else if (value && rule.custom) {
                const customResult = this[rule.custom](value, field);
                if (!customResult.isValid) {
                    isValid = false;
                    errorMessage = customResult.message || rule.message;
                }
            }
            
            this.displayFieldError(field, isValid ? '' : errorMessage);
            return isValid;
        },
        
        // Custom date validation
        validateDate: function(value, field) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                return {
                    isValid: false,
                    message: 'Please select a future date'
                };
            }
            
            // Check if date is too far in future (3 months)
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            
            if (selectedDate > maxDate) {
                return {
                    isValid: false,
                    message: 'Reservations can only be made up to 3 months in advance'
                };
            }
            
            return { isValid: true };
        },
        
        // Update available times based on selected date
        updateAvailableTimes: function(selectedDate) {
            const timeSelect = document.getElementById('time');
            const selectedDateObj = new Date(selectedDate);
            const today = new Date();
            const isToday = selectedDateObj.toDateString() === today.toDateString();
            const currentHour = today.getHours();
            
            // Reset time options
            const options = timeSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value) {
                    const optionHour = parseInt(option.value.split(':')[0]);
                    
                    // Disable past times for today
                    if (isToday && optionHour <= currentHour) {
                        option.disabled = true;
                        option.textContent = option.textContent + ' (Not Available)';
                    } else {
                        option.disabled = false;
                        option.textContent = option.textContent.replace(' (Not Available)', '');
                    }
                }
            });
            
            // Clear current selection if it's now invalid
            if (timeSelect.value) {
                const selectedHour = parseInt(timeSelect.value.split(':')[0]);
                if (isToday && selectedHour <= currentHour) {
                    timeSelect.value = '';
                }
            }
        },
        
        // Handle guest selection
        handleGuestSelection: function(guestCount) {
            const requestsField = document.getElementById('requests');
            
            if (guestCount === '8+') {
                requestsField.placeholder = 'Group booking selected. Please specify exact number of guests and any special requirements for your large party...';
                
                // Show group booking notice
                this.showNotification('Group bookings require special arrangements. Our team will contact you to confirm details.', 'info');
            } else {
                requestsField.placeholder = 'Any dietary restrictions, seating preferences, or special arrangements...';
            }
        },
        
        // Get field label for error messages
        getFieldLabel: function(field) {
            const label = document.querySelector(`label[for="${field.id}"]`);
            return label ? label.textContent.replace('*', '').trim() : field.name;
        },
        
        // Display field error
        displayFieldError: function(field, message) {
            const errorElement = document.getElementById(`${field.name}-error`);
            
            if (message) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        },
        
        // Clear field error
        clearError: function(field) {
            const errorElement = document.getElementById(`${field.name}-error`);
            if (errorElement.textContent) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        },
        
        // Validate entire form
        validateForm: function() {
            const inputs = this.form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            return isValid;
        },
        
        // Handle form submission
        handleSubmit: function() {
            if (!this.validateForm()) {
                this.announceToScreenReader('Please correct the errors in the form');
                return;
            }
            
            // Show loading state
            const submitBtn = this.form.querySelector('.reservation-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.processReservation();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        },
        
        // Process reservation (simulate API call)
        processReservation: function() {
            const formData = new FormData(this.form);
            const reservationData = Object.fromEntries(formData);
            
            // In a real application, this would send data to a server
            console.log('Reservation Data:', reservationData);
            
            // Show success message
            this.showSuccessMessage(reservationData);
            
            // Reset form
            this.form.reset();
            this.announceToScreenReader('Reservation submitted successfully');
        },
        
        // Show success message
        showSuccessMessage: function(data) {
            const successHTML = `
                <div class="reservation-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Reservation Confirmed!</h3>
                    <p>Thank you, ${data.fullName}! Your reservation has been submitted.</p>
                    <div class="reservation-details">
                        <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> ${data.time}</p>
                        <p><strong>Guests:</strong> ${data.guests}</p>
                    </div>
                    <p class="confirmation-note">
                        A confirmation email will be sent to ${data.email}. 
                        Our team will contact you within 24 hours to confirm your reservation.
                    </p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        Make Another Reservation
                    </button>
                </div>
            `;
            
            const formContainer = document.querySelector('.reservation-form-container');
            formContainer.innerHTML = successHTML;
        },
        
        // Show notification
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
            
            // Close button functionality
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.parentNode.removeChild(notification);
            });
        },
        
        // Announce to screen readers
        announceToScreenReader: function(message) {
            const announcer = document.getElementById('form-announcements');
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    };
    
    // Initialize reservation system
    ReservationSystem.init();
    
    // Export for global access
    window.ReservationSystem = ReservationSystem;
});
