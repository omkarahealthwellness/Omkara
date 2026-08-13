document.addEventListener('DOMContentLoaded', () => {
    const menuData = window.OMKARA_MENU;
    const menuContainer = document.getElementById('menu-container');
    const categoryRail = document.getElementById('category-rail');
    
    // State
    window.OMKARA_CART = {}; // format: { 'product-id_size-name': { item, size, quantity } }
    
    // --------------------------------------------------------
    // 1. Render Navigation and Menu
    // --------------------------------------------------------
    function init() {
        if (!menuData || menuData.length === 0) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const targetCategory = urlParams.get('category');
        const targetPage = urlParams.get('page');

        if (targetPage === 'about') {
            document.getElementById('page-about').style.display = 'block';
            document.getElementById('menu-container').style.display = 'none';
            document.querySelector('.hero-search-section').style.display = 'none';
            document.getElementById('category-dropdown-wrapper').style.display = 'none';
            updateCartUI();
            return;
        } else if (targetPage === 'philosophy') {
            document.getElementById('page-philosophy').style.display = 'block';
            document.getElementById('menu-container').style.display = 'none';
            document.querySelector('.hero-search-section').style.display = 'none';
            document.getElementById('category-dropdown-wrapper').style.display = 'none';
            updateCartUI();
            return;
        }
        
        let navHtml = '';
        let menuHtml = '';

        menuData.forEach((category, index) => {
            // If we are on a specific category page, skip other categories
            if (targetCategory && category.id !== targetCategory) {
                return;
            }

            // Build Dropdown Option (only needed if rendering full menu)
            if (!targetCategory) {
                const shortTitle = category.title.split(' ').slice(1).join(' ') || category.title;
                const emoji = category.title.split(' ')[0] || '';
                navHtml += `<option value="${category.id}">${emoji} ${shortTitle}</option>`;
            }

            // Category rendering setup
            if (targetCategory) {
                menuHtml += `
                    <div class="back-to-menu-wrapper">
                        <a href="index.html" class="back-btn">← Back to Full Menu</a>
                    </div>
                `;
            }

            // Build Category Section
            menuHtml += `
                <section class="category-section theme-${category.theme}" id="${category.id}">
                    <div class="category-header">
                        <h2 class="cat-headline">${category.heroHeadline}</h2>
                        <p class="cat-subheading">${category.heroSubheading || ''}</p>
                    </div>
                    <div class="product-grid">
            `;

            // Determine which items to show
            let itemsToShow = category.items;
            let showSeeAll = false;
            
            if (!targetCategory && category.items.length > 4) {
                itemsToShow = category.items.slice(0, 4);
                showSeeAll = true;
            }

            itemsToShow.forEach((item, itemIdx) => {
                if (item.available) {
                    const defaultSize = item.sizes[0];
                    const defaultPrice = defaultSize.price;
                    const defaultId = `${item.id}_${defaultSize.name}`;
                    
                    menuHtml += `
                        <div class="product-card" data-item-id="${item.id}">
                            <div class="card-image-wrapper" onclick="openProductModal('${category.id}', ${itemIdx})">
                                <img class="card-image" src="${item.image || ''}" alt="" onerror="this.style.display='none'">
                            </div>
                            <div class="card-content">
                                <h3 class="card-title" onclick="openProductModal('${category.id}', ${itemIdx})">${item.name}</h3>
                                <p class="card-desc" onclick="openProductModal('${category.id}', ${itemIdx})">${item.description}</p>
                                <div class="card-footer">
                                    <div class="card-price-info">
                                        <span class="price">₹${defaultPrice}</span>
                                        <span class="size-hint">(${defaultSize.name})</span>
                                    </div>
                                    <div class="add-control-wrapper" id="add-wrap-${defaultId}">
                                        <button class="add-btn" onclick="addToCart('${category.id}', ${itemIdx}, 0)">ADD</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    menuHtml += `
                        <div class="product-card coming-soon" onclick="openComingSoonModal()">
                            <div class="card-image-wrapper">
                                <img class="card-image" src="${item.image || ''}" alt="" onerror="this.style.display='none'">
                                <div class="coming-soon-overlay">
                                    <div class="coming-soon-badge">COMING SOON</div>
                                </div>
                            </div>
                            <div class="card-content">
                                <h3 class="coming-soon-title-under">${item.name}</h3>
                                <p class="coming-soon-desc-under">Kuch fresh aa raha hai.</p>
                            </div>
                        </div>
                    `;
                }
            });

            if (showSeeAll) {
                const shortTitle = category.title.split(' ').slice(1).join(' ') || category.title;
                menuHtml += `
                    <div class="see-all-card" onclick="window.location.href='index.html?category=${category.id}'">
                        <span class="icon">→</span>
                        <span class="text">See All ${shortTitle}</span>
                    </div>
                `;
            }

            menuHtml += `
                    </div>
                </section>
            `;
        });

        if (targetCategory) {
            // Hide hero search and category nav completely on sub-pages
            const heroSection = document.querySelector('.hero-search-section');
            if (heroSection) heroSection.style.display = 'none';
            const navWrapper = document.getElementById('category-dropdown-wrapper');
            if (navWrapper) navWrapper.style.display = 'none';
        } else {
            const dropdown = document.getElementById('category-dropdown');
            dropdown.innerHTML = `<option value="" disabled selected>Explore Categories...</option>` + navHtml;
        }
        
        menuContainer.innerHTML = menuHtml;

        if (!targetCategory) {
            initScrollSpy();
        }
        updateCartUI();
    }

    // --------------------------------------------------------
    // 2. Dropdown Navigation & Scroll Spy
    // --------------------------------------------------------
    window.navigateCategory = function(val) {
        if(!val) return;
        const urlParams = new URLSearchParams(window.location.search);
        const targetCategory = urlParams.get('category');
        
        if (targetCategory) {
            // If on a sub-page, navigate back to home with hash
            window.location.href = `index.html#${val}`;
        } else {
            // Smooth scroll on home page
            const targetElement = document.getElementById(val);
            if (targetElement) {
                const headerOffset = 130;
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset + 10;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    function initScrollSpy() {
        const sections = document.querySelectorAll('.category-section');
        const dropdown = document.getElementById('category-dropdown');
        if (!dropdown) return;
        
        const headerOffset = 140; 

        const observerOptions = {
            root: null,
            rootMargin: `-${headerOffset}px 0px -40% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    dropdown.value = id;
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
        
        // Check for hash on load to scroll immediately
        if (window.location.hash) {
            setTimeout(() => {
                const id = window.location.hash.substring(1);
                navigateCategory(id);
            }, 500);
        }
    }

    init();
});

// --------------------------------------------------------
// 3. Cart Management System
// --------------------------------------------------------
window.addToCart = function(categoryId, itemIndex, sizeIndex = 0) {
    const category = window.OMKARA_MENU.find(c => c.id === categoryId);
    const item = category.items[itemIndex];
    const size = item.sizes[sizeIndex];
    const cartKey = `${item.id}_${size.name}`;

    if (!window.OMKARA_CART[cartKey]) {
        window.OMKARA_CART[cartKey] = { item, size, quantity: 1, categoryId, itemIndex };
    } else {
        window.OMKARA_CART[cartKey].quantity += 1;
    }

    updateCartUI();
    renderInlineControls(cartKey, window.OMKARA_CART[cartKey].quantity);
};

window.updateCartQuantity = function(cartKey, change) {
    if (!window.OMKARA_CART[cartKey]) return;
    
    window.OMKARA_CART[cartKey].quantity += change;
    
    if (window.OMKARA_CART[cartKey].quantity <= 0) {
        delete window.OMKARA_CART[cartKey];
        renderInlineControls(cartKey, 0);
    } else {
        renderInlineControls(cartKey, window.OMKARA_CART[cartKey].quantity);
    }
    
    updateCartUI();
};

function renderInlineControls(cartKey, quantity) {
    const wrap = document.getElementById(`add-wrap-${cartKey}`);
    if (!wrap) return;

    if (quantity === 0) {
        // Find item details to bind ADD button again
        // Hacky string parsing since we stored ID structure
        const itemId = cartKey.split('_')[0];
        // We actually need categoryId and itemIndex to rebuild ADD button.
        // It's easier to just reset the HTML statically since this is simple.
        // Actually, without category ID, we can't easily rebuild it. 
        // We'll query the DOM or reconstruct. Let's just find the IDs.
        
        // Safer: reload page or use a data attribute.
        // For simplicity, we just hide the quantity control and show ADD. 
        // But we need the onclick args.
        // Best approach: store args in data attributes on the wrapper.
    }
    
    // Because inline rendering can be tricky without a framework, we will just globally re-render the controls based on cart state.
    // Let's implement a simpler function that just updates the whole grid's buttons.
}

// Global update for inline controls
function updateAllInlineControls() {
    const wrappers = document.querySelectorAll('.add-control-wrapper');
    wrappers.forEach(wrap => {
        // We need to know which item/size this wrapper represents.
        // When we generated HTML, we set id="add-wrap-{item.id}_{defaultSize.name}"
        const cartKey = wrap.id.replace('add-wrap-', '');
        const qty = window.OMKARA_CART[cartKey] ? window.OMKARA_CART[cartKey].quantity : 0;
        
        if (qty > 0) {
            wrap.innerHTML = `
                <div class="inline-qty">
                    <button onclick="updateCartQuantity('${cartKey}', -1)">−</button>
                    <span>${qty}</span>
                    <button onclick="updateCartQuantity('${cartKey}', 1)">+</button>
                </div>
            `;
        } else {
            // Need to recreate ADD button. This requires finding the category/item indices.
            // Let's find it by searching menuData.
            const itemId = cartKey.split('_')[0];
            let catId = '', itemIdx = -1;
            window.OMKARA_MENU.forEach(c => {
                const idx = c.items.findIndex(i => i.id === itemId);
                if (idx !== -1) { catId = c.id; itemIdx = idx; }
            });
            wrap.innerHTML = `<button class="add-btn" onclick="addToCart('${catId}', ${itemIdx}, 0)">ADD</button>`;
        }
    });
}

window.updateCartUI = function() {
    updateAllInlineControls();
    
    let totalItems = 0;
    let totalPrice = 0;
    
    Object.values(window.OMKARA_CART).forEach(cartItem => {
        totalItems += cartItem.quantity;
        totalPrice += (cartItem.size.price * cartItem.quantity);
    });

    const badge = document.getElementById('header-cart-badge');
    const floatBtn = document.getElementById('floating-cart-btn');
    const floatWaBtn = document.getElementById('floating-whatsapp-btn');
    
    if (totalItems > 0) {
        badge.style.display = 'inline-block';
        badge.textContent = totalItems;
        
        floatBtn.style.display = 'flex';
        floatWaBtn.style.display = 'none';
        
        document.getElementById('float-cart-count').textContent = totalItems;
        document.getElementById('float-cart-total').textContent = totalPrice;
        
        renderCartSheet();
    } else {
        badge.style.display = 'none';
        floatBtn.style.display = 'none';
        floatWaBtn.style.display = 'flex';
        renderCartSheet();
    }
};

// --------------------------------------------------------
// 4. Modals & Sheets
// --------------------------------------------------------
window.openCart = function() {
    document.getElementById('cart-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

function renderCartSheet() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.getElementById('cart-footer');
    
    const cartItems = Object.values(window.OMKARA_CART);
    
    if (cartItems.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'flex';
        footer.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    footer.style.display = 'block';
    
    let html = '';
    let subtotal = 0;
    
    cartItems.forEach(cItem => {
        const cartKey = `${cItem.item.id}_${cItem.size.name}`;
        const itemTotal = cItem.size.price * cItem.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item-row">
                <div class="ci-info">
                    <h4>${cItem.item.name}</h4>
                    <p>${cItem.size.name} &middot; ₹${cItem.size.price}</p>
                </div>
                <div class="ci-controls">
                    <div class="inline-qty">
                        <button onclick="updateCartQuantity('${cartKey}', -1)">−</button>
                        <span>${cItem.quantity}</span>
                        <button onclick="updateCartQuantity('${cartKey}', 1)">+</button>
                    </div>
                    <div class="ci-price">₹${itemTotal}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    document.getElementById('cart-subtotal-val').textContent = subtotal;
}

// WhatsApp Checkout
document.getElementById('whatsapp-checkout-btn').addEventListener('click', () => {
    const cartItems = Object.values(window.OMKARA_CART);
    if (cartItems.length === 0) return;

    let message = `Hi OMKARA!\n\nI'd like to place an order:\n\n`;
    let total = 0;

    cartItems.forEach(c => {
        const itemTotal = c.size.price * c.quantity;
        total += itemTotal;
        message += `${c.item.name}\n${c.size.name} x ${c.quantity} - Rs. ${itemTotal}\n\n`;
    });

    message += `TOTAL: Rs. ${total}\n\nPlease confirm availability.\n\nThank you!`;
    
    const phoneNumber = "918560078208";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Search Mock (Removed)

// Modal Product Sheet
let modalCurrentItem = null;
let modalCurrentSizeIdx = 0;

window.openProductModal = function(categoryId, itemIndex) {
    const category = window.OMKARA_MENU.find(c => c.id === categoryId);
    if (!category) return;
    const item = category.items[itemIndex];
    if (!item) return;

    modalCurrentItem = { categoryId, itemIndex, item };
    modalCurrentSizeIdx = 0;
    
    document.getElementById('modal-product-name').textContent = item.name;
    document.getElementById('modal-product-desc').textContent = item.description;
    document.getElementById('modal-product-image').src = item.image || '';
    
    if (item.ingredients && item.ingredients.length > 0) {
        document.getElementById('modal-product-ingredients-container').style.display = 'block';
        document.getElementById('modal-product-ingredients').textContent = item.ingredients.join(', ');
    } else {
        document.getElementById('modal-product-ingredients-container').style.display = 'none';
    }

    renderModalSizes();
    
    // Inject Theme
    const modal = document.getElementById('product-modal');
    modal.className = `modal-overlay theme-${category.theme}`; 
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function renderModalSizes() {
    const sizeSelector = document.getElementById('modal-size-selector');
    sizeSelector.innerHTML = '';
    
    modalCurrentItem.item.sizes.forEach((size, idx) => {
        const btn = document.createElement('button');
        btn.className = `size-btn ${idx === modalCurrentSizeIdx ? 'active' : ''}`;
        btn.innerHTML = `${size.name} <span class="size-price">₹${size.price}</span>`;
        btn.onclick = () => { modalCurrentSizeIdx = idx; renderModalSizes(); };
        sizeSelector.appendChild(btn);
    });
    
    document.getElementById('modal-total-price').textContent = modalCurrentItem.item.sizes[modalCurrentSizeIdx].price;
    // Reset quantity display for modal add
    document.getElementById('modal-quantity').textContent = '1';
}

// Resetting quantity to 1 for simplicity on the bottom sheet, 
// when they click ADD TO CART, we add 1 (or whatever qty selected)
let modalQty = 1;
window.updateModalQuantity = function(change) {
    if (modalQty + change >= 1) {
        modalQty += change;
        document.getElementById('modal-quantity').textContent = modalQty;
        const price = modalCurrentItem.item.sizes[modalCurrentSizeIdx].price;
        document.getElementById('modal-total-price').textContent = price * modalQty;
    }
};

document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
    if(!modalCurrentItem) return;
    const catId = modalCurrentItem.categoryId;
    const itemIdx = modalCurrentItem.itemIndex;
    
    // Add multiple if they incremented
    for(let i=0; i < modalQty; i++) {
        addToCart(catId, itemIdx, modalCurrentSizeIdx);
    }
    
    modalQty = 1; // reset
    closeModal('product-modal');
});

window.openComingSoonModal = function() {
    // Optional feedback for coming soon click
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => { if (!modal.classList.contains('active')) modal.className = 'modal-overlay'; }, 500);
};

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('app-header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
