// ===== Orders Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initOrderFilters();
    initSelectAll();
    initOrderSearch();
});

// Sample Orders Data
const ordersData = [
    {
        id: 'TRV1234',
        customer: { 
            name: 'Priya Sharma', 
            email: 'priya@example.com', 
            phone: '+91 98765 43210',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Floral Maxi Dress', size: 'M', quantity: 1, price: 2499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=50&h=50&fit=crop' },
            { name: 'Silk Blend Blouse', size: 'S', quantity: 2, price: 1299, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=50&h=50&fit=crop' }
        ],
        subtotal: 5097,
        shipping: 0,
        discount: 507,
        coupon: 'WINTER20',
        total: 4590,
        payment: { status: 'paid', method: 'UPI' },
        status: 'pending',
        date: new Date('2024-12-24T10:30:00'),
        shippingAddress: {
            street: '123 Park Street',
            area: 'Andheri West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400058',
            country: 'India'
        }
    },
    {
        id: 'TRV1233',
        customer: { 
            name: 'Anita Desai', 
            email: 'anita@example.com', 
            phone: '+91 87654 32109',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Co-ord Set Blue', size: 'M', quantity: 1, price: 3499, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=50&h=50&fit=crop' }
        ],
        subtotal: 3499,
        shipping: 0,
        discount: 609,
        coupon: 'NEW15',
        total: 2890,
        payment: { status: 'paid', method: 'Card' },
        status: 'processing',
        date: new Date('2024-12-24T09:15:00'),
        shippingAddress: {
            street: '456 Hill Road',
            area: 'Bandra',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            country: 'India'
        }
    },
    {
        id: 'TRV1232',
        customer: { 
            name: 'Sneha Patel', 
            email: 'sneha@example.com', 
            phone: '+91 76543 21098',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Silk Blend Blouse', size: 'M', quantity: 1, price: 1299, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=50&h=50&fit=crop' }
        ],
        subtotal: 1299,
        shipping: 0,
        discount: 0,
        total: 1299,
        payment: { status: 'paid', method: 'UPI' },
        status: 'shipped',
        date: new Date('2024-12-23T16:45:00'),
        trackingNumber: 'TRACK123456',
        shippingAddress: {
            street: '789 Lake View',
            area: 'Koramangala',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560034',
            country: 'India'
        }
    },
    {
        id: 'TRV1231',
        customer: { 
            name: 'Kavya Nair', 
            email: 'kavya@example.com', 
            phone: '+91 65432 10987',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Winter Cardigan', size: 'L', quantity: 2, price: 1899, image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=50&h=50&fit=crop' },
            { name: 'Denim Jacket', size: 'M', quantity: 1, price: 2799, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=50&h=50&fit=crop' }
        ],
        subtotal: 6597,
        shipping: 0,
        discount: 0,
        total: 6780,
        payment: { status: 'paid', method: 'COD' },
        status: 'delivered',
        date: new Date('2024-12-22T14:20:00'),
        deliveredDate: new Date('2024-12-24T11:30:00'),
        shippingAddress: {
            street: '321 Green Valley',
            area: 'Adyar',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600020',
            country: 'India'
        }
    },
    {
        id: 'TRV1230',
        customer: { 
            name: 'Meera Reddy', 
            email: 'meera@example.com', 
            phone: '+91 54321 09876',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Wrap Midi Dress', size: 'S', quantity: 1, price: 2199, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=50&h=50&fit=crop' },
            { name: 'Oversized Sweater', size: 'M', quantity: 1, price: 1699, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=50&h=50&fit=crop' }
        ],
        subtotal: 3898,
        shipping: 0,
        discount: 448,
        coupon: 'FIRST10',
        total: 3450,
        payment: { status: 'paid', method: 'Card' },
        status: 'delivered',
        date: new Date('2024-12-21T09:00:00'),
        deliveredDate: new Date('2024-12-23T15:45:00'),
        shippingAddress: {
            street: '567 Jubilee Hills',
            area: 'Road No. 10',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500033',
            country: 'India'
        }
    },
    {
        id: 'TRV1229',
        customer: { 
            name: 'Deepa Singh', 
            email: 'deepa@example.com', 
            phone: '+91 43210 98765',
            avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=32&h=32&fit=crop&crop=face' 
        },
        items: [
            { name: 'Winter Cardigan', size: 'M', quantity: 1, price: 1899, image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=50&h=50&fit=crop' }
        ],
        subtotal: 1899,
        shipping: 0,
        discount: 0,
        total: 1899,
        payment: { status: 'refunded', method: 'Card' },
        status: 'cancelled',
        date: new Date('2024-12-20T12:30:00'),
        cancelledDate: new Date('2024-12-21T10:00:00'),
        cancelReason: 'Customer requested cancellation',
        shippingAddress: {
            street: '890 Civil Lines',
            area: 'Model Town',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110009',
            country: 'India'
        }
    }
];

// ===== Order Filters =====
function initOrderFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    [statusFilter, dateFilter, startDate, endDate].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterOrders);
        }
    });
}

function filterOrders() {
    const status = document.getElementById('statusFilter').value;
    const dateRange = document.getElementById('dateFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let filtered = [...ordersData];
    
    // Status filter
    if (status) {
        filtered = filtered.filter(o => o.status === status);
    }
    
    // Date range filter
    if (dateRange) {
        const now = new Date();
        let fromDate;
        
        switch (dateRange) {
            case 'today':
                fromDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case 'week':
                fromDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'month':
                fromDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            case 'year':
                fromDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
        }
        
        if (fromDate) {
            filtered = filtered.filter(o => new Date(o.date) >= fromDate);
        }
    }
    
    // Custom date range
    if (startDate) {
        filtered = filtered.filter(o => new Date(o.date) >= new Date(startDate));
    }
    if (endDate) {
        filtered = filtered.filter(o => new Date(o.date) <= new Date(endDate));
    }
    
    renderOrders(filtered);
}

function renderOrders(orders) {
    const tbody = document.querySelector('#ordersTable tbody');
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center" style="padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <h3>No Orders Found</h3>
                        <p>Try adjusting your filters.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr data-order-id="${order.id}">
            <td><input type="checkbox" class="order-checkbox"></td>
            <td><strong>#${order.id}</strong></td>
            <td>
                <div class="customer-cell">
                    <img src="${order.customer.avatar}" alt="">
                    <div>
                        <span class="customer-name">${order.customer.name}</span>
                        <span class="customer-email">${order.customer.email}</span>
                    </div>
                </div>
            </td>
            <td>${order.items.length} item${order.items.length > 1 ? 's' : ''}</td>
            <td><strong>₹${order.total.toLocaleString()}</strong></td>
            <td><span class="payment-badge ${order.payment.status}">${capitalize(order.payment.status)}</span></td>
            <td><span class="status-badge ${order.status}">${capitalize(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" title="View" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${order.status !== 'cancelled' ? `
                        <button class="action-btn" title="Edit" onclick="editOrder('${order.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    ` : ''}
                    <button class="action-btn" title="Print" onclick="printOrder('${order.id}')">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function clearFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    filterOrders();
}

// ===== Select All =====
function initSelectAll() {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;
    
    selectAll.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.order-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    });
}

// ===== Order Search =====
function initOrderSearch() {
    const searchInput = document.getElementById('orderSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            searchOrders(query);
        }, 300);
    });
}

function searchOrders(query) {
    if (!query) {
        filterOrders();
        return;
    }
    
    const filtered = ordersData.filter(o => 
        o.id.toLowerCase().includes(query) ||
        o.customer.name.toLowerCase().includes(query) ||
        o.customer.email.toLowerCase().includes(query)
    );
    
    renderOrders(filtered);
}

// ===== Order Actions =====
function viewOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    // Update modal content
    document.getElementById('modalOrderId').textContent = '#' + order.id;
    document.getElementById('orderStatus').value = order.status;
    
    // Update order info
    const modal = document.getElementById('orderModal');
    
    // Customer info
    const customerDetail = modal.querySelector('.customer-detail');
    customerDetail.innerHTML = `
        <img src="${order.customer.avatar.replace('32', '50')}" alt="">
        <div>
            <strong>${order.customer.name}</strong>
            <p>${order.customer.email}</p>
            <p>${order.customer.phone}</p>
        </div>
    `;
    
    // Shipping address
    const shippingCard = modal.querySelectorAll('.order-info-card')[2];
    shippingCard.innerHTML = `
        <h4>Shipping Address</h4>
        <p>${order.shippingAddress.street}</p>
        <p>${order.shippingAddress.area}</p>
        <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</p>
        <p>${order.shippingAddress.country}</p>
    `;
    
    // Order items
    const itemsTable = modal.querySelector('.order-items-section tbody');
    itemsTable.innerHTML = order.items.map(item => `
        <tr>
            <td>
                <div class="product-cell">
                    <img src="${item.image}" alt="">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toLocaleString()}</td>
            <td>₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `).join('');
    
    // Order summary
    const summary = modal.querySelector('.order-summary');
    summary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${order.subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>${order.shipping === 0 ? 'Free' : '₹' + order.shipping.toLocaleString()}</span>
        </div>
        ${order.discount > 0 ? `
            <div class="summary-row">
                <span>Discount ${order.coupon ? `(${order.coupon})` : ''}:</span>
                <span class="text-success">-₹${order.discount.toLocaleString()}</span>
            </div>
        ` : ''}
        <div class="summary-row total">
            <span>Total:</span>
            <span>₹${order.total.toLocaleString()}</span>
        </div>
    `;
    
    openModal('orderModal');
}

function editOrder(orderId) {
    viewOrder(orderId);
}

function updateOrderStatus() {
    const orderId = document.getElementById('modalOrderId').textContent.replace('#', '');
    const newStatus = document.getElementById('orderStatus').value;
    
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        filterOrders();
        showToast('success', 'Status Updated', `Order #${orderId} status changed to ${capitalize(newStatus)}`);
    }
}

function printOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    // Create print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - #${order.id}</title>
            <style>
                body { font-family: 'Poppins', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #c9a227; padding-bottom: 20px; }
                .header h1 { font-family: 'Playfair Display', serif; font-size: 36px; margin: 0; }
                .header p { color: #666; margin: 5px 0; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
                .info-section h3 { font-size: 14px; color: #999; margin-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                th { background: #f8f8f8; font-size: 12px; text-transform: uppercase; }
                .total-row { font-weight: 600; font-size: 18px; }
                .footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>trivia</h1>
                <p>Women's Western Wear</p>
            </div>
            
            <div class="info-grid">
                <div class="info-section">
                    <h3>INVOICE TO</h3>
                    <p><strong>${order.customer.name}</strong></p>
                    <p>${order.customer.email}</p>
                    <p>${order.customer.phone}</p>
                    <p>${order.shippingAddress.street}</p>
                    <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</p>
                </div>
                <div class="info-section" style="text-align: right;">
                    <h3>INVOICE DETAILS</h3>
                    <p><strong>Invoice #:</strong> ${order.id}</p>
                    <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                    <p><strong>Status:</strong> ${capitalize(order.status)}</p>
                    <p><strong>Payment:</strong> ${capitalize(order.payment.status)}</p>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.size}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.price.toLocaleString()}</td>
                            <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div style="text-align: right;">
                <p>Subtotal: ₹${order.subtotal.toLocaleString()}</p>
                <p>Shipping: ${order.shipping === 0 ? 'Free' : '₹' + order.shipping.toLocaleString()}</p>
                ${order.discount > 0 ? `<p>Discount: -₹${order.discount.toLocaleString()}</p>` : ''}
                <p class="total-row">Total: ₹${order.total.toLocaleString()}</p>
            </div>
            
            <div class="footer">
                <p>Thank you for shopping with Trivia Clothing!</p>
                <p>www.triviaclothing.com | support@triviaclothing.com</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

function exportOrders() {
    const headers = ['Order ID', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Date'];
    const rows = ordersData.map(o => [
        o.id, o.customer.name, o.customer.email, o.items.length, o.total, o.payment.status, o.status, formatDate(o.date)
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-export.csv';
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('success', 'Export Complete', 'Orders have been exported to CSV.');
}

// ===== Helper Functions =====
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Make functions globally available
window.viewOrder = viewOrder;
window.editOrder = editOrder;
window.printOrder = printOrder;
window.updateOrderStatus = updateOrderStatus;
window.exportOrders = exportOrders;
window.clearFilters = clearFilters;
