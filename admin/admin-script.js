// ===== Trivia Clothing Admin Dashboard JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSidebar();
    initDropdowns();
    initCharts();
    initSearch();
    initToasts();
    initModals();
    initDataTables();
});

// ===== Sidebar Toggle =====
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const menuToggle = document.getElementById('menuToggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
    
    // Restore sidebar state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed && sidebar) {
        sidebar.classList.add('collapsed');
    }
    
    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// ===== Dropdowns =====
function initDropdowns() {
    // Notification Dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            document.getElementById('profileDropdown')?.classList.remove('show');
        });
    }
    
    // Profile Dropdown
    const profileBtn = document.querySelector('.header-profile');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            notificationDropdown?.classList.remove('show');
        });
    }
    
    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        notificationDropdown?.classList.remove('show');
        profileDropdown?.classList.remove('show');
    });
}

// ===== Charts =====
function initCharts() {
    initSalesChart();
    initCategoryChart();
}

function initSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const salesData = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [12500, 19000, 15000, 22000, 18000, 28000, 24000]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [85000, 92000, 78000, 105000]
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [245000, 268000, 289000, 310000, 295000, 340000, 380000, 365000, 410000, 445000, 520000, 580000]
        }
    };
    
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.week.labels,
            datasets: [{
                label: 'Sales (₹)',
                data: salesData.week.data,
                borderColor: '#c9a227',
                backgroundColor: 'rgba(201, 162, 39, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#c9a227',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
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
                    backgroundColor: '#1a1a1a',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#999'
                    }
                },
                y: {
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#999',
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });
    
    // Chart period filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            salesChart.data.labels = salesData[period].labels;
            salesChart.data.datasets[0].data = salesData[period].data;
            salesChart.update();
        });
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dresses', 'Tops', 'Co-ords', 'Others'],
            datasets: [{
                data: [35, 28, 22, 15],
                backgroundColor: ['#c9a227', '#1a1a1a', '#666', '#999'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    titleColor: '#fff',
                    bodyColor: '#fff',
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

// ===== Search Functionality =====
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        }, 300);
    });
}

function performSearch(query) {
    // Simulate search results
    console.log('Searching for:', query);
    // In a real application, this would make an API call
}

// ===== Toast Notifications =====
function initToasts() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(type, title, message) {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    container.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ===== Modal Functions =====
function initModals() {
    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
    
    // Close modal on close button click
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ===== Data Tables =====
function initDataTables() {
    // Initialize any interactive table features
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const orderId = row.querySelector('td:first-child strong')?.textContent;
            if (orderId) {
                console.log('View order:', orderId);
                // In real app, this would open order details
            }
        });
    });
}

// ===== Utility Functions =====
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===== Export Functions =====
function exportData(type) {
    showToast('success', 'Export Started', `Your ${type} export is being prepared.`);
    // In real app, this would generate and download the file
}

// ===== API Simulation =====
const AdminAPI = {
    // Products
    getProducts: async () => {
        return JSON.parse(localStorage.getItem('admin_products')) || [];
    },
    
    saveProduct: async (product) => {
        const products = await AdminAPI.getProducts();
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products[index] = product;
            }
        } else {
            product.id = Date.now();
            products.push(product);
        }
        localStorage.setItem('admin_products', JSON.stringify(products));
        return product;
    },
    
    deleteProduct: async (id) => {
        const products = await AdminAPI.getProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('admin_products', JSON.stringify(filtered));
        return true;
    },
    
    // Orders
    getOrders: async () => {
        return JSON.parse(localStorage.getItem('admin_orders')) || generateSampleOrders();
    },
    
    updateOrderStatus: async (orderId, status) => {
        const orders = await AdminAPI.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            localStorage.setItem('admin_orders', JSON.stringify(orders));
        }
        return order;
    },
    
    // Customers
    getCustomers: async () => {
        return JSON.parse(localStorage.getItem('admin_customers')) || generateSampleCustomers();
    },
    
    // Categories
    getCategories: async () => {
        return JSON.parse(localStorage.getItem('admin_categories')) || generateSampleCategories();
    },
    
    saveCategory: async (category) => {
        const categories = await AdminAPI.getCategories();
        if (category.id) {
            const index = categories.findIndex(c => c.id === category.id);
            if (index !== -1) {
                categories[index] = category;
            }
        } else {
            category.id = Date.now();
            categories.push(category);
        }
        localStorage.setItem('admin_categories', JSON.stringify(categories));
        return category;
    },
    
    // Coupons
    getCoupons: async () => {
        return JSON.parse(localStorage.getItem('admin_coupons')) || [];
    },
    
    saveCoupon: async (coupon) => {
        const coupons = await AdminAPI.getCoupons();
        if (coupon.id) {
            const index = coupons.findIndex(c => c.id === coupon.id);
            if (index !== -1) {
                coupons[index] = coupon;
            }
        } else {
            coupon.id = Date.now();
            coupons.push(coupon);
        }
        localStorage.setItem('admin_coupons', JSON.stringify(coupons));
        return coupon;
    },
    
    // Analytics
    getAnalytics: async (period) => {
        return generateSampleAnalytics(period);
    },
    
    // Settings
    getSettings: async () => {
        return JSON.parse(localStorage.getItem('admin_settings')) || getDefaultSettings();
    },
    
    saveSettings: async (settings) => {
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        return settings;
    }
};

// ===== Sample Data Generators =====
function generateSampleOrders() {
    return [
        {
            id: 'TRV1234',
            customer: { name: 'Priya Sharma', email: 'priya@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
            products: [
                { name: 'Floral Maxi Dress', quantity: 1, price: 2499 },
                { name: 'Silk Blend Blouse', quantity: 2, price: 1299 }
            ],
            total: 5097,
            status: 'pending',
            date: new Date('2024-12-24T10:30:00'),
            address: '123 Park Street, Mumbai, Maharashtra 400001'
        },
        {
            id: 'TRV1233',
            customer: { name: 'Anita Desai', email: 'anita@example.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
            products: [
                { name: 'Co-ord Set Blue', quantity: 1, price: 3499 }
            ],
            total: 3499,
            status: 'processing',
            date: new Date('2024-12-24T09:15:00'),
            address: '456 Hill Road, Delhi 110001'
        },
        {
            id: 'TRV1232',
            customer: { name: 'Sneha Patel', email: 'sneha@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
            products: [
                { name: 'Winter Cardigan', quantity: 1, price: 1899 }
            ],
            total: 1899,
            status: 'shipped',
            date: new Date('2024-12-23T16:45:00'),
            address: '789 Lake View, Bangalore 560001'
        }
    ];
}

function generateSampleCustomers() {
    return [
        { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', orders: 12, totalSpent: 45890, lastOrder: '2024-12-24', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
        { id: 2, name: 'Anita Desai', email: 'anita@example.com', phone: '+91 87654 32109', orders: 8, totalSpent: 32450, lastOrder: '2024-12-23', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face' },
        { id: 3, name: 'Sneha Patel', email: 'sneha@example.com', phone: '+91 76543 21098', orders: 15, totalSpent: 67890, lastOrder: '2024-12-22', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face' },
        { id: 4, name: 'Kavya Nair', email: 'kavya@example.com', phone: '+91 65432 10987', orders: 5, totalSpent: 18900, lastOrder: '2024-12-21', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' },
        { id: 5, name: 'Meera Reddy', email: 'meera@example.com', phone: '+91 54321 09876', orders: 20, totalSpent: 89560, lastOrder: '2024-12-20', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face' }
    ];
}

function generateSampleCategories() {
    return [
        { id: 1, name: 'Dresses', slug: 'dresses', products: 85, status: 'active', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop' },
        { id: 2, name: 'Tops', slug: 'tops', products: 120, status: 'active', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=100&h=100&fit=crop' },
        { id: 3, name: 'Co-ords', slug: 'coords', products: 45, status: 'active', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&h=100&fit=crop' },
        { id: 4, name: 'Trousers', slug: 'trousers', products: 60, status: 'active', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop' },
        { id: 5, name: 'Knitwear', slug: 'knitwear', products: 35, status: 'active', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=100&h=100&fit=crop' },
        { id: 6, name: 'Jackets', slug: 'jackets', products: 28, status: 'active', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=100&h=100&fit=crop' }
    ];
}

function generateSampleAnalytics(period) {
    return {
        totalSales: 245890,
        totalOrders: 1245,
        avgOrderValue: 1975,
        conversionRate: 3.2,
        topProducts: [
            { name: 'Floral Maxi Dress', sales: 245, revenue: 612255 },
            { name: 'Silk Blend Blouse', sales: 198, revenue: 257202 },
            { name: 'Co-ord Set Blue', sales: 156, revenue: 545844 }
        ],
        salesByCategory: {
            'Dresses': 35,
            'Tops': 28,
            'Co-ords': 22,
            'Others': 15
        }
    };
}

function getDefaultSettings() {
    return {
        storeName: 'Trivia Clothing',
        email: 'admin@triviaclothing.com',
        phone: '+91 98765 43210',
        address: 'Mumbai, Maharashtra, India',
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        lowStockThreshold: 10,
        enableNotifications: true,
        enableEmailAlerts: true
    };
}

// Make functions globally available
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.AdminAPI = AdminAPI;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.exportData = exportData;
