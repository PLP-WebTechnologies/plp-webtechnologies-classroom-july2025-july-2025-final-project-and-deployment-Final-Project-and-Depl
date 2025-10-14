// Course data with lessons and progress tracking
const coursesData = [
    {
        id: 1,
        title: "Complete Web Development",
        description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and create stunning web applications.",
        duration: "12 weeks",
        progress: 71,
        status: "in-progress",
        icon: "fas fa-code",
        imageColor: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
        lessons: [
            {
                id: 1,
                title: "HTML Fundamentals",
                duration: "2 hours",
                completed: true
            },
            {
                id: 2,
                title: "CSS Styling and Layout",
                duration: "3 hours",
                completed: true
            },
            {
                id: 3,
                title: "JavaScript Basics",
                duration: "4 hours",
                completed: true
            },
            {
                id: 4,
                title: "React Components",
                duration: "5 hours",
                completed: true
            },
            {
                id: 5,
                title: "State Management",
                duration: "3 hours",
                completed: false
            },
            {
                id: 6,
                title: "Node.js Backend",
                duration: "6 hours",
                completed: false
            },
            {
                id: 7,
                title: "Database Integration",
                duration: "4 hours",
                completed: false
            },
            {
                id: 8,
                title: "Final Project",
                duration: "8 hours",
                completed: false
            }
        ]
    },
    {
        id: 2,
        title: "Data Science with Python",
        description: "Learn data analysis, machine learning, and visualization using Python. Work with real datasets and build predictive models.",
        duration: "10 weeks",
        progress: 50,
        status: "in-progress",
        icon: "fas fa-chart-line",
        imageColor: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        lessons: [
            {
                id: 1,
                title: "Python Basics",
                duration: "3 hours",
                completed: true
            },
            {
                id: 2,
                title: "NumPy and Pandas",
                duration: "4 hours",
                completed: true
            },
            {
                id: 3,
                title: "Data Visualization",
                duration: "3 hours",
                completed: true
            },
            {
                id: 4,
                title: "Statistical Analysis",
                duration: "4 hours",
                completed: true
            },
            {
                id: 5,
                title: "Machine Learning Intro",
                duration: "5 hours",
                completed: false
            },
            {
                id: 6,
                title: "Supervised Learning",
                duration: "6 hours",
                completed: false
            },
            {
                id: 7,
                title: "Unsupervised Learning",
                duration: "4 hours",
                completed: false
            },
            {
                id: 8,
                title: "Final Project",
                duration: "10 hours",
                completed: false
            }
        ]
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Master user interface and user experience design principles. Create beautiful, functional designs that users love.",
        duration: "8 weeks",
        progress: 0,
        status: "not-started",
        icon: "fas fa-paint-brush",
        imageColor: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
        lessons: [
            {
                id: 1,
                title: "Design Principles",
                duration: "2 hours",
                completed: false
            },
            {
                id: 2,
                title: "User Research",
                duration: "3 hours",
                completed: false
            },
            {
                id: 3,
                title: "Wireframing",
                duration: "3 hours",
                completed: false
            },
            {
                id: 4,
                title: "Prototyping",
                duration: "4 hours",
                completed: false
            },
            {
                id: 5,
                title: "Visual Design",
                duration: "5 hours",
                completed: false
            },
            {
                id: 6,
                title: "Figma Mastery",
                duration: "4 hours",
                completed: false
            },
            {
                id: 7,
                title: "Design Systems",
                duration: "3 hours",
                completed: false
            },
            {
                id: 8,
                title: "Portfolio Project",
                duration: "8 hours",
                completed: false
            }
        ]
    },
    {
        id: 4,
        title: "Mobile App Development",
        description: "Build native and cross-platform mobile applications using React Native. Create apps for iOS and Android.",
        duration: "14 weeks",
        progress: 0,
        status: "not-started",
        icon: "fas fa-mobile-alt",
        imageColor: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        lessons: [
            {
                id: 1,
                title: "React Native Setup",
                duration: "2 hours",
                completed: false
            },
            {
                id: 2,
                title: "Components and Navigation",
                duration: "4 hours",
                completed: false
            },
            {
                id: 3,
                title: "State Management",
                duration: "3 hours",
                completed: false
            },
            {
                id: 4,
                title: "API Integration",
                duration: "4 hours",
                completed: false
            },
            {
                id: 5,
                title: "Platform Specific Code",
                duration: "3 hours",
                completed: false
            },
            {
                id: 6,
                title: "Testing and Debugging",
                duration: "3 hours",
                completed: false
            },
            {
                id: 7,
                title: "App Store Deployment",
                duration: "2 hours",
                completed: false
            },
            {
                id: 8,
                title: "Final App Project",
                duration: "12 hours",
                completed: false
            }
        ]
    }
];

// Global state
let currentCourse = null;
let currentPage = 'home';

// DOM elements
const pages = {
    home: document.getElementById('homePage'),
    about: document.getElementById('aboutPage'),
    contact: document.getElementById('contactPage'),
    courseDetail: document.getElementById('courseDetailPage')
};

const navItems = document.querySelectorAll('.nav-item');
const coursesGrid = document.getElementById('coursesGrid');
const backButton = document.getElementById('backButton');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadCourses();
    setupNavigation();
    setupEventListeners();
    updateStats();
}

function loadCourses() {
    coursesGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.onclick = () => showCourseDetail(course.id);
    
    const progressText = course.progress > 0 ? `${course.progress}% Complete` : 'Not Started';
    const statusClass = course.status === 'completed' ? 'status-completed' : 
                       course.status === 'in-progress' ? 'status-in-progress' : 'status-not-started';
    
    card.innerHTML = `
        <div class="course-image" style="background: ${course.imageColor}">
            <i class="${course.icon}"></i>
            ${course.progress > 0 ? `<div class="course-progress-badge">${course.progress}% Complete</div>` : ''}
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span class="course-duration">${course.duration}</span>
                <span class="course-status ${statusClass}">${progressText}</span>
            </div>
        </div>
    `;
    
    return card;
}

function showCourseDetail(courseId) {
    currentCourse = coursesData.find(course => course.id === courseId);
    if (!currentCourse) return;
    
    // Update course detail content
    document.getElementById('courseTitle').textContent = currentCourse.title;
    document.getElementById('courseDescription').textContent = currentCourse.description;
    
    // Update progress
    updateCourseProgress();
    
    // Load lessons
    loadLessons();
    
    // Update complete button
    updateCompleteButton();
    
    // Show course detail page
    showPage('courseDetail');
}

function updateCourseProgress() {
    const completedLessons = currentCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = currentCourse.lessons.length;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}% Complete`;
    
    // Update course data
    currentCourse.progress = progressPercentage;
    currentCourse.status = progressPercentage === 100 ? 'completed' : 
                          progressPercentage > 0 ? 'in-progress' : 'not-started';
}

function loadLessons() {
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = '';
    
    currentCourse.lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = `lesson-item ${lesson.completed ? 'completed' : ''}`;
        
        lessonItem.innerHTML = `
            <div class="lesson-number">${lesson.id}</div>
            <div class="lesson-content">
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-duration">${lesson.duration}</div>
            </div>
            <div class="lesson-status">
                ${lesson.completed ? '<i class="fas fa-check status-checkmark"></i>' : ''}
            </div>
        `;
        
        // Add click event to toggle lesson completion
        lessonItem.onclick = () => toggleLessonCompletion(lesson.id);
        
        lessonsList.appendChild(lessonItem);
    });
}

function toggleLessonCompletion(lessonId) {
    const lesson = currentCourse.lessons.find(l => l.id === lessonId);
    if (lesson) {
        lesson.completed = !lesson.completed;
        updateCourseProgress();
        loadLessons();
        updateCompleteButton();
        updateStats();
    }
}

function updateCompleteButton() {
    const completeBtn = document.getElementById('completeCourseBtn');
    const completedLessons = currentCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = currentCourse.lessons.length;
    
    if (completedLessons === totalLessons) {
        completeBtn.textContent = '✓ Course Completed!';
        completeBtn.className = 'complete-button completed';
        completeBtn.disabled = false;
    } else {
        completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark Course as Complete';
        completeBtn.className = 'complete-button';
        completeBtn.disabled = true;
    }
}

function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            showPage(page);
        });
    });
    
    backButton.addEventListener('click', () => {
        showPage('home');
    });
}

function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
    }
    
    // Update navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });
    
    currentPage = pageName;
    
    // Refresh courses when returning to home
    if (pageName === 'home') {
        loadCourses();
        updateStats();
    }
}

function updateStats() {
    const totalCourses = coursesData.length;
    const inProgressCourses = coursesData.filter(course => course.status === 'in-progress').length;
    const completedCourses = coursesData.filter(course => course.status === 'completed').length;
    
    // Update stat cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 3) {
        statCards[0].querySelector('.stat-number').textContent = totalCourses;
        statCards[1].querySelector('.stat-number').textContent = inProgressCourses;
        statCards[2].querySelector('.stat-number').textContent = completedCourses;
    }
}

function setupEventListeners() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Complete course button
    const completeBtn = document.getElementById('completeCourseBtn');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeCourse);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function completeCourse() {
    if (currentCourse && currentCourse.status === 'completed') {
        alert(`Congratulations! You've completed "${currentCourse.title}"! 🎉`);
        showPage('home');
    }
}

// Add some interactive features
function addHoverEffects() {
    // Add hover effects to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects after courses are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addHoverEffects, 100);
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for any anchor links
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
});

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 1000);
}

// Export functions for potential future use
window.LearnHub = {
    showPage,
    showCourseDetail,
    updateStats,
    coursesData
};
