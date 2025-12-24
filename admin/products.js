// ===== Products Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initProductFilters();
    initViewToggle();
    initImageUpload();
    initProductSearch();
});

// Sample Products Data
const productsData = [
    {
        id: 1,
        name: 'Floral Maxi Dress',
        sku: 'TRV-DRS-001',
        category: 'dresses',
        price: 3299,
        salePrice: 2499,
        stock: 45,
        status: 'active',
        badge: 'bestseller',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Silk Blend Blouse',
        sku: 'TRV-TOP-015',
        category: 'tops',
        price: 1299,
        salePrice: null,
        stock: 82,
        status: 'active',
        badge: 'new',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=400&fit=crop',
        sizes: ['XS', 'S', 'M', 'L']
    },
    {
        id: 3,
        name: 'Co-ord Set Blue',
        sku: 'TRV-CRD-007',
        category: 'coords',
        price: 4199,
        salePrice: 3499,
        stock: 8,
        status: 'active',
        badge: null,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L']
    },
    {
        id: 4,
        name: 'Winter Cardigan',
        sku: 'TRV-KNT-023',
        category: 'knitwear',
        price: 2699,
        salePrice: 1899,
        stock: 56,
        status: 'active',
        badge: 'sale',
        image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 5,
        name: 'Denim Jacket',
        sku: 'TRV-JKT-011',
        category: 'jackets',
        price: 2799,
        salePrice: null,
        stock: 34,
        status: 'active',
        badge: null,
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 6,
        name: 'High Waist Trousers',
        sku: 'TRV-TRS-008',
        category: 'trousers',
        price: 1599,
        salePrice: null,
        stock: 0,
        status: 'outofstock',
        badge: null,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 7,
        name: 'Wrap Midi Dress',
        sku: 'TRV-DRS-042',
        category: 'dresses',
        price: 2199,
        salePrice: null,
        stock: 67,
        status: 'active',
        badge: 'new',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L']
    },
    {
        id: 8,
        name: 'Oversized Sweater',
        sku: 'TRV-KNT-031',
        category: 'knitwear',
        price: 2199,
        salePrice: 1699,
        stock: 29,
        status: 'active',
        badge: null,
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL']
    }
];

// ===== Product Filters =====
function initProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    [categoryFilter, statusFilter, sortFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterProducts);
        }
    });
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const status = document.getElementById('statusFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filtered = [...productsData];
    
    // Category filter
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Status filter
    if (status) {
        filtered = filtered.filter(p => {
            if (status === 'outofstock') return p.stock === 0;
            if (status === 'active') return p.stock > 0 && p.status === 'active';
            return p.status === status;
        });
    }
    
    // Sort
    switch (sort) {
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'oldest':
            filtered.sort((a, b) => a.id - b.id);
            break;
        case 'price-high':
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            break;
        case 'price-low':
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    renderProducts(filtered);
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or add new products.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge ${product.badge}">${getBadgeText(product)}</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn" title="Edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" title="View" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn danger" title="Delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-category">${capitalize(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-pricing">
                    <span class="current-price">₹${(product.salePrice || product.price).toLocaleString()}</span>
                    ${product.salePrice ? `<span class="original-price">₹${product.price.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-meta">
                    <span class="stock ${getStockClass(product.stock)}">${getStockText(product.stock)}</span>
                    <span class="sku">SKU: ${product.sku}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeText(product) {
    if (product.badge === 'sale' && product.salePrice) {
        const discount = Math.round((1 - product.salePrice / product.price) * 100);
        return `-${discount}%`;
    }
    return capitalize(product.badge);
}

function getStockClass(stock) {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 10) return 'low-stock';
    return 'in-stock';
}

function getStockText(stock) {
    if (stock === 0) return '<i class="fas fa-times-circle"></i> Out of Stock';
    if (stock <= 10) return `<i class="fas fa-exclamation-circle"></i> Low Stock (${stock})`;
    return `<i class="fas fa-check-circle"></i> In Stock (${stock})`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== View Toggle =====
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
}

// ===== Image Upload =====
function initImageUpload() {
    const uploadArea = document.getElementById('imageUpload');
    if (!uploadArea) return;
    
    const fileInput = uploadArea.querySelector('input[type="file"]');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    const uploadArea = document.getElementById('imageUpload');
    const previews = uploadArea.querySelector('.image-previews') || document.createElement('div');
    previews.className = 'image-previews';
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-image" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previews.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
    
    if (!uploadArea.querySelector('.image-previews')) {
        uploadArea.appendChild(previews);
    }
}

// ===== Product Search =====
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            searchProducts(query);
        }, 300);
    });
}

function searchProducts(query) {
    if (!query) {
        filterProducts();
        return;
    }
    
    const filtered = productsData.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    
    renderProducts(filtered);
}

// ===== Product Actions =====
function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    // Populate form
    const form = document.getElementById('productForm');
    if (form) {
        form.querySelector('[name="name"]').value = product.name;
        form.querySelector('[name="sku"]').value = product.sku;
        form.querySelector('[name="category"]').value = product.category;
        form.querySelector('[name="price"]').value = product.price;
        form.querySelector('[name="salePrice"]').value = product.salePrice || '';
        form.querySelector('[name="stock"]').value = product.stock;
        form.querySelector('[name="status"]').value = product.status;
        
        // Set sizes
        const sizeCheckboxes = form.querySelectorAll('[name="sizes"]');
        sizeCheckboxes.forEach(cb => {
            cb.checked = product.sizes.includes(cb.value);
        });
    }
    
    // Update modal title
    document.querySelector('#addProductModal .modal-header h2').textContent = 'Edit Product';
    
    openModal('addProductModal');
}

function viewProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    // Open in new tab (product page)
    window.open(`../product.html?id=${id}`, '_blank');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = productsData.findIndex(p => p.id === id);
        if (index !== -1) {
            productsData.splice(index, 1);
            filterProducts();
            showToast('success', 'Product Deleted', 'The product has been removed successfully.');
        }
    }
}

function saveProduct() {
    const form = document.getElementById('productForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const product = {
        id: Date.now(),
        name: formData.get('name'),
        sku: formData.get('sku'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        salePrice: formData.get('salePrice') ? parseFloat(formData.get('salePrice')) : null,
        stock: parseInt(formData.get('stock')),
        status: formData.get('status'),
        sizes: formData.getAll('sizes'),
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop'
    };
    
    productsData.push(product);
    filterProducts();
    closeModal('addProductModal');
    form.reset();
    showToast('success', 'Product Saved', 'The product has been added successfully.');
}

function exportProducts() {
    // Create CSV content
    const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Sale Price', 'Stock', 'Status'];
    const rows = productsData.map(p => [
        p.id, p.name, p.sku, p.category, p.price, p.salePrice || '', p.stock, p.status
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-export.csv';
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('success', 'Export Complete', 'Products have been exported to CSV.');
}

// Make functions globally available
window.editProduct = editProduct;
window.viewProduct = viewProduct;
window.deleteProduct = deleteProduct;
window.saveProduct = saveProduct;
window.exportProducts = exportProducts;
