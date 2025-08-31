// بيانات النظام
let currentUser = null;
let currentPriceType = 'retail'; // retail, wholesale, vip

// تحميل البيانات من localStorage أو استخدام البيانات الافتراضية
let products = loadFromStorage('products', [
    {
        id: 1,
        name: 'كوكاكولا',
        category: 'مشروبات',
        prices: {
            retail: { USD: 1.00, LBP: 89500 },      // مفرق
            wholesale: { USD: 0.85, LBP: 76000 },  // جملة
            vip: { USD: 0.90, LBP: 80500 }         // زبون مميز
        },
        // للتوافق مع الكود القديم
        priceUSD: 1.00,
        priceLBP: 89500,
        stock: 100,
        minStock: 10,
        barcode: '1234567890123',
        supplier: 'شركة المشروبات العالمية'
    },
    {
        id: 2,
        name: 'خبز عربي',
        category: 'مخبوزات',
        prices: {
            retail: { USD: 0.50, LBP: 45000 },      // مفرق
            wholesale: { USD: 0.40, LBP: 36000 },  // جملة
            vip: { USD: 0.45, LBP: 40500 }         // زبون مميز
        },
        // للتوافق مع الكود القديم
        priceUSD: 0.50,
        priceLBP: 45000,
        stock: 50,
        minStock: 5,
        barcode: '2345678901234',
        supplier: 'مخبز الأمل'
    },
    {
        id: 3,
        name: 'شيبس',
        category: 'وجبات خفيفة',
        prices: {
            retail: { USD: 0.75, LBP: 67000 },      // مفرق
            wholesale: { USD: 0.65, LBP: 58000 },  // جملة
            vip: { USD: 0.70, LBP: 62500 }         // زبون مميز
        },
        // للتوافق مع الكود القديم
        priceUSD: 0.75,
        priceLBP: 67000,
        stock: 80,
        minStock: 15,
        barcode: '3456789012345',
        supplier: 'مصنع الوجبات'
    },
    {
        id: 4,
        name: 'ماء',
        category: 'مشروبات',
        prices: {
            retail: { USD: 0.25, LBP: 22000 },      // مفرق
            wholesale: { USD: 0.20, LBP: 18000 },  // جملة
            vip: { USD: 0.22, LBP: 20000 }         // زبون مميز
        },
        // للتوافق مع الكود القديم
        priceUSD: 0.25,
        priceLBP: 22000,
        stock: 200,
        minStock: 20,
        barcode: '4567890123456',
        supplier: 'شركة المياه النقية'
    }
]);

let customers = loadFromStorage('customers', [
    {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '71123456',
        address: 'الأشرفية، بيروت',
        totalPurchases: 250.00,
        loyaltyPoints: 125,
        dateJoined: '2024-01-01',
        creditBalance: 0.00, // الدين المستحق
        creditLimit: 500.00, // الحد الأقصى للدين
        creditHistory: [] // تاريخ المعاملات الآجلة
    },
    {
        id: 2,
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        phone: '70987654',
        address: 'الحمرا، بيروت',
        totalPurchases: 180.00,
        loyaltyPoints: 90,
        dateJoined: '2024-01-10',
        creditBalance: 25.00, // لديها دين
        creditLimit: 300.00,
        creditHistory: [
            {
                date: '2024-01-15',
                type: 'purchase',
                amount: 25.00,
                description: 'مشتريات متنوعة'
            }
        ]
    }
]);

let sales = loadFromStorage('sales', [
    {
        id: 1,
        invoiceNumber: 'INV-001',
        date: '2024-01-15',
        customer: 'أحمد محمد',
        customerId: 1,
        amount: 15.50,
        paymentMethod: 'نقدي',
        items: [
            {id: 1, name: 'كوكاكولا', quantity: 2, price: 1.00},
            {id: 3, name: 'شيبس', quantity: 1, price: 0.75}
        ]
    },
    {
        id: 2,
        invoiceNumber: 'INV-002',
        date: '2024-01-15',
        customer: 'عميل عادي',
        customerId: null,
        amount: 8.25,
        paymentMethod: 'بطاقة',
        items: [
            {id: 2, name: 'خبز عربي', quantity: 3, price: 0.50},
            {id: 4, name: 'ماء', quantity: 2, price: 0.25}
        ]
    }
]);

let suppliers = loadFromStorage('suppliers', [
    {
        id: 1,
        name: 'شركة المشروبات العالمية',
        email: 'info@beverages.com',
        phone: '01-345678',
        address: 'الدورة، بيروت',
        contactPerson: 'خالد أحمد'
    },
    {
        id: 2,
        name: 'مخبز الأمل',
        email: 'bakery@hope.com',
        phone: '03-456789',
        address: 'طرابلس، لبنان',
        contactPerson: 'محمد حسن'
    }
]);

let cart = [];
let settings = loadFromStorage('settings', {
    exchangeRate: 89500,
    taxRate: 11,
    storeName: 'متجري الإلكتروني',
    storeAddress: 'بيروت، لبنان',
    storePhone: '01-234567',
    autoBackup: true,
    lowStockAlert: true,
    lowStockThreshold: 10, // حد تحذير المخزون
    printAfterSale: true
});

// إدارة الصندوق والنقدية
let cashDrawer = loadFromStorage('cashDrawer', {
    cashUSD: 100.00,  // النقدية بالدولار
    cashLBP: 500000,  // النقدية بالليرة
    lastUpdate: new Date().toISOString(),
    transactions: []  // سجل المعاملات النقدية
});

// وظائف إدارة البيانات المحلية
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        return defaultValue;
    }
}

// دالة للحصول على السعر حسب النوع والعملة
function getProductPrice(product, priceType = currentPriceType, currency = 'USD') {
    // إذا كان المنتج يحتوي على أسعار متعددة
    if (product.prices && product.prices[priceType]) {
        return currency === 'USD' ? product.prices[priceType].USD : product.prices[priceType].LBP;
    }
    
    // العودة للسعر القديم للتوافق
    return currency === 'USD' ? product.priceUSD : product.priceLBP;
}

// دالة للحصول على نص نوع السعر
function getPriceTypeLabel(priceType) {
    const labels = {
        'retail': '🏪 مفرق',
        'wholesale': '📦 جملة',
        'vip': '⭐ مميز'
    };
    return labels[priceType] || 'مفرق';
}

function clearStorage() {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        localStorage.clear();
        location.reload();
    }
}

function exportData() {
    const data = {
        products: products,
        customers: customers,
        sales: sales,
        suppliers: suppliers,
        settings: settings,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `sales-system-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showMessage('تم تصدير البيانات بنجاح');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('هل تريد استيراد هذه البيانات؟ سيتم استبدال البيانات الحالية.')) {
                if (data.products) products = data.products;
                if (data.customers) customers = data.customers;
                if (data.sales) sales = data.sales;
                if (data.suppliers) suppliers = data.suppliers;
                if (data.settings) settings = data.settings;
                
                saveAllData();
                location.reload();
            }
        } catch (error) {
            showMessage('خطأ في قراءة الملف. تأكد من صحة تنسيق الملف.', 'error');
        }
    };
    reader.readAsText(file);
}

function saveAllData() {
    saveToStorage('products', products);
    saveToStorage('customers', customers);
    saveToStorage('sales', sales);
    saveToStorage('suppliers', suppliers);
    saveToStorage('settings', settings);
    saveToStorage('cashDrawer', cashDrawer);
}

// وظائف إدارة الصندوق والنقدية
function calculateOptimalChange(totalDue, amountPaid, paymentCurrency, preferredChangeCurrency = null) {
    const changeNeeded = amountPaid - totalDue;
    
    if (changeNeeded <= 0) {
        return { change: 0, currency: paymentCurrency, canGiveChange: true, breakdown: null };
    }
    
    // إذا لم يحدد العميل عملة الباقي، نحاول إعطاؤه بنفس عملة الدفع
    if (!preferredChangeCurrency) {
        preferredChangeCurrency = paymentCurrency;
    }
    
    // التحقق من توفر النقدية
    const availableCash = {
        USD: cashDrawer.cashUSD,
        LBP: cashDrawer.cashLBP
    };
    
    // حساب الباقي بالعملة المفضلة
    let changeAmount = changeNeeded;
    let changeCurrency = preferredChangeCurrency;
    
    // إذا كانت العملة مختلفة، نحتاج للتحويل
    if (paymentCurrency !== preferredChangeCurrency) {
        if (paymentCurrency === 'USD' && preferredChangeCurrency === 'LBP') {
            changeAmount = changeNeeded * settings.exchangeRate;
        } else if (paymentCurrency === 'LBP' && preferredChangeCurrency === 'USD') {
            changeAmount = changeNeeded / settings.exchangeRate;
        }
    }
    
    // التحقق من توفر النقدية المطلوبة
    const canGiveChange = availableCash[changeCurrency] >= changeAmount;
    
    // إذا لم تتوفر النقدية بالعملة المطلوبة، نجرب العملة الأخرى
    if (!canGiveChange) {
        const alternateCurrency = changeCurrency === 'USD' ? 'LBP' : 'USD';
        let alternateAmount;
        
        if (changeCurrency === 'USD') {
            alternateAmount = changeAmount * settings.exchangeRate;
        } else {
            alternateAmount = changeAmount / settings.exchangeRate;
        }
        
        if (availableCash[alternateCurrency] >= alternateAmount) {
            return {
                change: alternateAmount,
                currency: alternateCurrency,
                canGiveChange: true,
                breakdown: null,
                note: `تم إعطاء الباقي بعملة ${alternateCurrency === 'USD' ? 'الدولار' : 'الليرة'} لعدم توفر النقدية بالعملة المطلوبة`
            };
        }
    }
    
    // إذا لم تكف النقدية، نحاول التوزيع بين العملتين
    if (!canGiveChange && changeNeeded > 0) {
        const breakdown = calculateMixedCurrencyChange(changeNeeded, paymentCurrency);
        return {
            change: changeNeeded,
            currency: paymentCurrency,
            canGiveChange: breakdown.possible,
            breakdown: breakdown,
            note: breakdown.possible ? 'سيتم إعطاء الباقي بعملات مختلطة' : 'لا توجد نقدية كافية لإعطاء الباقي'
        };
    }
    
    return {
        change: changeAmount,
        currency: changeCurrency,
        canGiveChange: canGiveChange,
        breakdown: null
    };
}

function calculateMixedCurrencyChange(changeNeeded, originalCurrency) {
    let remainingChange = changeNeeded;
    const breakdown = { USD: 0, LBP: 0, possible: false };
    
    // إذا كان الدفع بالدولار، نعطي أولاً من الدولار ثم الليرة
    if (originalCurrency === 'USD') {
        const usdAvailable = Math.min(cashDrawer.cashUSD, remainingChange);
        breakdown.USD = usdAvailable;
        remainingChange -= usdAvailable;
        
        if (remainingChange > 0) {
            const lbpNeeded = remainingChange * settings.exchangeRate;
            if (cashDrawer.cashLBP >= lbpNeeded) {
                breakdown.LBP = lbpNeeded;
                remainingChange = 0;
            }
        }
    } else {
        // إذا كان الدفع بالليرة، نعطي أولاً من الليرة ثم الدولار
        const lbpAvailable = Math.min(cashDrawer.cashLBP, remainingChange);
        breakdown.LBP = lbpAvailable;
        remainingChange -= lbpAvailable;
        
        if (remainingChange > 0) {
            const usdNeeded = remainingChange / settings.exchangeRate;
            if (cashDrawer.cashUSD >= usdNeeded) {
                breakdown.USD = usdNeeded;
                remainingChange = 0;
            }
        }
    }
    
    breakdown.possible = remainingChange <= 0.01; // نسامح فلوس قليلة جداً
    return breakdown;
}

function updateCashDrawer(amountReceived, currency, changeGiven, changeCurrency) {
    // إضافة المبلغ المستلم
    if (currency === 'USD') {
        cashDrawer.cashUSD += amountReceived;
    } else {
        cashDrawer.cashLBP += amountReceived;
    }
    
    // خصم الباقي المُعطى
    if (changeGiven > 0) {
        if (changeCurrency === 'USD') {
            cashDrawer.cashUSD -= changeGiven;
        } else {
            cashDrawer.cashLBP -= changeGiven;
        }
    }
    
    // تسجيل المعاملة
    cashDrawer.transactions.push({
        timestamp: new Date().toISOString(),
        type: 'sale',
        amountReceived: amountReceived,
        receivedCurrency: currency,
        changeGiven: changeGiven,
        changeCurrency: changeCurrency,
        balanceAfter: {
            USD: cashDrawer.cashUSD,
            LBP: cashDrawer.cashLBP
        }
    });
    
    cashDrawer.lastUpdate = new Date().toISOString();
    saveToStorage('cashDrawer', cashDrawer);
}

// النسخ الاحتياطي التلقائي
function autoBackup() {
    if (settings.autoBackup) {
        saveAllData();
        console.log('تم حفظ النسخة الاحتياطية التلقائية');
    }
}

// تشغيل النسخ الاحتياطي كل 5 دقائق
setInterval(autoBackup, 5 * 60 * 1000);

// وظائف المساعدة
function formatCurrency(amount, currency = 'USD') {
    if (currency === 'USD') {
        return `$${amount.toFixed(2)}`;
    } else {
        return `${amount.toLocaleString()} ل.ل`;
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    
    if (fromCurrency === 'USD' && toCurrency === 'LBP') {
        return amount * settings.exchangeRate;
    } else if (fromCurrency === 'LBP' && toCurrency === 'USD') {
        return amount / settings.exchangeRate;
    }
    return amount;
}

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i> ${message}`;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        currentUser = {
            name: 'المدير',
            role: 'admin'
        };
        
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainScreen').classList.add('active');
        
        loadDashboard();
        updateCashDrawerDisplay();
        
        // رسالة ترحيب محسنة
        showNotification(`🎉 أهلاً وسهلاً ${currentUser.name}!
✨ تم تسجيل الدخول بنجاح
🛍️ نظام إدارة المبيعات جاهز للاستخدام`, 'success', 4000);
    } else {
        showMessage('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
    }
});

// تسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    showMessage('تم تسجيل الخروج بنجاح');
});

// التنقل بين الصفحات
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const targetScreen = this.getAttribute('data-screen');
        
        // إزالة الكلاس النشط من جميع عناصر القائمة
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // إخفاء جميع الصفحات
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        
        // إظهار الصفحة المطلوبة
        document.getElementById(targetScreen).classList.add('active');
        
        // تحميل بيانات الصفحة
        switch(targetScreen) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'pos':
                loadPOS();
                break;
            case 'products':
                loadProducts();
                break;
            case 'sales':
                loadSales();
                break;
            case 'customers':
                loadCustomers();
                break;
            case 'suppliers':
                loadSuppliers();
                break;
            case 'settings':
                loadSettings();
                break;
        }
    });
});

// تحميل لوحة التحكم
function loadDashboard() {
    const todayRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const todaySales = sales.length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;
    
    document.getElementById('todayRevenue').textContent = formatCurrency(todayRevenue);
    document.getElementById('todaySales').textContent = todaySales;
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalCustomers').textContent = totalCustomers;
    
    // تحديث الشريط العلوي والصندوق
    updateCashDrawerDisplay();
    
    // تحديث إضافي للتأكد من عرض القيم الصحيحة
    setTimeout(() => {
        updateCashDrawerDisplay();
    }, 500);
}

// تحميل نقطة البيع
function loadPOS() {
    displayProducts();
    updateCart();
    updateCashDrawerDisplay();
    
    // ربط event listener لتغيير نوع السعر
    const priceTypeSelect = document.getElementById('priceType');
    if (priceTypeSelect) {
        priceTypeSelect.addEventListener('change', function() {
            currentPriceType = this.value;
            displayProducts(); // إعادة عرض المنتجات بالأسعار الجديدة
            updateCart(); // تحديث السلة
        });
    }
    
    // تحديث إضافي للصندوق عند تحميل نقطة البيع
    setTimeout(() => {
        updateCashDrawerDisplay();
    }, 300);
    
    // إعداد البحث
    document.getElementById('productSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        displayProducts(searchTerm);
    });
    
    // إعداد العملة مع تحديث شامل
    document.getElementById('currency').addEventListener('change', function() {
        const newCurrency = this.value;
        
        // تحديث عرض المنتجات
        updateProductPrices();
        
        // تحديث العربة والمجاميع
        updateCart();
        
        // تحديث عملة الدفع الافتراضية
        const paymentCurrencySelect = document.getElementById('paymentCurrency');
        if (paymentCurrencySelect) {
            paymentCurrencySelect.value = newCurrency;
        }
        
        // تحديث عملة الدفع الجزئي
        const partialCurrencySelect = document.getElementById('partialCurrency');
        if (partialCurrencySelect) {
            partialCurrencySelect.value = newCurrency;
        }
        
        // حساب الباقي تلقائياً إذا كان هناك مبلغ مدفوع
        const amountPaid = document.getElementById('amountPaid').value;
        if (amountPaid && amountPaid > 0) {
            setTimeout(() => {
                calculateAndDisplayChange();
            }, 100);
        }
        
        // تحديث حسابات الدفع الجزئي إذا كانت مفعلة
        const paymentMethod = document.getElementById('paymentMethod');
        if (paymentMethod && paymentMethod.value === 'partial') {
            const partialAmount = document.getElementById('partialAmount');
            const customerSelect = document.getElementById('customerSelect');
            if (partialAmount && partialAmount.value && customerSelect && customerSelect.value) {
                setTimeout(() => {
                    calculateAndDisplayCredit();
                }, 100);
            }
        }
        
        // إظهار رسالة تأكيد
        showNotification(`تم تغيير العملة إلى ${newCurrency === 'USD' ? 'الدولار الأمريكي' : 'الليرة اللبنانية'}`, 'success', 2000);
    });
    
    // إعداد واجهة الدفع النقدي
    setupCashPaymentInterface();
    
    // إعداد واجهة الدفع الجزئي
    setupPartialPaymentInterface();
    
    // تحديث قائمة العملاء مسبقاً
    updateCustomerSelect();
    
    // تأكد من إظهار طريقة الدفع النقدي كافتراضية
    const paymentMethodDefault = document.getElementById('paymentMethod');
    const cashSection = document.getElementById('cashPaymentSection');
    const partialSection = document.getElementById('partialPaymentSection');
    
    paymentMethodDefault.value = 'cash';
    cashSection.style.display = 'block';
    partialSection.style.display = 'none';
    

}

function setupCashPaymentInterface() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cashPaymentSection = document.getElementById('cashPaymentSection');
    const calculateChangeBtn = document.getElementById('calculateChange');
    
    // تحقق من وجود الزر قبل إضافة الحدث
    if (calculateChangeBtn) {
        calculateChangeBtn.addEventListener('click', function() {
            calculateAndDisplayChange();
        });
    }
    
    // تحديث المبلغ المطلوب تلقائياً
    const amountPaidInput = document.getElementById('amountPaid');
    if (amountPaidInput) {
        amountPaidInput.addEventListener('input', function() {
            if (this.value && this.value > 0) {
                calculateAndDisplayChange();
            } else {
                const changeDetails = document.getElementById('changeDetails');
                if (changeDetails) {
                    changeDetails.style.display = 'none';
                }
            }
        });
    }
    
    // تحديث عند تغيير العملة
    const paymentCurrencySelect = document.getElementById('paymentCurrency');
    if (paymentCurrencySelect) {
        paymentCurrencySelect.addEventListener('change', function() {
            const amountPaid = document.getElementById('amountPaid');
            if (amountPaid && amountPaid.value) {
                calculateAndDisplayChange();
            }
        });
    }
    
    const changeCurrencySelect = document.getElementById('changeCurrency');
    if (changeCurrencySelect) {
        changeCurrencySelect.addEventListener('change', function() {
            const amountPaid = document.getElementById('amountPaid');
            if (amountPaid && amountPaid.value) {
                calculateAndDisplayChange();
            }
        });
    }
    

}

function updateCashDrawerDisplay() {
    try {
        // تحديث الشريط العلوي
        const headerUSD = document.getElementById('headerDrawerUSD');
        const headerLBP = document.getElementById('headerDrawerLBP');
        
        if (headerUSD) {
            headerUSD.textContent = formatCurrency(cashDrawer.cashUSD || 0, 'USD');
        }
        
        if (headerLBP) {
            headerLBP.textContent = formatCurrency(cashDrawer.cashLBP || 0, 'LBP');
        }
        
        // تحديث الإعدادات إذا كانت مفتوحة
        const currentUSD = document.getElementById('currentUSD');
        const currentLBP = document.getElementById('currentLBP');
        
        if (currentUSD) {
            currentUSD.textContent = formatCurrency(cashDrawer.cashUSD || 0, 'USD');
        }
        
        if (currentLBP) {
            currentLBP.textContent = formatCurrency(cashDrawer.cashLBP || 0, 'LBP');
        }
        
        console.log('تم تحديث عرض الصندوق:', {
            USD: cashDrawer.cashUSD,
            LBP: cashDrawer.cashLBP
        });
        
    } catch (error) {
        console.error('خطأ في تحديث عرض الصندوق:', error);
    }
}

function calculateAndDisplayChange() {
    try {
        const finalTotalElement = document.getElementById('finalTotal');
        const currencyElement = document.getElementById('currency');
        const amountPaidElement = document.getElementById('amountPaid');
        const paymentCurrencyElement = document.getElementById('paymentCurrency');
        const changeCurrencyElement = document.getElementById('changeCurrency');
        const changeDetailsElement = document.getElementById('changeDetails');

        // التحقق من وجود العناصر المطلوبة
        if (!finalTotalElement || !currencyElement || !amountPaidElement || !paymentCurrencyElement || !changeDetailsElement) {
            console.warn('بعض عناصر حساب الباقي غير موجودة');
            return;
        }

        const finalTotalText = finalTotalElement.textContent;
        const currency = currencyElement.value;
        
        // استخراج المبلغ الإجمالي بدقة أكبر
        let totalDue = 0;
        if (currency === 'USD') {
            totalDue = parseFloat(finalTotalText.replace(/[$,]/g, '')) || 0;
        } else {
            const cleanText = finalTotalText.replace(/[ل.,\s]/g, '');
            totalDue = parseFloat(cleanText) || 0;
            // تحويل من ليرة إلى دولار للحساب
            totalDue = totalDue / settings.exchangeRate;
        }
        
        const amountPaid = parseFloat(amountPaidElement.value) || 0;
        const paymentCurrency = paymentCurrencyElement.value;
        const preferredChangeCurrency = changeCurrencyElement ? changeCurrencyElement.value || null : null;
        
        if (amountPaid === 0) {
            changeDetailsElement.style.display = 'none';
            return;
        }
        
        // تحويل المبلغ الإجمالي لعملة الدفع
        let totalInPaymentCurrency = totalDue;
        
        if (currency === 'USD' && paymentCurrency === 'LBP') {
            totalInPaymentCurrency = totalDue * settings.exchangeRate;
        } else if (currency === 'LBP' && paymentCurrency === 'USD') {
            totalInPaymentCurrency = totalDue / settings.exchangeRate;
        } else if (currency === 'LBP' && paymentCurrency === 'LBP') {
            totalInPaymentCurrency = totalDue * settings.exchangeRate;
        }
        
        // تقريب الأرقام لتجنب مشاكل الفاصلة العائمة
        totalInPaymentCurrency = Math.round(totalInPaymentCurrency * 100) / 100;
        
        const changeResult = calculateOptimalChange(totalInPaymentCurrency, amountPaid, paymentCurrency, preferredChangeCurrency);
        displayChangeDetails(changeResult, totalInPaymentCurrency, amountPaid, paymentCurrency);
        
    } catch (error) {
        console.error('خطأ في حساب الباقي:', error);
        const changeDetailsElement = document.getElementById('changeDetails');
        if (changeDetailsElement) {
            changeDetailsElement.innerHTML = '<div class="error-message">خطأ في حساب الباقي. يرجى المحاولة مرة أخرى.</div>';
            changeDetailsElement.style.display = 'block';
        }
    }
}

function displayChangeDetails(changeResult, totalDue, amountPaid, paymentCurrency) {
    const changeDetailsDiv = document.getElementById('changeDetails');
    
    let html = `
        <div class="change-summary">
            <h4><i class="fas fa-receipt"></i> تفاصيل المعاملة</h4>
            <div class="transaction-row">
                <span>المبلغ المطلوب:</span>
                <span>${formatCurrency(totalDue, paymentCurrency)}</span>
            </div>
            <div class="transaction-row">
                <span>المبلغ المدفوع:</span>
                <span>${formatCurrency(amountPaid, paymentCurrency)}</span>
            </div>
    `;
    
    if (amountPaid < totalDue) {
        const shortage = totalDue - amountPaid;
        html += `
            <div class="transaction-row error">
                <span>المبلغ ناقص:</span>
                <span>${formatCurrency(shortage, paymentCurrency)}</span>
            </div>
        `;
    } else if (amountPaid > totalDue) {
        if (changeResult.canGiveChange) {
            if (changeResult.breakdown) {
                html += `
                    <div class="transaction-row success">
                        <span>الباقي - عملات مختلطة:</span>
                        <div class="mixed-change">
                `;
                if (changeResult.breakdown.USD > 0) {
                    html += `<span>${formatCurrency(changeResult.breakdown.USD, 'USD')}</span>`;
                }
                if (changeResult.breakdown.LBP > 0) {
                    html += `<span>${formatCurrency(changeResult.breakdown.LBP, 'LBP')}</span>`;
                }
                html += `</div></div>`;
            } else {
                html += `
                    <div class="transaction-row success">
                        <span>الباقي:</span>
                        <span>${formatCurrency(changeResult.change, changeResult.currency)}</span>
                    </div>
                `;
            }
            
            if (changeResult.note) {
                html += `<div class="change-note">${changeResult.note}</div>`;
            }
        } else {
            html += `
                <div class="transaction-row error">
                    <span>تحذير:</span>
                    <span>لا توجد نقدية كافية لإعطاء الباقي</span>
                </div>
            `;
        }
    } else {
        html += `
            <div class="transaction-row success">
                <span>المبلغ مضبوط!</span>
                <span><i class="fas fa-check-circle"></i></span>
            </div>
        `;
    }
    
    html += '</div>';
    
    changeDetailsDiv.innerHTML = html;
    changeDetailsDiv.style.display = 'block';
}

function displayProducts(searchTerm = '') {
    const container = document.getElementById('productsGrid');
    const currency = document.getElementById('currency').value;
    
    container.innerHTML = '';
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    filteredProducts.forEach(product => {
        const price = getProductPrice(product, currentPriceType, currency);
        const priceFormatted = formatCurrency(price, currency);
        
        // إنشاء عرض الأسعار المختلفة
        let priceDisplay = `<div class="price main-price">${priceFormatted}</div>`;
        
        // إضافة الأسعار الأخرى إذا كانت متوفرة
        if (product.prices) {
            const priceTypes = {
                'retail': 'مفرق',
                'wholesale': 'جملة',
                'vip': 'مميز'
            };
            
            let otherPrices = '';
            Object.keys(product.prices).forEach(type => {
                if (type !== currentPriceType) {
                    const otherPrice = getProductPrice(product, type, currency);
                    const otherPriceFormatted = formatCurrency(otherPrice, currency);
                    otherPrices += `<small class="other-price">${priceTypes[type]}: ${otherPriceFormatted}</small>`;
                }
            });
            
            if (otherPrices) {
                priceDisplay += `<div class="other-prices">${otherPrices}</div>`;
            }
        }

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h4>${product.name}</h4>
            ${priceDisplay}
            <div class="stock">متوفر: ${product.stock}</div>
            <div class="price-type-indicator">${getPriceTypeLabel(currentPriceType)}</div>
        `;
        
        productCard.addEventListener('click', () => addToCart(product));
        container.appendChild(productCard);
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showMessage('الكمية المطلوبة غير متوفرة', 'error');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedPriceType: currentPriceType  // حفظ نوع السعر المختار
        });
    }
    
    // تحديث العربة والحسابات
    updateCart();
    
    // تحديث فوري للحسابات إذا كانت موجودة
    setTimeout(() => {
        // تحديث حساب الباقي للدفع النقدي
        const amountPaid = document.getElementById('amountPaid');
        if (amountPaid && amountPaid.value && amountPaid.value > 0) {
            calculateAndDisplayChange();
        }
        
        // تحديث حساب الدين للدفع الجزئي
        const paymentMethod = document.getElementById('paymentMethod');
        if (paymentMethod && paymentMethod.value === 'partial') {
            const partialAmount = document.getElementById('partialAmount');
            const customerSelect = document.getElementById('customerSelect');
            if (partialAmount && partialAmount.value && customerSelect && customerSelect.value) {
                calculateAndDisplayCredit();
            }
        }
    }, 50);
    
    showMessage(`تم إضافة ${product.name} إلى العربة`);
}

function updateCart() {
    const container = document.getElementById('cartItems');
    const currency = document.getElementById('currency').value;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-state">🛒 العربة فارغة<br><small>انقر على المنتجات لإضافتها</small></div>';
        document.getElementById('subtotal').textContent = formatCurrency(0, currency);
        document.getElementById('tax').textContent = formatCurrency(0, currency);
        document.getElementById('finalTotal').textContent = formatCurrency(0, currency);
        
        // إخفاء تفاصيل الباقي عندما تكون العربة فارغة
        const changeDetails = document.getElementById('changeDetails');
        if (changeDetails) {
            changeDetails.style.display = 'none';
        }
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        // استخدام السعر المحفوظ مع المنتج في السلة
        const priceType = item.selectedPriceType || currentPriceType;
        const price = getProductPrice(item, priceType, currency);
        const total = price * item.quantity;
        subtotal += total;
        
        const priceTypeLabel = getPriceTypeLabel(priceType);
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${formatCurrency(price, currency)} <small class="price-type-tag">${priceTypeLabel}</small></span>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <div class="item-total">${formatCurrency(total, currency)}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
        `;
        
        container.appendChild(cartItem);
    });
    
    const tax = subtotal * (settings.taxRate / 100);
    const finalTotal = subtotal + tax;
    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal, currency);
    document.getElementById('tax').textContent = formatCurrency(tax, currency);
    document.getElementById('finalTotal').textContent = formatCurrency(finalTotal, currency);
    
    // حساب الباقي تلقائياً إذا كان هناك مبلغ مدفوع
    const amountPaidField = document.getElementById('amountPaid');
    if (amountPaidField && amountPaidField.value && amountPaidField.value > 0) {
        // تأخير صغير لضمان تحديث DOM
        setTimeout(() => {
            calculateAndDisplayChange();
        }, 50);
    } else if (cart.length === 0) {
        // إخفاء تفاصيل الباقي عندما تكون العربة فارغة
        const changeDetails = document.getElementById('changeDetails');
        if (changeDetails) {
            changeDetails.style.display = 'none';
        }
    }
    
    // تحديث حسابات الدفع الجزئي إذا كانت مفعلة
    const paymentMethod = document.getElementById('paymentMethod');
    if (paymentMethod && paymentMethod.value === 'partial') {
        const partialAmount = document.getElementById('partialAmount');
        const customerSelect = document.getElementById('customerSelect');
        if (partialAmount && partialAmount.value && customerSelect && customerSelect.value) {
            setTimeout(() => {
                calculateAndDisplayCredit();
            }, 50);
        }
    }
}

function changeQuantity(index, change) {
    const item = cart[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    if (newQuantity > item.stock) {
        showMessage('الكمية المطلوبة غير متوفرة', 'error');
        return;
    }
    
    cart[index].quantity = newQuantity;
    
    // تحديث العربة والحسابات
    updateCart();
    
    // تحديث فوري للحسابات إذا كانت موجودة
    setTimeout(() => {
        // تحديث حساب الباقي للدفع النقدي
        const amountPaid = document.getElementById('amountPaid');
        if (amountPaid && amountPaid.value && amountPaid.value > 0) {
            calculateAndDisplayChange();
        }
        
        // تحديث حساب الدين للدفع الجزئي
        const paymentMethod = document.getElementById('paymentMethod');
        if (paymentMethod && paymentMethod.value === 'partial') {
            const partialAmount = document.getElementById('partialAmount');
            const customerSelect = document.getElementById('customerSelect');
            if (partialAmount && partialAmount.value && customerSelect && customerSelect.value) {
                calculateAndDisplayCredit();
            }
        }
    }, 50);
}

function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCart();
    showMessage(`تم حذف ${removedItem.name} من العربة`);
}

// معالجة الدفع
document.getElementById('processPayment').addEventListener('click', function() {
    if (cart.length === 0) {
        showMessage('العربة فارغة', 'error');
        return;
    }
    
    const currency = document.getElementById('currency').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    // للدفع الجزئي، نحتاج للتحقق من العميل والمبلغ
    if (paymentMethod === 'partial') {
        const customerId = parseInt(document.getElementById('customerSelect').value);
        const paidAmount = parseFloat(document.getElementById('partialAmount').value) || 0;
        const partialCurrency = document.getElementById('partialCurrency').value;
        
        if (!customerId) {
            showMessage('يرجى اختيار عميل للدفع الجزئي', 'error');
            return;
        }
        
        if (paidAmount <= 0) {
            showMessage('يرجى إدخال مبلغ مدفوع صحيح', 'error');
            return;
        }
        
        const customer = customers.find(c => c.id === customerId);
        if (!customer) {
            showMessage('العميل غير موجود', 'error');
            return;
        }
        
        // حساب الفاتورة والدين
        const finalTotalText = document.getElementById('finalTotal').textContent;
        let totalDue;
        if (currency === 'USD') {
            totalDue = parseFloat(finalTotalText.replace('$', '').replace(',', ''));
        } else {
            totalDue = parseFloat(finalTotalText.replace(' ل.ل', '').replace(/,/g, '')) / settings.exchangeRate;
        }
        
        let paidInUSD = paidAmount;
        if (partialCurrency === 'LBP') {
            paidInUSD = paidAmount / settings.exchangeRate;
        }
        
        const remainingDebt = totalDue - paidInUSD;
        const newTotalDebt = customer.creditBalance + remainingDebt;
        
        // التحقق من الحد الائتماني
        if (newTotalDebt > customer.creditLimit) {
            const excess = newTotalDebt - customer.creditLimit;
            if (!confirm(`سيتجاوز الدين الحد المسموح بمقدار ${formatCurrency(excess)}. هل تريد المتابعة؟`)) {
                return;
            }
        }
        
        // تحديث الصندوق بالمبلغ المدفوع
        if (partialCurrency === 'USD') {
            cashDrawer.cashUSD += paidAmount;
        } else {
            cashDrawer.cashLBP += paidAmount;
        }
        
        // حفظ الصندوق وتحديث العرض
        cashDrawer.lastUpdate = new Date().toISOString();
        saveToStorage('cashDrawer', cashDrawer);
        updateCashDrawerDisplay();
        
        // إضافة الدين للعميل
        const success = addCreditToCustomer(customerId, remainingDebt, `فاتورة رقم INV-${(sales.length + 1).toString().padStart(3, '0')}`);
        
        if (!success) {
            showMessage('خطأ في إضافة الدين للعميل', 'error');
            return;
        }
        
        console.log(`تم إضافة دين ${remainingDebt}$ للعميل ${customer.name}. الدين الجديد: ${customer.creditBalance}$`);
        
    } else if (paymentMethod === 'cash') {
        const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0;
        if (amountPaid === 0) {
            showMessage('يرجى إدخال المبلغ المدفوع', 'error');
            return;
        }
        
        const finalTotalText = document.getElementById('finalTotal').textContent;
        let totalDue;
        if (currency === 'USD') {
            totalDue = parseFloat(finalTotalText.replace('$', '').replace(',', ''));
        } else {
            totalDue = parseFloat(finalTotalText.replace(' ل.ل', '').replace(/,/g, ''));
        }
        
        const paymentCurrency = document.getElementById('paymentCurrency').value;
        const preferredChangeCurrency = document.getElementById('changeCurrency').value || null;
        
        // تحويل المبلغ الإجمالي لعملة الدفع
        let totalInPaymentCurrency = totalDue;
        if (currency !== paymentCurrency) {
            if (currency === 'USD' && paymentCurrency === 'LBP') {
                totalInPaymentCurrency = totalDue * settings.exchangeRate;
            } else if (currency === 'LBP' && paymentCurrency === 'USD') {
                totalInPaymentCurrency = totalDue / settings.exchangeRate;
            }
        }
        
        if (amountPaid < totalInPaymentCurrency) {
            showMessage(`المبلغ المدفوع أقل من المطلوب. الناقص: ${formatCurrency(totalInPaymentCurrency - amountPaid, paymentCurrency)}`, 'error');
            return;
        }
        
        // حساب الباقي
        const changeResult = calculateOptimalChange(totalInPaymentCurrency, amountPaid, paymentCurrency, preferredChangeCurrency);
        
        if (!changeResult.canGiveChange && changeResult.change > 0) {
            if (!confirm('لا توجد نقدية كافية لإعطاء الباقي. هل تريد المتابعة؟')) {
                return;
            }
        }
        
        // تحديث الصندوق - إضافة المبلغ المستلم
        if (paymentCurrency === 'USD') {
            cashDrawer.cashUSD += amountPaid;
        } else {
            cashDrawer.cashLBP += amountPaid;
        }
        
        // خصم الباقي المُعطى
        if (changeResult.breakdown) {
            // عملات مختلطة
            if (changeResult.breakdown.USD > 0) {
                cashDrawer.cashUSD -= changeResult.breakdown.USD;
            }
            if (changeResult.breakdown.LBP > 0) {
                cashDrawer.cashLBP -= changeResult.breakdown.LBP;
            }
        } else if (changeResult.change > 0) {
            if (changeResult.currency === 'USD') {
                cashDrawer.cashUSD -= changeResult.change;
            } else {
                cashDrawer.cashLBP -= changeResult.change;
            }
        }
        
        // تسجيل المعاملة
        cashDrawer.transactions.push({
            timestamp: new Date().toISOString(),
            type: 'sale',
            amountReceived: amountPaid,
            receivedCurrency: paymentCurrency,
            changeGiven: changeResult.breakdown ? 
                (changeResult.breakdown.USD + changeResult.breakdown.LBP / settings.exchangeRate) : 
                changeResult.change,
            changeCurrency: changeResult.currency,
            balanceAfter: {
                USD: cashDrawer.cashUSD,
                LBP: cashDrawer.cashLBP
            }
        });
        
        cashDrawer.lastUpdate = new Date().toISOString();
        saveToStorage('cashDrawer', cashDrawer);
        
        // تحديث عرض الصندوق فوراً
        updateCashDrawerDisplay();
    }
    
    let total = 0;
    const saleItems = [];
    
    cart.forEach(item => {
        const price = currency === 'USD' ? item.priceUSD : item.priceLBP;
        total += price * item.quantity;
        
        saleItems.push({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: currency === 'USD' ? item.priceUSD : item.priceLBP
        });
        
        // تحديث المخزون
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    
    const tax = total * (settings.taxRate / 100);
    const finalTotal = total + tax;
    
    // إنشاء فاتورة جديدة
    let customerName = 'عميل عادي';
    let customerId = null;
    
    // إذا كان دفع جزئي، الحصول على معلومات العميل
    if (paymentMethod === 'partial') {
        customerId = parseInt(document.getElementById('customerSelect').value);
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            customerName = customer.name;
        }
    }
    
    const newSale = {
        id: sales.length + 1,
        invoiceNumber: `INV-${(sales.length + 1).toString().padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        customer: customerName,
        customerId: customerId,
        amount: currency === 'USD' ? finalTotal : convertCurrency(finalTotal, 'LBP', 'USD'),
        paymentMethod: getPaymentMethodText(paymentMethod),
        items: saleItems
    };
    
    // إضافة تفاصيل الدفع للفاتورة
    if (paymentMethod === 'cash') {
        const amountPaid = parseFloat(document.getElementById('amountPaid').value);
        const paymentCurrency = document.getElementById('paymentCurrency').value;
        
        newSale.cashDetails = {
            amountPaid: amountPaid,
            paymentCurrency: paymentCurrency,
            change: amountPaid - (currency === paymentCurrency ? finalTotal : 
                   (currency === 'USD' && paymentCurrency === 'LBP' ? finalTotal * settings.exchangeRate :
                    finalTotal / settings.exchangeRate))
        };
    } else if (paymentMethod === 'partial') {
        const customerId = parseInt(document.getElementById('customerSelect').value);
        const paidAmount = parseFloat(document.getElementById('partialAmount').value);
        const partialCurrency = document.getElementById('partialCurrency').value;
        const customer = customers.find(c => c.id === customerId);
        
        newSale.partialDetails = {
            customerId: customerId,
            customerName: customer.name,
            amountPaid: paidAmount,
            paymentCurrency: partialCurrency,
            debtAmount: finalTotal - (partialCurrency === currency ? paidAmount : 
                       (partialCurrency === 'USD' && currency === 'LBP' ? paidAmount * settings.exchangeRate :
                        paidAmount / settings.exchangeRate))
        };
    }
    
    sales.push(newSale);
    saveAllData();
    
    // إفراغ العربة وتنظيف الواجهة
    cart = [];
    updateCart();
    displayProducts();
    
    // تحديث الصندوق فوراً وحفظ البيانات
    saveToStorage('cashDrawer', cashDrawer);
    updateCashDrawerDisplay();
    
    // تحديث إضافي بعد ثانية للتأكد
    setTimeout(() => {
        updateCashDrawerDisplay();
    }, 1000);
    
    // إعادة تعيين واجهة الدفع بالكامل
    // تنظيف جميع الحقول
    const amountPaidField = document.getElementById('amountPaid');
    const partialAmountField = document.getElementById('partialAmount');
    const customerSelectField = document.getElementById('customerSelect');
    const changeDetailsDiv = document.getElementById('changeDetails');
    const creditDetailsDiv = document.getElementById('creditDetails');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const partialPaymentSection = document.getElementById('partialPaymentSection');
    const cashPaymentSection = document.getElementById('cashPaymentSection');
    
    // إعادة تعيين القيم
    if (amountPaidField) amountPaidField.value = '';
    if (partialAmountField) partialAmountField.value = '';
    if (customerSelectField) customerSelectField.value = '';
    if (changeDetailsDiv) {
        changeDetailsDiv.innerHTML = '';
        changeDetailsDiv.style.display = 'none';
    }
    if (creditDetailsDiv) {
        creditDetailsDiv.innerHTML = '';
        creditDetailsDiv.style.display = 'none';
    }
    
    // إعادة تعيين طريقة الدفع للنقدي
    if (paymentMethodSelect) {
        paymentMethodSelect.value = 'cash';
    }
    
    // إظهار قسم الدفع النقدي وإخفاء الجزئي
    if (cashPaymentSection) cashPaymentSection.style.display = 'block';
    if (partialPaymentSection) partialPaymentSection.style.display = 'none';
    
    // تحديث قوائم العملاء
    updateCustomerSelect();
    if (document.getElementById('customers').classList.contains('active')) {
        loadCustomers();
    }
    
    // إظهار إشعار النجاح مفصل
    if (paymentMethod === 'partial') {
        const customer = customers.find(c => c.id === customerId);
        const paidAmount = parseFloat(document.getElementById('partialAmount').value) || 0;
        const partialCurrency = document.getElementById('partialCurrency').value;
        const debtAmount = finalTotal - (partialCurrency === currency ? paidAmount : 
                       (partialCurrency === 'USD' && currency === 'LBP' ? paidAmount * settings.exchangeRate :
                        paidAmount / settings.exchangeRate));
        
        showNotification(`✅ تمت العملية بنجاح!
📄 فاتورة رقم: ${newSale.invoiceNumber}
👤 العميل: ${customer?.name || 'غير محدد'}
💵 مدفوع: ${formatCurrency(paidAmount, partialCurrency)}
💰 دين جديد: ${formatCurrency(debtAmount)}
📊 إجمالي الدين: ${formatCurrency(customer?.creditBalance || 0)}`, 'success', 6000);
    } else {
        showNotification(`✅ تمت المعاملة بنجاح!
📄 رقم الفاتورة: ${newSale.invoiceNumber}
💰 المبلغ: ${formatCurrency(finalTotal, currency)}`, 'success', 4000);
    }
    
    // طباعة تلقائية إذا كانت مفعلة
    if (settings.printAfterSale) {
        setTimeout(() => {
            showInvoice(newSale);
        }, 1000);
    }
});

function getPaymentMethodText(method) {
    const methods = {
        'cash': 'نقدي',
        'partial': 'دفع جزئي (دين)'
    };
    return methods[method] || method;
}

// وظائف نظام الدين والدفع الجزئي
function setupPartialPaymentInterface() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cashPaymentSection = document.getElementById('cashPaymentSection');
    const partialPaymentSection = document.getElementById('partialPaymentSection');
    
    // تحقق من وجود العناصر
    if (!paymentMethodSelect) {
        console.error('عنصر paymentMethod غير موجود');
        return;
    }
    if (!cashPaymentSection) {
        console.error('عنصر cashPaymentSection غير موجود');
        return;
    }
    if (!partialPaymentSection) {
        console.error('عنصر partialPaymentSection غير موجود');
        return;
    }
    
    // إعداد تبديل أقسام الدفع
    paymentMethodSelect.addEventListener('change', function() {
        console.log('تم تغيير طريقة الدفع إلى:', this.value);
        
        if (this.value === 'cash') {
            cashPaymentSection.style.display = 'block';
            partialPaymentSection.style.display = 'none';
            console.log('تم إظهار قسم الدفع النقدي');
        } else if (this.value === 'partial') {
            cashPaymentSection.style.display = 'none';
            partialPaymentSection.style.display = 'block';
            console.log('تم إظهار قسم الدفع الجزئي');
            updateCustomerSelect();
        }
    });
    
    // حساب الدين
    const calculateCreditBtn = document.getElementById('calculateCredit');
    if (calculateCreditBtn) {
        calculateCreditBtn.addEventListener('click', function() {
            calculateAndDisplayCredit();
        });
    }
    
    // تحديث عند تغيير المبلغ أو العميل
    const partialAmountInput = document.getElementById('partialAmount');
    if (partialAmountInput) {
        partialAmountInput.addEventListener('input', function() {
            const customerSelect = document.getElementById('customerSelect');
            if (this.value && customerSelect && customerSelect.value) {
                calculateAndDisplayCredit();
            }
        });
    }
    
    // تحديث تلقائي للمبلغ المدفوع عند تغيير العملة
    const paymentCurrencySelect = document.getElementById('paymentCurrency');
    if (paymentCurrencySelect) {
        paymentCurrencySelect.addEventListener('change', function() {
            const amountField = document.getElementById('amountPaid');
            if (amountField && amountField.value) {
                setTimeout(() => calculateAndDisplayChange(), 100);
            }
        });
    }
    
    // تحديث تلقائي للباقي عند تغيير عملة الباقي
    const changeCurrencySelect = document.getElementById('changeCurrency');
    if (changeCurrencySelect) {
        changeCurrencySelect.addEventListener('change', function() {
            const amountField = document.getElementById('amountPaid');
            if (amountField && amountField.value) {
                setTimeout(() => calculateAndDisplayChange(), 100);
            }
        });
    }
    
    const customerSelectDropdown = document.getElementById('customerSelect');
    if (customerSelectDropdown) {
        customerSelectDropdown.addEventListener('change', function() {
            const partialAmount = document.getElementById('partialAmount');
            if (partialAmount && partialAmount.value && this.value) {
                calculateAndDisplayCredit();
            }
        });
    }
}

function updateCustomerSelect() {
    const select = document.getElementById('customerSelect');
    if (!select) {
        console.error('عنصر customerSelect غير موجود');
        return;
    }
    
    select.innerHTML = '<option value="">اختر عميل...</option>';
    
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} - دين حالي: ${formatCurrency(customer.creditBalance || 0)}`;
        select.appendChild(option);
    });
    
    console.log(`تم تحديث قائمة العملاء: ${customers.length} عميل`);
}

function calculateAndDisplayCredit() {
    const customerId = parseInt(document.getElementById('customerSelect').value);
    const paidAmount = parseFloat(document.getElementById('partialAmount').value) || 0;
    const currency = document.getElementById('partialCurrency').value;
    
    if (!customerId || paidAmount <= 0) {
        document.getElementById('creditDetails').style.display = 'none';
        return;
    }
    
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    // حساب المبلغ الإجمالي للفاتورة
    const finalTotalText = document.getElementById('finalTotal').textContent;
    const cartCurrency = document.getElementById('currency').value;
    
    let totalDue;
    if (cartCurrency === 'USD') {
        totalDue = parseFloat(finalTotalText.replace('$', '').replace(',', ''));
    } else {
        totalDue = parseFloat(finalTotalText.replace(' ل.ل', '').replace(/,/g, '')) / settings.exchangeRate;
    }
    
    // تحويل المبلغ المدفوع إلى دولار للحساب
    let paidInUSD = paidAmount;
    if (currency === 'LBP') {
        paidInUSD = paidAmount / settings.exchangeRate;
    }
    
    const remainingDebt = totalDue - paidInUSD;
    const newTotalDebt = customer.creditBalance + remainingDebt;
    
    // التحقق من الحد الأقصى للدين
    const creditExceeded = newTotalDebt > customer.creditLimit;
    
    displayCreditDetails(customer, totalDue, paidInUSD, remainingDebt, newTotalDebt, creditExceeded, currency);
}

function displayCreditDetails(customer, totalDue, paidAmount, remainingDebt, newTotalDebt, creditExceeded, currency) {
    const creditDetailsDiv = document.getElementById('creditDetails');
    
    let html = `
        <div class="credit-summary">
            <h4><i class="fas fa-user-check"></i> تفاصيل حساب ${customer.name}</h4>
            <div class="credit-row">
                <span>إجمالي الفاتورة:</span>
                <span>${formatCurrency(totalDue)}</span>
            </div>
            <div class="credit-row">
                <span>المبلغ المدفوع:</span>
                <span>${formatCurrency(paidAmount, currency)}</span>
            </div>
            <div class="credit-row">
                <span>المبلغ المتبقي (دين جديد):</span>
                <span>${formatCurrency(remainingDebt)}</span>
            </div>
            <div class="credit-row">
                <span>الدين السابق:</span>
                <span>${formatCurrency(customer.creditBalance)}</span>
            </div>
            <div class="credit-row ${creditExceeded ? 'error' : 'success'}">
                <span>إجمالي الدين بعد المعاملة:</span>
                <span>${formatCurrency(newTotalDebt)}</span>
            </div>
            <div class="credit-row">
                <span>الحد الأقصى المسموح:</span>
                <span>${formatCurrency(customer.creditLimit)}</span>
            </div>
    `;
    
    if (creditExceeded) {
        const excess = newTotalDebt - customer.creditLimit;
        html += `
            <div class="credit-warning">
                <i class="fas fa-exclamation-triangle"></i>
                تحذير: الدين سيتجاوز الحد المسموح بمقدار ${formatCurrency(excess)}
            </div>
        `;
    } else {
        const available = customer.creditLimit - newTotalDebt;
        html += `
            <div class="credit-note">
                <i class="fas fa-info-circle"></i>
                سيتبقى ${formatCurrency(available)} من الحد الائتماني
            </div>
        `;
    }
    
    html += '</div>';
    
    creditDetailsDiv.innerHTML = html;
    creditDetailsDiv.style.display = 'block';
}

function addCreditToCustomer(customerId, amount, description) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        console.error(`العميل غير موجود: ${customerId}`);
        return false;
    }
    
    const oldBalance = customer.creditBalance || 0;
    customer.creditBalance = (customer.creditBalance || 0) + amount;
    
    if (!customer.creditHistory) {
        customer.creditHistory = [];
    }
    
    customer.creditHistory.push({
        date: new Date().toISOString().split('T')[0],
        type: 'purchase',
        amount: amount,
        description: description
    });
    
    console.log(`تحديث دين العميل ${customer.name}:`, {
        oldBalance: oldBalance,
        addedAmount: amount,
        newBalance: customer.creditBalance,
        creditLimit: customer.creditLimit
    });
    
    saveToStorage('customers', customers);
    return true;
}

function viewCreditHistory(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const modal = document.getElementById('reportModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.innerHTML = `<i class="fas fa-history"></i> تاريخ ديون ${customer.name}`;
    
    let html = `
        <div class="credit-history">
            <div class="credit-summary-card">
                <h3>ملخص الحساب</h3>
                <div class="summary-row">
                    <span>الدين الحالي:</span>
                    <span class="amount ${customer.creditBalance > 0 ? 'debt' : 'clear'}">
                        ${formatCurrency(customer.creditBalance)}
                    </span>
                </div>
                <div class="summary-row">
                    <span>الحد الائتماني:</span>
                    <span class="amount">${formatCurrency(customer.creditLimit)}</span>
                </div>
                <div class="summary-row">
                    <span>المتاح:</span>
                    <span class="amount">${formatCurrency(customer.creditLimit - customer.creditBalance)}</span>
                </div>
            </div>
            
            <h3>تاريخ المعاملات</h3>
            <div class="credit-history-table">
    `;
    
    if (customer.creditHistory && customer.creditHistory.length > 0) {
        html += `
            <table>
                <thead>
                    <tr>
                        <th>التاريخ</th>
                        <th>النوع</th>
                        <th>المبلغ</th>
                        <th>الوصف</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        customer.creditHistory.forEach(record => {
            const typeIcon = record.type === 'purchase' ? 'fas fa-shopping-cart' : 'fas fa-money-bill';
            const typeText = record.type === 'purchase' ? 'شراء' : 'دفع';
            html += `
                <tr>
                    <td>${record.date}</td>
                    <td><i class="${typeIcon}"></i> ${typeText}</td>
                    <td class="amount">${formatCurrency(record.amount)}</td>
                    <td>${record.description}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
    } else {
        html += '<p class="no-data">لا يوجد تاريخ معاملات</p>';
    }
    
    html += `
            </div>
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}

// مسح العربة
document.getElementById('clearCart').addEventListener('click', function() {
    cart = [];
    updateCart();
    showMessage('تم مسح العربة');
});

// وظائف صفحة الفواتير
function loadInvoices() {
    const invoicesTable = document.getElementById('invoicesTable');
    
    invoicesTable.innerHTML = sales.map(sale => {
        let status = 'نشطة';
        let statusClass = 'active';
        
        if (sale.cancelled) {
            status = 'ملغاة';
            statusClass = 'cancelled';
        } else if (sale.returned) {
            status = 'مرجعة';
            statusClass = 'returned';
        }
        
        return `
        <tr class="${sale.cancelled ? 'cancelled-row' : ''}">
            <td>${sale.invoiceNumber}</td>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td>${sale.paymentMethod}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewInvoice('${sale.invoiceNumber}')">عرض</button>
                ${!sale.cancelled && !sale.returned ? `
                <button class="action-btn return-btn" onclick="returnInvoice('${sale.invoiceNumber}')">إرجاع</button>
                ` : ''}
            </td>
        </tr>
        `;
    }).join('');
}

function returnInvoice(invoiceNumber) {
    const sale = sales.find(s => s.invoiceNumber === invoiceNumber);
    if (!sale) {
        showNotification('❌ الفاتورة غير موجودة', 'error');
        return;
    }
    
    if (sale.returned) {
        showNotification('❌ الفاتورة مرجعة مسبقاً', 'error');
        return;
    }
    
    if (sale.cancelled) {
        showNotification('❌ لا يمكن إرجاع فاتورة ملغاة', 'error');
        return;
    }
    
    // طلب كلمة المرور لإرجاع الفاتورة
    const password = prompt('🔒 أدخل كلمة المرور لإرجاع الفاتورة:');
    if (password !== '00') {
        showNotification('❌ كلمة المرور خاطئة! لا يمكن إرجاع الفاتورة.', 'error', 3000);
        return;
    }
    
    if (!confirm(`هل أنت متأكد من إرجاع الفاتورة ${invoiceNumber}؟\nسيتم رد المصاري للعميل وإرجاع المنتجات للمخزون.`)) {
        return;
    }
    
    // إرجاع الفاتورة
    sale.returned = true;
    sale.returnedDate = new Date().toISOString().split('T')[0];
    
    // إرجاع المنتجات للمخزون
    sale.items.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock += item.quantity;
        }
    });
    
    // إرجاع المبالغ المدفوعة للصندوق (عكس العملية)
    if (sale.cashDetails) {
        const currency = sale.cashDetails.paymentCurrency;
        const amount = sale.cashDetails.amountPaid;
        
        // إرجاع المبلغ للصندوق (إضافة وليس طرح!)
        if (currency === 'USD') {
            cashDrawer.cashUSD += amount;
        } else {
            cashDrawer.cashLBP += amount;
        }
        
        // إضافة معاملة إيداع للصندوق
        cashDrawer.transactions.push({
            date: new Date().toISOString(),
            type: 'deposit',
            amountUSD: currency === 'USD' ? amount : 0,
            amountLBP: currency === 'LBP' ? amount : 0,
            description: `إرجاع مبلغ فاتورة ملغاة ${invoiceNumber}`
        });
    }
    
    // إذا كان دفع جزئي، تقليل الدين من العميل
    if (sale.partialDetails) {
        const customer = customers.find(c => c.id === sale.customerId);
        if (customer) {
            const debtAmount = sale.partialDetails.debtAmount;
            customer.creditBalance = Math.max(0, customer.creditBalance - debtAmount);
            
            // إضافة سجل في تاريخ العميل
            if (!customer.creditHistory) customer.creditHistory = [];
            customer.creditHistory.push({
                date: new Date().toISOString().split('T')[0],
                type: 'cancellation',
                amount: -debtAmount,
                description: `إلغاء فاتورة ${invoiceNumber}`
            });
            
            // إرجاع المبلغ المدفوع للصندوق
            const currency = sale.partialDetails.paymentCurrency;
            const paidAmount = sale.partialDetails.amountPaid;
            
            // إرجاع المبلغ المدفوع للصندوق (إضافة وليس طرح!)
            if (currency === 'USD') {
                cashDrawer.cashUSD += paidAmount;
            } else {
                cashDrawer.cashLBP += paidAmount;
            }
            
            cashDrawer.transactions.push({
                date: new Date().toISOString(),
                type: 'deposit',
                amountUSD: currency === 'USD' ? paidAmount : 0,
                amountLBP: currency === 'LBP' ? paidAmount : 0,
                description: `إرجاع مبلغ مدفوع - فاتورة ملغاة ${invoiceNumber}`
            });
        }
    }
    
    // حفظ البيانات
    saveAllData();
    
    // تحديث الواجهات
    loadInvoices();
    updateCashDrawerDisplay();
    displayProducts();
    
    if (document.getElementById('customers').classList.contains('active')) {
        loadCustomers();
    }
    
    // إظهار إشعار مفصل
    let message = `✅ تم إرجاع الفاتورة ${invoiceNumber} بنجاح!

📦 المنتجات أُرجعت للمخزون`;
    
    if (sale.cashDetails) {
        const currency = sale.cashDetails.paymentCurrency;
        const amount = sale.cashDetails.amountPaid;
        message += `
💰 ${formatCurrency(amount, currency)} أُرجع للصندوق`;
    }
    
    if (sale.partialDetails) {
        const customer = customers.find(c => c.id === sale.customerId);
        const debtAmount = sale.partialDetails.debtAmount;
        const paidAmount = sale.partialDetails.amountPaid;
        const currency = sale.partialDetails.paymentCurrency;
        message += `
👤 ${customer?.name}: تم تقليل الدين ${formatCurrency(debtAmount)}
💰 ${formatCurrency(paidAmount, currency)} أُرجع للصندوق`;
    }
    
    showNotification(message, 'success', 6000);
}

function viewInvoice(invoiceNumber) {
    const sale = sales.find(s => s.invoiceNumber === invoiceNumber);
    if (sale) {
        showInvoice(sale);
    }
}

function filterInvoices() {
    const fromDate = document.getElementById('invoicesFromDate').value;
    const toDate = document.getElementById('invoicesToDate').value;
    
    let filteredSales = sales;
    
    if (fromDate) {
        filteredSales = filteredSales.filter(sale => sale.date >= fromDate);
    }
    
    if (toDate) {
        filteredSales = filteredSales.filter(sale => sale.date <= toDate);
    }
    
    displayFilteredInvoices(filteredSales);
}

function displayFilteredInvoices(filteredSales) {
    const invoicesTable = document.getElementById('invoicesTable');
    
    invoicesTable.innerHTML = filteredSales.map(sale => {
        const status = sale.cancelled ? 'ملغاة' : 'نشطة';
        const statusClass = sale.cancelled ? 'cancelled' : 'active';
        
        return `
        <tr class="${sale.cancelled ? 'cancelled-row' : ''}">
            <td>${sale.invoiceNumber}</td>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td>${sale.paymentMethod}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewInvoice('${sale.invoiceNumber}')">عرض</button>
                ${!sale.cancelled && !sale.returned ? `
                <button class="action-btn return-btn" onclick="returnInvoice('${sale.invoiceNumber}')">إرجاع</button>
                ` : ''}
            </td>
        </tr>
        `;
    }).join('');
}

// تحميل المنتجات
function loadProducts() {
    const tbody = document.getElementById('productsTable');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        const isLowStock = product.stock <= product.minStock;
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.barcode || 'غير محدد'}</td>
            <td>${product.supplier || 'غير محدد'}</td>
            <td>${formatCurrency(product.priceUSD)}</td>
            <td>${formatCurrency(product.priceLBP, 'LBP')}</td>
            <td ${isLowStock ? 'style="color: red; font-weight: bold;"' : ''}>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">تعديل</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">حذف</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// إضافة منتج جديد
document.getElementById('addProductBtn').addEventListener('click', function() {
    showModal('addProductModal');
    // تأكد من تشغيل الحساب التلقائي عند فتح النموذج
    setTimeout(() => {
        setupPriceCalculations();
        console.log('تم إعداد الحساب التلقائي للأسعار');
    }, 300);
});

// تم نقل معالج النموذج إلى الأسفل مع الحساب التلقائي

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        showMessage('المنتج غير موجود', 'error');
        return;
    }
    
    // طلب كلمة المرور لتعديل المنتج
    const password = prompt('🔒 أدخل كلمة المرور لتعديل المنتج:');
    if (password !== '00') {
        showNotification('❌ كلمة المرور خاطئة! لا يمكن تعديل المنتج.', 'error', 3000);
        return;
    }
    
    // ملء النموذج ببيانات المنتج الحالية
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductPriceUSD').value = product.priceUSD;
    document.getElementById('editProductPriceLBP').value = product.priceLBP;
    document.getElementById('editProductQuantity').value = product.stock;
    document.getElementById('editProductBarcode').value = product.barcode || '';
    
    // تحديث قائمة الموردين
    updateSuppliersDropdown('editProductSupplier');
    document.getElementById('editProductSupplier').value = product.supplier || '';
    
    // تخزين معرف المنتج الذي يتم تعديله
    document.getElementById('editProductForm').dataset.editId = id;
    
    showModal('editProductModal');
}

// معالج تعديل المنتج
document.getElementById('editProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const editId = parseInt(this.dataset.editId);
    const productIndex = products.findIndex(p => p.id === editId);
    
    if (productIndex === -1) {
        showMessage('خطأ في العثور على المنتج', 'error');
        return;
    }
    
    // تحديث بيانات المنتج
    products[productIndex] = {
        ...products[productIndex],
        name: document.getElementById('editProductName').value,
        category: document.getElementById('editProductCategory').value,
        priceUSD: parseFloat(document.getElementById('editProductPriceUSD').value),
        priceLBP: parseFloat(document.getElementById('editProductPriceLBP').value),
        stock: parseInt(document.getElementById('editProductQuantity').value),
        barcode: document.getElementById('editProductBarcode').value,
        supplier: document.getElementById('editProductSupplier').value
    };
    
    saveToStorage('products', products);
    loadProducts();
    hideModal('editProductModal');
    showMessage('تم تحديث المنتج بنجاح');
});

function updateSuppliersDropdown(selectId) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">اختر المورد</option>';
    
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.name;
        option.textContent = supplier.name;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

function deleteProduct(id) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== id);
        saveToStorage('products', products);
        loadProducts();
        showMessage('تم حذف المنتج');
    }
}

// تحميل المبيعات
function loadSales() {
    const tbody = document.getElementById('salesTable');
    tbody.innerHTML = '';
    
    sales.forEach(sale => {
        // تحديد حالة المبيعة
        let statusClass = 'status-completed';
        let statusText = 'مكتملة';
        
        if (sale.returned) {
            if (sale.returnType === 'full') {
                statusClass = 'status-returned';
                statusText = 'مرجعة كاملة';
            } else if (sale.returnType === 'partial') {
                statusClass = 'status-partial-return';
                statusText = 'مرجعة جزئياً';
            }
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.invoiceNumber}</td>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td>${sale.paymentMethod}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewSale(${sale.id})">
                    <i class="fas fa-eye"></i> عرض
                </button>
                ${!sale.returned ? 
                    `<button class="action-btn return-btn" onclick="initiateSaleReturn(${sale.id})">
                        <i class="fas fa-undo"></i> استرجاع
                    </button>` : 
                    `<button class="action-btn" disabled>
                        <i class="fas fa-check"></i> مرجعة
                    </button>`
                }
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function viewSale(id) {
    const sale = sales.find(s => s.id === id);
    if (sale) {
        showInvoice(sale);
    }
}

function showInvoice(sale) {
    const invoiceContent = document.getElementById('invoiceContent');
    
    const invoiceHTML = `
        <div class="invoice-header">
            <div class="store-info">
                <h2>${settings.storeName}</h2>
                <p>${settings.storeAddress}</p>
                <p>هاتف: ${settings.storePhone}</p>
            </div>
            <div class="invoice-info">
                <h3>فاتورة رقم: ${sale.invoiceNumber}</h3>
                <p>التاريخ: ${sale.date}</p>
                <p>العميل: ${sale.customer}</p>
                <p>طريقة الدفع: ${sale.paymentMethod}</p>
            </div>
        </div>
        
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>المنتج</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>المجموع</th>
                </tr>
            </thead>
            <tbody>
                ${sale.items ? sale.items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(item.price)}</td>
                        <td>${formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                `).join('') : ''}
            </tbody>
        </table>
        
        <div class="invoice-total">
            <div class="total-row">
                <span>المجموع الفرعي:</span>
                <span>${formatCurrency(sale.amount / 1.11)}</span>
            </div>
            <div class="total-row">
                <span>الضريبة (11%):</span>
                <span>${formatCurrency(sale.amount - (sale.amount / 1.11))}</span>
            </div>
            <div class="total-row final-total">
                <span>المجموع النهائي:</span>
                <span>${formatCurrency(sale.amount)}</span>
            </div>
        </div>
        
        ${sale.cashDetails ? `
            <div class="invoice-cash-details">
                <h5><i class="fas fa-money-bill-wave"></i> تفاصيل الدفع النقدي</h5>
                <div class="cash-detail-row">
                    <span>المبلغ المدفوع:</span>
                    <span>${formatCurrency(sale.cashDetails.amountPaid, sale.cashDetails.paymentCurrency)}</span>
                </div>
                <div class="cash-detail-row">
                    <span>الباقي:</span>
                    <span>${sale.cashDetails.change > 0 ? formatCurrency(sale.cashDetails.change, sale.cashDetails.paymentCurrency) : 'لا يوجد'}</span>
                </div>
            </div>
        ` : ''}
    `;
    
    invoiceContent.innerHTML = invoiceHTML;
    showModal('invoiceModal');
}

// طباعة الفاتورة
document.getElementById('printInvoiceBtn').addEventListener('click', function() {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>طباعة الفاتورة</title>
            <style>
                body { font-family: 'Arial', sans-serif; direction: rtl; margin: 20px; }
                .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .store-info h2 { margin: 0; color: #333; }
                .store-info p { margin: 5px 0; color: #666; }
                .invoice-info h3 { margin: 0; color: #333; }
                .invoice-info p { margin: 5px 0; color: #666; }
                .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .invoice-table th, .invoice-table td { padding: 10px; border: 1px solid #ddd; text-align: right; }
                .invoice-table th { background: #f8f9fa; font-weight: bold; }
                .invoice-total { margin-top: 30px; }
                .total-row { display: flex; justify-content: space-between; margin: 10px 0; }
                .final-total { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${invoiceContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
});

// تم استبدال دالة حذف المبيعات بنظام الاسترجاع الاحترافي

// إحصائيات المرتجعات
function getReturnStatistics() {
    const totalSales = sales.length;
    const returnedSales = sales.filter(s => s.returned).length;
    const fullReturns = sales.filter(s => s.returned && s.returnType === 'full').length;
    const partialReturns = sales.filter(s => s.returned && s.returnType === 'partial').length;
    
    const totalReturnAmount = sales
        .filter(s => s.returned)
        .reduce((sum, sale) => sum + (sale.returnAmount || 0), 0);
    
    return {
        totalSales,
        returnedSales,
        fullReturns,
        partialReturns,
        totalReturnAmount,
        returnRate: totalSales > 0 ? ((returnedSales / totalSales) * 100).toFixed(2) : 0
    };
}

// تحميل العملاء
function loadCustomers() {
    const tbody = document.getElementById('customersTable');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        const creditStatus = customer.creditBalance > 0 ? 'debt' : 'clear';
        const creditPercent = Math.min(((customer.creditBalance || 0) / (customer.creditLimit || 1)) * 100, 100);
        
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address || 'غير محدد'}</td>
            <td>${formatCurrency(customer.totalPurchases)}</td>
            <td>${customer.loyaltyPoints}</td>
            <td class="credit-${creditStatus}">
                ${formatCurrency(customer.creditBalance || 0)}
                ${customer.creditBalance > 0 ? `<small>(${creditPercent.toFixed(0)}%)</small>` : ''}
            </td>
            <td>${formatCurrency(customer.creditLimit || 0)}</td>
            <td>${customer.dateJoined || 'غير محدد'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editCustomer(${customer.id})">تعديل</button>
                <button class="action-btn delete-btn" onclick="deleteCustomer(${customer.id})">حذف</button>
                ${customer.creditBalance > 0 ? `
                <button class="action-btn view-btn" onclick="viewCreditHistory(${customer.id})">التاريخ</button>
                ` : ''}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// إضافة عميل جديد
document.getElementById('addCustomerBtn').addEventListener('click', function() {
    showModal('addCustomerModal');
});

document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newCustomer = {
        id: Math.max(...customers.map(c => c.id), 0) + 1,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        totalPurchases: 0,
        loyaltyPoints: 0,
        creditBalance: 0,
        creditLimit: parseFloat(document.getElementById('customerCreditLimit').value) || 500,
        creditHistory: [],
        dateJoined: new Date().toISOString().split('T')[0]
    };
    
    customers.push(newCustomer);
    saveToStorage('customers', customers);
    loadCustomers();
    hideModal('addCustomerModal');
    this.reset();
    
    showMessage('تم إضافة العميل بنجاح');
});

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) {
        showMessage('العميل غير موجود', 'error');
        return;
    }
    
    // ملء النموذج ببيانات العميل الحالية
    document.getElementById('editCustomerName').value = customer.name;
    document.getElementById('editCustomerEmail').value = customer.email;
    document.getElementById('editCustomerPhone').value = customer.phone;
    document.getElementById('editCustomerAddress').value = customer.address || '';
    document.getElementById('editCustomerCreditLimit').value = customer.creditLimit || 500;
    
    // تخزين معرف العميل الذي يتم تعديله
    document.getElementById('editCustomerForm').dataset.editId = id;
    
    showModal('editCustomerModal');
}

// معالج تعديل العميل
document.getElementById('editCustomerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const editId = parseInt(this.dataset.editId);
    const customerIndex = customers.findIndex(c => c.id === editId);
    
    if (customerIndex === -1) {
        showMessage('خطأ في العثور على العميل', 'error');
        return;
    }
    
    // تحديث بيانات العميل
    customers[customerIndex] = {
        ...customers[customerIndex],
        name: document.getElementById('editCustomerName').value,
        email: document.getElementById('editCustomerEmail').value,
        phone: document.getElementById('editCustomerPhone').value,
        address: document.getElementById('editCustomerAddress').value,
        creditLimit: parseFloat(document.getElementById('editCustomerCreditLimit').value) || 500
    };
    
    saveToStorage('customers', customers);
    loadCustomers();
    hideModal('editCustomerModal');
    showMessage('تم تحديث العميل بنجاح');
});

function deleteCustomer(id) {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
        customers = customers.filter(c => c.id !== id);
        saveToStorage('customers', customers);
        loadCustomers();
        showMessage('تم حذف العميل');
    }
}

// تحميل الموردين
function loadSuppliers() {
    const tbody = document.getElementById('suppliersTable');
    tbody.innerHTML = '';
    
    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.email}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.address}</td>
            <td>${supplier.contactPerson}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editSupplier(${supplier.id})">تعديل</button>
                <button class="action-btn delete-btn" onclick="deleteSupplier(${supplier.id})">حذف</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// إضافة مورد جديد
document.getElementById('addSupplierBtn').addEventListener('click', function() {
    showModal('addSupplierModal');
});

document.getElementById('addSupplierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newSupplier = {
        id: Math.max(...suppliers.map(s => s.id), 0) + 1,
        name: document.getElementById('supplierName').value,
        email: document.getElementById('supplierEmail').value,
        phone: document.getElementById('supplierPhone').value,
        address: document.getElementById('supplierAddress').value,
        contactPerson: document.getElementById('supplierContact').value
    };
    
    suppliers.push(newSupplier);
    saveToStorage('suppliers', suppliers);
    loadSuppliers();
    updateSuppliersDropdown('productSupplier');
    updateSuppliersDropdown('editProductSupplier');
    hideModal('addSupplierModal');
    this.reset();
    
    showMessage('تم إضافة المورد بنجاح');
});

function editSupplier(id) {
    showMessage('ميزة تعديل الموردين قيد التطوير', 'error');
}

function deleteSupplier(id) {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
        suppliers = suppliers.filter(s => s.id !== id);
        saveToStorage('suppliers', suppliers);
        loadSuppliers();
        updateSuppliersDropdown('productSupplier');
        updateSuppliersDropdown('editProductSupplier');
        showMessage('تم حذف المورد');
    }
}

// تحميل الإعدادات
function loadSettings() {
    document.getElementById('storeName').value = settings.storeName;
    document.getElementById('storeAddress').value = settings.storeAddress;
    document.getElementById('storePhone').value = settings.storePhone;
    document.getElementById('exchangeRateInput').value = settings.exchangeRate;
    document.getElementById('taxRate').value = settings.taxRate;
    document.getElementById('lowStockThreshold').value = settings.lowStockThreshold || 10;
    document.getElementById('lowStockAlertCheckbox').checked = settings.lowStockAlert !== false;
    
    // إظهار/إخفاء مجموعة حد التحذير
    toggleStockThresholdGroup();
    
    // تحديث عرض الصندوق الحالي
    updateCashDrawerSettings();
}

function toggleStockThresholdGroup() {
    const checkbox = document.getElementById('lowStockAlertCheckbox');
    const group = document.getElementById('stockThresholdGroup');
    if (group) {
        group.style.display = checkbox && checkbox.checked ? 'block' : 'none';
    }
}

function updateCashDrawerSettings() {
    document.getElementById('currentUSD').textContent = formatCurrency(cashDrawer.cashUSD, 'USD');
    document.getElementById('currentLBP').textContent = formatCurrency(cashDrawer.cashLBP, 'LBP');
    document.getElementById('editCashUSD').value = cashDrawer.cashUSD;
    document.getElementById('editCashLBP').value = cashDrawer.cashLBP;
}

// تحديث سعر الصرف
document.getElementById('updateExchangeRate').addEventListener('click', function() {
    const newRate = parseFloat(document.getElementById('exchangeRateInput').value);
    if (newRate > 0) {
        settings.exchangeRate = newRate;
        document.getElementById('exchangeRate').textContent = `سعر الصرف: ${newRate.toLocaleString()} ل.ل`;
        showMessage('تم تحديث سعر الصرف بنجاح');
    } else {
        showMessage('يرجى إدخال سعر صرف صحيح', 'error');
    }
});

// تحديث معدل الضريبة
document.getElementById('updateTaxRate').addEventListener('click', function() {
    const newRate = parseFloat(document.getElementById('taxRate').value);
    if (newRate >= 0 && newRate <= 100) {
        settings.taxRate = newRate;
        showMessage('تم تحديث معدل الضريبة بنجاح');
    } else {
        showMessage('يرجى إدخال معدل ضريبة صحيح (0-100)', 'error');
    }
});

// إدارة النوافذ المنبثقة
function showModal(modalId) {
    document.getElementById('overlay').classList.add('active');
    document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById(modalId).classList.remove('active');
}

// إغلاق النوافذ المنبثقة
document.getElementById('overlay').addEventListener('click', function() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    this.classList.remove('active');
});

document.querySelectorAll('.close-btn, .cancel-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            hideModal(modal.id);
        }
    });
});

// تحديث أسعار المنتجات عند تغيير العملة
function updateProductPrices() {
    displayProducts();
}

// إعداد التواريخ الافتراضية
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFrom').value = today;
    document.getElementById('dateTo').value = today;
});

// تصفية المبيعات
document.getElementById('filterSales').addEventListener('click', function() {
    loadSales(); // في التطبيق الحقيقي، ستتم التصفية حسب التواريخ
    showMessage('تم تطبيق التصفية');
});

// تقارير
document.querySelectorAll('.report-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        switch(index) {
            case 0: // تقرير المبيعات
                showSalesReport();
                break;
            case 1: // تقرير المخزون
                showInventoryReport();
                break;
            case 2: // تقرير العملاء
                showCustomersReport();
                break;
            case 3: // التقرير المالي
                showFinancialReport();
                break;
        }
    });
});

function showSalesReport() {
    const reportContent = document.getElementById('reportContent');
    const reportTitle = document.getElementById('reportTitle');
    
    reportTitle.textContent = 'تقرير المبيعات';
    
    const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalTransactions = sales.length;
    const averageTransaction = totalSales / totalTransactions || 0;
    
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(sale => sale.date === today);
    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.amount, 0);
    
    const reportHTML = `
        <div class="report-stats">
            <div class="stat-item">
                <h4>إجمالي المبيعات</h4>
                <p class="stat-value">${formatCurrency(totalSales)}</p>
            </div>
            <div class="stat-item">
                <h4>عدد المعاملات</h4>
                <p class="stat-value">${totalTransactions}</p>
            </div>
            <div class="stat-item">
                <h4>متوسط المعاملة</h4>
                <p class="stat-value">${formatCurrency(averageTransaction)}</p>
            </div>
            <div class="stat-item">
                <h4>مبيعات اليوم</h4>
                <p class="stat-value">${formatCurrency(todayRevenue)}</p>
            </div>
        </div>
        
        <table class="report-table">
            <thead>
                <tr>
                    <th>رقم الفاتورة</th>
                    <th>التاريخ</th>
                    <th>العميل</th>
                    <th>المبلغ</th>
                    <th>طريقة الدفع</th>
                </tr>
            </thead>
            <tbody>
                ${sales.map(sale => `
                    <tr>
                        <td>${sale.invoiceNumber}</td>
                        <td>${sale.date}</td>
                        <td>${sale.customer}</td>
                        <td>${formatCurrency(sale.amount)}</td>
                        <td>${sale.paymentMethod}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    reportContent.innerHTML = reportHTML;
    showModal('reportModal');
}

function showInventoryReport() {
    const reportContent = document.getElementById('reportContent');
    const reportTitle = document.getElementById('reportTitle');
    
    reportTitle.textContent = 'تقرير المخزون';
    
    const totalProducts = products.length;
    const totalStockValue = products.reduce((sum, product) => sum + (product.stock * product.priceUSD), 0);
    const lowStockProducts = products.filter(product => product.stock <= product.minStock);
    
    const reportHTML = `
        <div class="report-stats">
            <div class="stat-item">
                <h4>إجمالي المنتجات</h4>
                <p class="stat-value">${totalProducts}</p>
            </div>
            <div class="stat-item">
                <h4>قيمة المخزون</h4>
                <p class="stat-value">${formatCurrency(totalStockValue)}</p>
            </div>
            <div class="stat-item">
                <h4>منتجات منخفضة المخزون</h4>
                <p class="stat-value">${lowStockProducts.length}</p>
            </div>
        </div>
        
        <h4>المنتجات منخفضة المخزون:</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>اسم المنتج</th>
                    <th>المخزون الحالي</th>
                    <th>الحد الأدنى</th>
                    <th>الحالة</th>
                </tr>
            </thead>
            <tbody>
                ${lowStockProducts.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td style="color: red; font-weight: bold;">${product.stock}</td>
                        <td>${product.minStock}</td>
                        <td><span class="status-badge low-stock">مخزون منخفض</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <h4>جميع المنتجات:</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>اسم المنتج</th>
                    <th>التصنيف</th>
                    <th>المخزون</th>
                    <th>السعر</th>
                    <th>القيمة الإجمالية</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td ${product.stock <= product.minStock ? 'style="color: red; font-weight: bold;"' : ''}>${product.stock}</td>
                        <td>${formatCurrency(product.priceUSD)}</td>
                        <td>${formatCurrency(product.stock * product.priceUSD)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    reportContent.innerHTML = reportHTML;
    showModal('reportModal');
}

function showCustomersReport() {
    const reportContent = document.getElementById('reportContent');
    const reportTitle = document.getElementById('reportTitle');
    
    reportTitle.textContent = 'تقرير العملاء';
    
    const totalCustomers = customers.length;
    const totalCustomerPurchases = customers.reduce((sum, customer) => sum + customer.totalPurchases, 0);
    const averagePurchase = totalCustomerPurchases / totalCustomers || 0;
    const topCustomer = customers.reduce((prev, current) => 
        (prev.totalPurchases > current.totalPurchases) ? prev : current, customers[0]);
    
    const reportHTML = `
        <div class="report-stats">
            <div class="stat-item">
                <h4>إجمالي العملاء</h4>
                <p class="stat-value">${totalCustomers}</p>
            </div>
            <div class="stat-item">
                <h4>إجمالي مشتريات العملاء</h4>
                <p class="stat-value">${formatCurrency(totalCustomerPurchases)}</p>
            </div>
            <div class="stat-item">
                <h4>متوسط المشتريات</h4>
                <p class="stat-value">${formatCurrency(averagePurchase)}</p>
            </div>
            <div class="stat-item">
                <h4>أفضل عميل</h4>
                <p class="stat-value">${topCustomer ? topCustomer.name : 'لا يوجد'}</p>
            </div>
        </div>
        
        <table class="report-table">
            <thead>
                <tr>
                    <th>اسم العميل</th>
                    <th>البريد الإلكتروني</th>
                    <th>الهاتف</th>
                    <th>إجمالي المشتريات</th>
                    <th>نقاط الولاء</th>
                    <th>تاريخ الانضمام</th>
                </tr>
            </thead>
            <tbody>
                ${customers.sort((a, b) => b.totalPurchases - a.totalPurchases).map(customer => `
                    <tr>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${formatCurrency(customer.totalPurchases)}</td>
                        <td>${customer.loyaltyPoints}</td>
                        <td>${customer.dateJoined || 'غير محدد'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    reportContent.innerHTML = reportHTML;
    showModal('reportModal');
}

function showFinancialReport() {
    const reportContent = document.getElementById('reportContent');
    const reportTitle = document.getElementById('reportTitle');
    
    reportTitle.textContent = 'التقرير المالي';
    
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalTax = totalRevenue * 0.11;
    const netRevenue = totalRevenue - totalTax;
    const totalStockValue = products.reduce((sum, product) => sum + (product.stock * product.priceUSD), 0);
    
    // حساب المبيعات حسب طريقة الدفع
    const paymentMethods = {};
    sales.forEach(sale => {
        paymentMethods[sale.paymentMethod] = (paymentMethods[sale.paymentMethod] || 0) + sale.amount;
    });
    
    const reportHTML = `
        <div class="report-stats">
            <div class="stat-item">
                <h4>إجمالي الإيرادات</h4>
                <p class="stat-value">${formatCurrency(totalRevenue)}</p>
            </div>
            <div class="stat-item">
                <h4>إجمالي الضرائب</h4>
                <p class="stat-value">${formatCurrency(totalTax)}</p>
            </div>
            <div class="stat-item">
                <h4>صافي الإيرادات</h4>
                <p class="stat-value">${formatCurrency(netRevenue)}</p>
            </div>
            <div class="stat-item">
                <h4>قيمة المخزون</h4>
                <p class="stat-value">${formatCurrency(totalStockValue)}</p>
            </div>
        </div>
        
        <h4>المبيعات حسب طريقة الدفع:</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>طريقة الدفع</th>
                    <th>المبلغ</th>
                    <th>النسبة</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(paymentMethods).map(([method, amount]) => `
                    <tr>
                        <td>${method}</td>
                        <td>${formatCurrency(amount)}</td>
                        <td>${((amount / totalRevenue) * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <h4>المبيعات الشهرية:</h4>
        <div class="monthly-sales">
            <p>هذه الميزة قيد التطوير - ستتضمن رسوماً بيانية تفاعلية</p>
        </div>
    `;
    
    reportContent.innerHTML = reportHTML;
    showModal('reportModal');
}

// إعداد أحداث النسخ الاحتياطي والاستيراد
document.getElementById('exportDataBtn').addEventListener('click', exportData);
document.getElementById('importFile').addEventListener('change', importData);
document.getElementById('clearDataBtn').addEventListener('click', clearStorage);

// إعداد إعدادات النسخ الاحتياطي التلقائي
document.getElementById('autoBackupCheckbox').addEventListener('change', function() {
    settings.autoBackup = this.checked;
    saveToStorage('settings', settings);
    showMessage(this.checked ? 'تم تفعيل النسخ الاحتياطي التلقائي' : 'تم إلغاء النسخ الاحتياطي التلقائي');
});

// تصفية المبيعات بالتاريخ
document.getElementById('filterSales').addEventListener('click', function() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredSales = [...sales];
    
    // فلترة حسب التاريخ
    if (dateFrom && dateTo) {
        filteredSales = filteredSales.filter(sale => {
            const saleDate = new Date(sale.date);
            const fromDate = new Date(dateFrom);
            const toDate = new Date(dateTo);
            
            return saleDate >= fromDate && saleDate <= toDate;
        });
    }
    
    // فلترة حسب الحالة
    if (statusFilter !== 'all') {
        filteredSales = filteredSales.filter(sale => {
            switch(statusFilter) {
                case 'completed':
                    return !sale.returned;
                case 'returned':
                    return sale.returned && sale.returnType === 'full';
                case 'partial':
                    return sale.returned && sale.returnType === 'partial';
                default:
                    return true;
            }
        });
    }
    
    displayFilteredSales(filteredSales);
    
    // إظهار إحصائيات الفلترة
    const statusText = {
        'all': 'جميع المبيعات',
        'completed': 'المبيعات المكتملة',
        'returned': 'المبيعات المرجعة كاملة',
        'partial': 'المبيعات المرجعة جزئياً'
    };
    
    showMessage(`تم العثور على ${filteredSales.length} من ${statusText[statusFilter]} ${dateFrom && dateTo ? 'في الفترة المحددة' : ''}`);
});

// زر إعادة تعيين الفلترة
document.addEventListener('DOMContentLoaded', function() {
    const resetFilterBtn = document.getElementById('resetFilter');
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            document.getElementById('dateFrom').value = '';
            document.getElementById('dateTo').value = '';
            document.getElementById('statusFilter').value = 'all';
            loadSales();
            showMessage('تم إعادة تعيين الفلترة');
        });
    }
});

function filterSalesByDate(dateFrom, dateTo) {
    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        
        return saleDate >= fromDate && saleDate <= toDate;
    });
    
    displayFilteredSales(filteredSales);
    showMessage(`تم العثور على ${filteredSales.length} معاملة في الفترة المحددة`);
}

function displayFilteredSales(filteredSales) {
    const tbody = document.getElementById('salesTable');
    tbody.innerHTML = '';
    
    filteredSales.forEach(sale => {
        // تحديد حالة المبيعة
        let statusClass = 'status-completed';
        let statusText = 'مكتملة';
        
        if (sale.returned) {
            if (sale.returnType === 'full') {
                statusClass = 'status-returned';
                statusText = 'مرجعة كاملة';
            } else if (sale.returnType === 'partial') {
                statusClass = 'status-partial-return';
                statusText = 'مرجعة جزئياً';
            }
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.invoiceNumber}</td>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td>${sale.paymentMethod}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewSale(${sale.id})">
                    <i class="fas fa-eye"></i> عرض
                </button>
                ${!sale.returned ? 
                    `<button class="action-btn return-btn" onclick="initiateSaleReturn(${sale.id})">
                        <i class="fas fa-undo"></i> استرجاع
                    </button>` : 
                    `<button class="action-btn" disabled>
                        <i class="fas fa-check"></i> مرجعة
                    </button>`
                }
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// دعم البحث بالباركود
document.getElementById('productSearch').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            searchByBarcode(searchTerm);
        }
    }
});

function searchByBarcode(barcode) {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
        addToCart(product);
        document.getElementById('productSearch').value = '';
        showMessage(`تم إضافة ${product.name} إلى العربة بالباركود`);
    } else {
        // البحث بالاسم كما هو موجود
        displayProducts(barcode.toLowerCase());
    }
}

// تحديث قوائم الموردين عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFrom').value = today;
    document.getElementById('dateTo').value = today;
    
    // تحديث قوائم الموردين
    updateSuppliersDropdown('productSupplier');
    updateSuppliersDropdown('editProductSupplier');
    
    // تحديث حالة النسخ الاحتياطي التلقائي
    document.getElementById('autoBackupCheckbox').checked = settings.autoBackup;

console.log('نظام إدارة المبيعات جاهز للاستخدام!');
});

// إضافة معالج للحساب التلقائي للأسعار
function setupPriceCalculations() {
    const exchangeRate = settings.exchangeRate;
    
    // عرض سعر الصرف الحالي
    const exchangeRateDisplay = document.getElementById('currentExchangeRate');
    if (exchangeRateDisplay) {
        exchangeRateDisplay.textContent = exchangeRate.toLocaleString();
    }
    
    // دالة لحساب وعرض السعر بالليرة
    function calculateAndDisplayLBP(usdInput, lbpDisplay) {
        if (!usdInput || !lbpDisplay) return;
        const usdPrice = parseFloat(usdInput.value) || 0;
        const lbpPrice = Math.round(usdPrice * exchangeRate);
        lbpDisplay.textContent = lbpPrice > 0 ? lbpPrice.toLocaleString() : '--';
    }
    
    // ربط المدخلات بالحساب التلقائي مع تأخير للتأكد من وجود العناصر
    setTimeout(() => {
        const retailUSDInput = document.getElementById('productRetailUSD');
        const wholesaleUSDInput = document.getElementById('productWholesaleUSD');
        const vipUSDInput = document.getElementById('productVipUSD');
        
        const retailLBPDisplay = document.getElementById('retailLBPDisplay');
        const wholesaleLBPDisplay = document.getElementById('wholesaleLBPDisplay');
        const vipLBPDisplay = document.getElementById('vipLBPDisplay');
        
        if (retailUSDInput && retailLBPDisplay) {
            // إزالة المستمع القديم إن وجد
            retailUSDInput.removeEventListener('input', retailUSDInput._handler);
            retailUSDInput._handler = () => calculateAndDisplayLBP(retailUSDInput, retailLBPDisplay);
            retailUSDInput.addEventListener('input', retailUSDInput._handler);
        }
        
        if (wholesaleUSDInput && wholesaleLBPDisplay) {
            wholesaleUSDInput.removeEventListener('input', wholesaleUSDInput._handler);
            wholesaleUSDInput._handler = () => calculateAndDisplayLBP(wholesaleUSDInput, wholesaleLBPDisplay);
            wholesaleUSDInput.addEventListener('input', wholesaleUSDInput._handler);
        }
        
        if (vipUSDInput && vipLBPDisplay) {
            vipUSDInput.removeEventListener('input', vipUSDInput._handler);
            vipUSDInput._handler = () => calculateAndDisplayLBP(vipUSDInput, vipLBPDisplay);
            vipUSDInput.addEventListener('input', vipUSDInput._handler);
        }
    }, 200);
}

// استدعاء الدالة عند تحميل الصفحة وإعداد معالج النموذج
document.addEventListener('DOMContentLoaded', function() {
    setupPriceCalculations();
    
    // إعداد معالج حفظ المنتج
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('تم الضغط على زر الحفظ');
            
            // التحقق من وجود الحقول
            const retailUSDInput = document.getElementById('productRetailUSD');
            const wholesaleUSDInput = document.getElementById('productWholesaleUSD');
            const vipUSDInput = document.getElementById('productVipUSD');
            
            if (!retailUSDInput || !wholesaleUSDInput || !vipUSDInput) {
                showMessage('خطأ: لا يمكن العثور على حقول الأسعار', 'error');
                return;
            }
            
            const retailUSD = parseFloat(retailUSDInput.value);
            const wholesaleUSD = parseFloat(wholesaleUSDInput.value);
            const vipUSD = parseFloat(vipUSDInput.value);
            
            console.log('الأسعار المدخلة:', { retailUSD, wholesaleUSD, vipUSD });
            
            // التحقق من صحة الأسعار
            if (isNaN(retailUSD) || isNaN(wholesaleUSD) || isNaN(vipUSD)) {
                showMessage('يرجى إدخال أسعار صحيحة لجميع الأنواع', 'error');
                return;
            }
            
            if (wholesaleUSD >= retailUSD) {
                showMessage('سعر الجملة يجب أن يكون أقل من سعر المفرق', 'error');
                return;
            }
            
            if (vipUSD < wholesaleUSD || vipUSD >= retailUSD) {
                showMessage('سعر الزبون المميز يجب أن يكون بين سعر الجملة وسعر المفرق', 'error');
                return;
            }
            
            const exchangeRate = settings.exchangeRate;
            console.log('سعر الصرف:', exchangeRate);
            
            const newProduct = {
                id: Math.max(...products.map(p => p.id), 0) + 1,
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                prices: {
                    retail: {
                        USD: retailUSD,
                        LBP: Math.round(retailUSD * exchangeRate)
                    },
                    wholesale: {
                        USD: wholesaleUSD,
                        LBP: Math.round(wholesaleUSD * exchangeRate)
                    },
                    vip: {
                        USD: vipUSD,
                        LBP: Math.round(vipUSD * exchangeRate)
                    }
                },
                // للتوافق مع الكود القديم - استخدام سعر المفرق
                priceUSD: retailUSD,
                priceLBP: Math.round(retailUSD * exchangeRate),
                stock: parseInt(document.getElementById('productQuantity').value),
                barcode: document.getElementById('productBarcode').value,
                supplier: document.getElementById('productSupplier').value,
                minStock: 5
            };
            
            console.log('المنتج الجديد:', newProduct);
            
            products.push(newProduct);
            saveToStorage('products', products);
            loadProducts();
            hideModal('addProductModal');
            this.reset();
            
            // مسح شاشات العرض
            const retailDisplay = document.getElementById('retailLBPDisplay');
            const wholesaleDisplay = document.getElementById('wholesaleLBPDisplay');
            const vipDisplay = document.getElementById('vipLBPDisplay');
            
            if (retailDisplay) retailDisplay.textContent = '--';
            if (wholesaleDisplay) wholesaleDisplay.textContent = '--';
            if (vipDisplay) vipDisplay.textContent = '--';
            
            showMessage('تم إضافة المنتج بنجاح! تم حساب الأسعار بالليرة تلقائياً 🎉');
            console.log('تم حفظ المنتج بنجاح');
        });
    }
});

// نظام استرجاع المبيعات
let currentSaleForReturn = null;

function initiateSaleReturn(saleId) {
    currentSaleForReturn = sales.find(s => s.id === saleId);
    if (!currentSaleForReturn) {
        showMessage('لم يتم العثور على المبيعة', 'error');
        return;
    }
    
    if (currentSaleForReturn.returned) {
        showMessage('هذه المبيعة مرجعة مسبقاً', 'error');
        return;
    }
    
    // ملء بيانات المبيعة
    document.getElementById('returnInvoiceNumber').textContent = currentSaleForReturn.invoiceNumber;
    document.getElementById('returnCustomerName').textContent = currentSaleForReturn.customer;
    document.getElementById('returnTotalAmount').textContent = formatCurrency(currentSaleForReturn.amount);
    
    // عرض طريقة الدفع مع التفاصيل
    let paymentMethodText = currentSaleForReturn.paymentMethod;
    if (currentSaleForReturn.cashDetails) {
        const currency = currentSaleForReturn.cashDetails.paymentCurrency;
        const paid = currentSaleForReturn.cashDetails.amountPaid;
        if (currency === 'USD') {
            paymentMethodText += ` ($${paid.toFixed(2)})`;
        } else {
            paymentMethodText += ` (${paid.toLocaleString()} ل.ل)`;
        }
    } else if (currentSaleForReturn.partialDetails) {
        const currency = currentSaleForReturn.partialDetails.paymentCurrency;
        const paid = currentSaleForReturn.partialDetails.amountPaid;
        if (currency === 'USD') {
            paymentMethodText += ` - مدفوع: $${paid.toFixed(2)}`;
        } else {
            paymentMethodText += ` - مدفوع: ${paid.toLocaleString()} ل.ل`;
        }
    }
    document.getElementById('returnPaymentMethod').textContent = paymentMethodText;
    
    // إعادة تعيين النموذج
    document.getElementById('returnType').value = 'full';
    document.getElementById('partialReturnAmount').value = '';
    document.getElementById('returnReason').value = 'defective';
    document.getElementById('returnNotes').value = '';
    document.getElementById('partialAmountGroup').style.display = 'none';
    
    // تحديث ملخص الاسترجاع
    updateReturnSummary();
    
    // عرض النافذة
    showModal('returnSaleModal');
}

function updateReturnSummary() {
    if (!currentSaleForReturn) return;
    
    const returnType = document.getElementById('returnType').value;
    const partialAmount = parseFloat(document.getElementById('partialReturnAmount').value) || 0;
    
    let refundDisplayText = '';
    let refundMethodText = '';
    
    if (currentSaleForReturn.cashDetails) {
        // مبيعة نقدية
        const originalCurrency = currentSaleForReturn.cashDetails.paymentCurrency;
        const originalPaid = currentSaleForReturn.cashDetails.amountPaid;
        
        if (returnType === 'full') {
            if (originalCurrency === 'USD') {
                refundDisplayText = `$${originalPaid.toFixed(2)}`;
            } else {
                refundDisplayText = `${originalPaid.toLocaleString()} ل.ل`;
            }
        } else if (returnType === 'partial') {
            const refundRatio = partialAmount / currentSaleForReturn.amount;
            const refundInOriginalCurrency = originalPaid * refundRatio;
            
            if (originalCurrency === 'USD') {
                refundDisplayText = `$${refundInOriginalCurrency.toFixed(2)}`;
            } else {
                refundDisplayText = `${refundInOriginalCurrency.toLocaleString()} ل.ل`;
            }
        }
        refundMethodText = 'نقدي';
        
    } else if (currentSaleForReturn.partialDetails) {
        // مبيعة جزئية
        const originalCurrency = currentSaleForReturn.partialDetails.paymentCurrency;
        const originalPaid = currentSaleForReturn.partialDetails.amountPaid;
        
        if (returnType === 'full') {
            if (originalCurrency === 'USD') {
                refundDisplayText = `$${originalPaid.toFixed(2)}`;
            } else {
                refundDisplayText = `${originalPaid.toLocaleString()} ل.ل`;
            }
        } else if (returnType === 'partial') {
            const refundRatio = partialAmount / currentSaleForReturn.amount;
            const refundInOriginalCurrency = Math.min(originalPaid * refundRatio, originalPaid);
            
            if (originalCurrency === 'USD') {
                refundDisplayText = `$${refundInOriginalCurrency.toFixed(2)}`;
            } else {
                refundDisplayText = `${refundInOriginalCurrency.toLocaleString()} ل.ل`;
            }
        }
        refundMethodText = 'نقدي (من المبلغ المدفوع)';
        
    } else {
        // مبيعة قديمة - افتراض
        let refundAmount = 0;
        if (returnType === 'full') {
            refundAmount = currentSaleForReturn.amount;
        } else if (returnType === 'partial') {
            refundAmount = Math.min(partialAmount, currentSaleForReturn.amount);
        }
        
        if (currentSaleForReturn.amount < 50) {
            refundDisplayText = `$${refundAmount.toFixed(2)}`;
        } else {
            refundDisplayText = `${(refundAmount * settings.exchangeRate).toLocaleString()} ل.ل`;
        }
        refundMethodText = 'نقدي';
    }
    
    document.getElementById('refundAmount').textContent = refundDisplayText;
    document.getElementById('refundMethod').textContent = refundMethodText;
}

function processReturn() {
    if (!currentSaleForReturn) {
        showMessage('خطأ في البيانات', 'error');
        return;
    }
    
    const returnType = document.getElementById('returnType').value;
    const partialAmount = parseFloat(document.getElementById('partialReturnAmount').value) || 0;
    const returnReason = document.getElementById('returnReason').value;
    const returnNotes = document.getElementById('returnNotes').value;
    
    // التحقق من صحة البيانات
    if (returnType === 'partial' && (partialAmount <= 0 || partialAmount > currentSaleForReturn.amount)) {
        showMessage('مبلغ الاسترجاع الجزئي غير صحيح', 'error');
        return;
    }
    
    // حساب مبلغ الاسترجاع
    let refundAmount = returnType === 'full' ? currentSaleForReturn.amount : partialAmount;
    
    // تحديث بيانات المبيعة
    currentSaleForReturn.returned = true;
    currentSaleForReturn.returnType = returnType;
    currentSaleForReturn.returnAmount = refundAmount;
    currentSaleForReturn.returnDate = new Date().toISOString().split('T')[0];
    currentSaleForReturn.returnReason = returnReason;
    currentSaleForReturn.returnNotes = returnNotes;
    
    // إرجاع المنتجات للمخزون
    if (currentSaleForReturn.items) {
        currentSaleForReturn.items.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const returnQuantity = returnType === 'full' ? item.quantity : 
                    Math.floor((item.quantity * partialAmount) / currentSaleForReturn.amount);
                product.stock += returnQuantity;
            }
        });
    }
    
    // تحديث الصندوق - إرجاع المال
    if (currentSaleForReturn.paymentMethod === 'نقدي' || currentSaleForReturn.paymentMethod === 'جزئي') {
        let refundDetails = [];
        
        if (currentSaleForReturn.cashDetails) {
            // مبيعة نقدية
            const originalCurrency = currentSaleForReturn.cashDetails.paymentCurrency;
            const originalPaid = currentSaleForReturn.cashDetails.amountPaid;
            
            if (returnType === 'full') {
                // استرجاع كامل - نرجع نفس المبلغ والعملة المدفوعة
                if (originalCurrency === 'USD') {
                    cashDrawer.cashUSD -= originalPaid;
                    refundDetails.push(`$${originalPaid.toFixed(2)}`);
                } else {
                    cashDrawer.cashLBP -= originalPaid;
                    refundDetails.push(`${originalPaid.toLocaleString()} ل.ل`);
                }
            } else {
                // استرجاع جزئي - نحسب النسبة
                const refundRatio = partialAmount / currentSaleForReturn.amount;
                const refundInOriginalCurrency = originalPaid * refundRatio;
                
                if (originalCurrency === 'USD') {
                    cashDrawer.cashUSD -= refundInOriginalCurrency;
                    refundDetails.push(`$${refundInOriginalCurrency.toFixed(2)}`);
                } else {
                    cashDrawer.cashLBP -= refundInOriginalCurrency;
                    refundDetails.push(`${refundInOriginalCurrency.toLocaleString()} ل.ل`);
                }
            }
        } else if (currentSaleForReturn.partialDetails) {
            // مبيعة جزئية - نرجع فقط المبلغ المدفوع
            const originalCurrency = currentSaleForReturn.partialDetails.paymentCurrency;
            const originalPaid = currentSaleForReturn.partialDetails.amountPaid;
            
            if (returnType === 'full') {
                if (originalCurrency === 'USD') {
                    cashDrawer.cashUSD -= originalPaid;
                    refundDetails.push(`$${originalPaid.toFixed(2)}`);
                } else {
                    cashDrawer.cashLBP -= originalPaid;
                    refundDetails.push(`${originalPaid.toLocaleString()} ل.ل`);
                }
            } else {
                // استرجاع جزئي للمبيعة الجزئية
                const refundRatio = partialAmount / currentSaleForReturn.amount;
                const refundInOriginalCurrency = Math.min(originalPaid * refundRatio, originalPaid);
                
                if (originalCurrency === 'USD') {
                    cashDrawer.cashUSD -= refundInOriginalCurrency;
                    refundDetails.push(`$${refundInOriginalCurrency.toFixed(2)}`);
                } else {
                    cashDrawer.cashLBP -= refundInOriginalCurrency;
                    refundDetails.push(`${refundInOriginalCurrency.toLocaleString()} ل.ل`);
                }
            }
        } else {
            // مبيعة قديمة بدون تفاصيل - افتراض بالدولار
            if (currentSaleForReturn.amount < 50) { // افتراض مبالغ صغيرة بالدولار
                cashDrawer.cashUSD -= refundAmount;
                refundDetails.push(`$${refundAmount.toFixed(2)}`);
            } else {
                // تحويل للليرة
                const refundLBP = refundAmount * settings.exchangeRate;
                cashDrawer.cashLBP -= refundLBP;
                refundDetails.push(`${refundLBP.toLocaleString()} ل.ل`);
            }
        }
        
        // إضافة سجل معاملة
        cashDrawer.transactions.push({
            timestamp: new Date().toISOString(),
            type: 'refund',
            amount: refundAmount,
            description: `استرجاع ${returnType === 'full' ? 'كامل' : 'جزئي'} للفاتورة ${currentSaleForReturn.invoiceNumber} - المبلغ المرجع: ${refundDetails.join(' + ')}`,
            balanceAfter: {
                USD: cashDrawer.cashUSD,
                LBP: cashDrawer.cashLBP
            }
        });
        
        cashDrawer.lastUpdate = new Date().toISOString();
        saveToStorage('cashDrawer', cashDrawer);
        updateCashDrawerDisplay();
    }
    
    // حفظ البيانات المحدثة
    saveToStorage('sales', sales);
    saveToStorage('products', products);
    
    // تحديث الواجهات
    loadSales();
    displayProducts();
    
    // إخفاء النافذة
    hideModal('returnSaleModal');
    
    // إظهار رسالة نجاح مع تفاصيل المبلغ المرجع
    const refundText = refundDetails.length > 0 ? refundDetails.join(' + ') : formatCurrency(refundAmount);
    showMessage(`✅ تم استرجاع المبيعة بنجاح! تم رد ${refundText} للعميل`, 'success');
    
    currentSaleForReturn = null;
}

// ربط الأحداث للنافذة
document.addEventListener('DOMContentLoaded', function() {
    // ربط تغيير نوع الاسترجاع
    const returnTypeSelect = document.getElementById('returnType');
    if (returnTypeSelect) {
        returnTypeSelect.addEventListener('change', function() {
            const partialGroup = document.getElementById('partialAmountGroup');
            if (this.value === 'partial') {
                partialGroup.style.display = 'block';
            } else {
                partialGroup.style.display = 'none';
            }
            updateReturnSummary();
        });
    }
    
    // ربط تحديث المبلغ الجزئي
    const partialAmountInput = document.getElementById('partialReturnAmount');
    if (partialAmountInput) {
        partialAmountInput.addEventListener('input', updateReturnSummary);
    }
});

// تحسين نظام الإشعارات
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// فحص المخزون المنخفض وإرسال إشعارات
function checkLowStock() {
    if (!settings.lowStockAlert) return;
    
    const threshold = settings.lowStockThreshold || 10;
    const lowStockProducts = products.filter(product => 
        product && 
        product.name && 
        typeof product.stock === 'number' && 
        product.stock <= threshold
    );
    
    if (lowStockProducts.length > 0) {
        const productNames = lowStockProducts
            .map(p => `${p.name} (${p.stock})`)
            .filter(name => name && !name.includes('null'))
            .join('\n');
            
        if (productNames.trim()) {
            showNotification(`⚠️ تحذير مخزون منخفض (حد: ${threshold}):\n${productNames}`, 'warning', 8000);
        }
    }
}

// فحص المخزون كل 10 ثوانٍ
setInterval(checkLowStock, 10000);

// تحديث حد تحذير المخزون
document.addEventListener('DOMContentLoaded', function() {
    const thresholdInput = document.getElementById('lowStockThreshold');
    if (thresholdInput) {
        thresholdInput.addEventListener('change', function() {
            const newThreshold = parseInt(this.value);
            if (newThreshold > 0) {
                settings.lowStockThreshold = newThreshold;
                saveToStorage('settings', settings);
                showNotification('✅ تم تحديث حد تحذير المخزون', 'success', 3000);
            }
        });
    }
    
    // تفعيل/إلغاء تحذيرات المخزون
    const alertCheckbox = document.getElementById('lowStockAlertCheckbox');
    if (alertCheckbox) {
        alertCheckbox.addEventListener('change', function() {
            settings.lowStockAlert = this.checked;
            saveToStorage('settings', settings);
            toggleStockThresholdGroup();
            
            if (this.checked) {
                showNotification('✅ تم تفعيل تحذيرات المخزون', 'success', 3000);
            } else {
                showNotification('🔕 تم إلغاء تحذيرات المخزون', 'info', 3000);
            }
        });
    }
    
    // تحديث الصندوق
    const updateCashBtn = document.getElementById('updateCashDrawer');
    if (updateCashBtn) {
        updateCashBtn.addEventListener('click', function() {
            // طلب كلمة المرور
            const password = prompt('🔒 أدخل كلمة المرور لتعديل الصندوق:');
            if (password !== '00') {
                showNotification('❌ كلمة المرور خاطئة! لا يمكن تعديل الصندوق.', 'error', 3000);
                return;
            }
            
            const newUSD = parseFloat(document.getElementById('editCashUSD').value) || 0;
            const newLBP = parseFloat(document.getElementById('editCashLBP').value) || 0;
            
            if (!confirm(`هل أنت متأكد من تحديث الصندوق؟\nالرصيد الجديد: ${formatCurrency(newUSD, 'USD')} + ${formatCurrency(newLBP, 'LBP')}`)) {
                return;
            }
            
            // حساب الفرق وإضافة معاملة
            const diffUSD = newUSD - cashDrawer.cashUSD;
            const diffLBP = newLBP - cashDrawer.cashLBP;
            
            // تحديث الصندوق
            cashDrawer.cashUSD = newUSD;
            cashDrawer.cashLBP = newLBP;
            cashDrawer.lastUpdate = new Date().toISOString();
            
            // إضافة معاملة توضيحية
            if (diffUSD !== 0 || diffLBP !== 0) {
                cashDrawer.transactions.push({
                    date: new Date().toISOString(),
                    type: 'adjustment',
                    amountUSD: diffUSD,
                    amountLBP: diffLBP,
                    description: 'تعديل يدوي للصندوق من الإعدادات'
                });
            }
            
            // حفظ وتحديث
            saveToStorage('cashDrawer', cashDrawer);
            updateCashDrawerDisplay();
            updateCashDrawerSettings();
            
            showNotification(`✅ تم تحديث الصندوق بنجاح!
💵 دولار: ${formatCurrency(newUSD, 'USD')}
💰 ليرة: ${formatCurrency(newLBP, 'LBP')}`, 'success', 5000);
        });
    }
});

// زر القائمة للجوال
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// تحسين الحسابات التلقائية
function ensureCalculationsWork() {
    // التأكد من عمل الحسابات التلقائية
    const currencySelect = document.getElementById('currency');
    const amountPaidInput = document.getElementById('amountPaid');
    const paymentCurrencySelect = document.getElementById('paymentCurrency');
    const changeCurrencySelect = document.getElementById('changeCurrency');
    
    // إضافة مستمعات إضافية للتأكد
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            // تحديث فوري للعربة
            setTimeout(() => {
                updateCart();
                const amountPaid = document.getElementById('amountPaid');
                if (amountPaid && amountPaid.value && amountPaid.value > 0) {
                    calculateAndDisplayChange();
                }
            }, 100);
        });
    }
    
    // تحسين الاستجابة للتغييرات
    document.addEventListener('change', function(e) {
        if (e.target.id === 'amountPaid' || 
            e.target.id === 'paymentCurrency' || 
            e.target.id === 'changeCurrency') {
            
            const amountPaid = document.getElementById('amountPaid');
            if (amountPaid && amountPaid.value && amountPaid.value > 0) {
                setTimeout(() => {
                    calculateAndDisplayChange();
                }, 50);
            }
        }
    });
    
    // إعادة حساب كل شيء عند تحميل نقطة البيع
    const posPage = document.getElementById('pos');
    if (posPage && posPage.classList.contains('active')) {
        setTimeout(() => {
            updateCart();
            const amountPaid = document.getElementById('amountPaid');
            if (amountPaid && amountPaid.value && amountPaid.value > 0) {
                calculateAndDisplayChange();
            }
        }, 200);
    }
}

// تشغيل التحسينات
setTimeout(ensureCalculationsWork, 1000);

console.log('نظام إدارة المبيعات المتطور جاهز للاستخدام!');
