// Smooth scroll for navigation links
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

// Add scroll effect to navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Initialize Charts with Chart.js
function initializeCharts() {
    // Net Worth Over Time Chart
    const wealthChartCanvas = document.getElementById('wealthChart');
    if (wealthChartCanvas) {
        const wealthCtx = wealthChartCanvas.getContext('2d');
        new Chart(wealthCtx, {
            type: 'line',
            data: {
                labels: ['2012', '2014', '2016', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', 'Aug 2026'],
                datasets: [{
                    label: 'Net Worth (USD Billions)',
                    data: [0.5, 2.5, 4.8, 24.6, 22.4, 185, 265, 219, 251, 420, 550, 869.8],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#FFD700',
                    pointBorderColor: '#0a0e27',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#FFD700',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b8d4',
                        borderColor: '#FFD700',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toFixed(1) + 'B';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(42, 47, 71, 0.3)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b8d4',
                            callback: function(value) {
                                return '$' + value + 'B';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b8d4'
                        }
                    }
                }
            }
        });
    }

    // Wealth Breakdown Pie Chart
    const breakdownChartCanvas = document.getElementById('breakdownChart');
    if (breakdownChartCanvas) {
        const breakdownCtx = breakdownChartCanvas.getContext('2d');
        new Chart(breakdownCtx, {
            type: 'doughnut',
            data: {
                labels: ['Tesla', 'SpaceX', 'xAI', 'X Platform', 'Neuralink', 'Boring Co.'],
                datasets: [{
                    data: [35, 42, 12, 5, 4, 2],
                    backgroundColor: [
                        '#E31937',
                        '#4A90E2',
                        '#9D4EDD',
                        '#FFFFFF',
                        '#00FF00',
                        '#FFD700'
                    ],
                    borderColor: '#0a0e27',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b8d4',
                        borderColor: '#FFD700',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

// Active nav link highlighting
function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.stat-card, .milestone-item, .chart-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
});