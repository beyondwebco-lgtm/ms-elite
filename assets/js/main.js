/**
 * MS ELITE FMS - Premium Cleaning & Facility Management Services
 * Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Navbar Sticky Glass Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Pricing Matrix Data for Dynamic Booking Calculator
  const pricingMatrix = {
    'weekly-washroom': {
      label: 'Number of Washrooms',
      type: 'select',
      options: [
        { val: '1 Washroom', price: 1000 },
        { val: '2 Washrooms', price: 1500 },
        { val: '3 Washrooms', price: 1700 },
        { val: '4 Washrooms', price: 2100 },
        { val: '5 Washrooms', price: 2500 }
      ]
    },
    'deep-washroom': {
      label: 'Number of Washrooms',
      type: 'select',
      options: [
        { val: '1 Washroom', price: 400 },
        { val: '2 Washrooms', price: 800 },
        { val: '3 Washrooms', price: 1200 },
        { val: '4 Washrooms', price: 1600 },
        { val: '5 Washrooms', price: 2000 }
      ]
    },
    'fan-cleaning': {
      label: 'Number of Fans (₹50 each)',
      type: 'number',
      unitPrice: 50,
      min: 1
    },
    'door-cleaning': {
      label: 'Number of Doors (₹50 each)',
      type: 'number',
      unitPrice: 50,
      min: 1
    },
    'ac-cleaning': {
      label: 'AC Outdoor Units (₹30 each)',
      type: 'number',
      unitPrice: 30,
      min: 1
    },
    'tubelight-dusting': {
      label: 'Tube Lights (₹20 each)',
      type: 'number',
      unitPrice: 20,
      min: 1
    },
    'window-cleaning': {
      label: 'Number of Windows (₹259 each)',
      type: 'number',
      unitPrice: 259,
      min: 1
    },
    'french-door': {
      label: 'French Doors (₹359 each)',
      type: 'number',
      unitPrice: 359,
      min: 1
    },
    'chimney-cleaning': {
      label: 'Quantity (₹399 flat rate)',
      type: 'fixed',
      price: 399
    },
    'balcony-cleaning': {
      label: 'Balconies (₹399 per unit)',
      type: 'number',
      unitPrice: 399,
      min: 1
    },
    'utility-balcony': {
      label: 'Utility Balconies (₹399 per unit)',
      type: 'number',
      unitPrice: 399,
      min: 1
    },
    'kitchen-general': {
      label: 'General Kitchen Package',
      type: 'fixed',
      price: 1200
    },
    'kitchen-deep': {
      label: 'Kitchen Deep Cleaning Package',
      type: 'fixed',
      price: 1600
    },
    'sofa-vacuum': {
      label: 'Number of Seaters (₹150/seater)',
      type: 'number',
      unitPrice: 150,
      min: 1
    },
    'sofa-shampoo': {
      label: 'Number of Seaters (₹250/seater)',
      type: 'number',
      unitPrice: 250,
      min: 1
    },
    'house-general': {
      label: 'Home Size Configuration',
      type: 'select',
      options: [
        { val: '2 BHK General Cleaning', price: 3500 },
        { val: '3 BHK General Cleaning', price: 4500 }
      ]
    },
    'house-deep': {
      label: 'Home Size Configuration',
      type: 'select',
      options: [
        { val: '2 BHK Deep Cleaning', price: 4500 },
        { val: '3 BHK Deep Cleaning', price: 5500 }
      ]
    },
    'other': {
      label: 'Specify Requirements',
      type: 'text',
      price: 0
    }
  };

  const serviceSelect = document.getElementById('bookingService');
  const dynamicDetailContainer = document.getElementById('dynamicDetailContainer');
  const priceDisplay = document.getElementById('estimatedPrice');
  const priceValueInput = document.getElementById('priceValueInput');

  function updateDynamicFields() {
    if (!serviceSelect || !dynamicDetailContainer) return;
    const selectedKey = serviceSelect.value;
    const data = pricingMatrix[selectedKey];

    dynamicDetailContainer.innerHTML = '';

    if (!data) {
      priceDisplay.textContent = 'Quote on Inspection';
      priceValueInput.value = 'Quote on Inspection';
      return;
    }

    const label = document.createElement('label');
    label.textContent = data.label;
    dynamicDetailContainer.appendChild(label);

    if (data.type === 'select') {
      const select = document.createElement('select');
      select.className = 'form-control';
      select.id = 'dynamicQtySelect';

      data.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.val;
        option.dataset.price = opt.price;
        option.textContent = `${opt.val} — ₹${opt.price.toLocaleString('en-IN')}/-`;
        select.appendChild(option);
      });

      dynamicDetailContainer.appendChild(select);

      const calculateSelectPrice = () => {
        const selectedOpt = select.options[select.selectedIndex];
        const price = selectedOpt ? parseInt(selectedOpt.dataset.price, 10) : 0;
        priceDisplay.textContent = `₹${price.toLocaleString('en-IN')}/-`;
        priceValueInput.value = `₹${price}/-`;
      };

      select.addEventListener('change', calculateSelectPrice);
      calculateSelectPrice();

    } else if (data.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'form-control';
      input.id = 'dynamicQtyInput';
      input.value = data.min || 1;
      input.min = data.min || 1;

      dynamicDetailContainer.appendChild(input);

      const calculateNumPrice = () => {
        const qty = parseInt(input.value, 10) || 0;
        const total = qty * data.unitPrice;
        priceDisplay.textContent = `₹${total.toLocaleString('en-IN')}/-`;
        priceValueInput.value = `₹${total}/-`;
      };

      input.addEventListener('input', calculateNumPrice);
      calculateNumPrice();

    } else if (data.type === 'fixed') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.value = 'Included in Standard Package';
      input.readOnly = true;
      dynamicDetailContainer.appendChild(input);

      priceDisplay.textContent = `₹${data.price.toLocaleString('en-IN')}/-`;
      priceValueInput.value = `₹${data.price}/-`;
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.id = 'dynamicQtyInput';
      input.placeholder = 'e.g. 4 washrooms, 2 BHK, etc.';
      dynamicDetailContainer.appendChild(input);

      priceDisplay.textContent = 'Quote on Inspection';
      priceValueInput.value = 'Custom Quote';
    }
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateDynamicFields);
    updateDynamicFields(); // Initialize default
  }

  // 4. Quick Service Trigger Links
  window.selectServiceAndScroll = function(serviceKey) {
    if (serviceSelect) {
      serviceSelect.value = serviceKey;
      updateDynamicFields();
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 5. Booking Form Submission & WhatsApp Redirect
  const bookingForm = document.getElementById('bookingForm');
  const modalBackdrop = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      let detailValue = 'Standard';
      const selectElem = document.getElementById('dynamicQtySelect');
      const inputElem = document.getElementById('dynamicQtyInput');
      if (selectElem) {
        detailValue = selectElem.value;
      } else if (inputElem) {
        detailValue = inputElem.value;
      }

      const prefDate = document.getElementById('custDate').value || 'Flexible';
      const prefTime = document.getElementById('custTime').value || 'Flexible';
      const reqs = document.getElementById('custReqs').value.trim() || 'None';
      const estPrice = priceValueInput.value || 'Quote on Site Inspection';

      // Format WhatsApp Message
      const waMessage = 
`*NEW CLEANING SERVICE ENQUIRY*
----------------------------------------
*Company:* MS ELITE FMS
*Customer Name:* ${name}
*Phone Number:* ${phone}
*Selected Service:* ${serviceName}
*Details / Quantity:* ${detailValue}
*Preferred Date:* ${prefDate}
*Preferred Time:* ${prefTime}
*Estimated Pricing:* ${estPrice}
*Additional Notes:* ${reqs}
----------------------------------------
_Request sent via MS ELITE FMS Website_`;

      const encodedMsg = encodeURIComponent(waMessage);
      const waURL = `https://wa.me/919063141723?text=${encodedMsg}`;

      // Show Summary Receipt Modal
      const receiptContainer = document.getElementById('summaryReceipt');
      if (receiptContainer) {
        receiptContainer.innerHTML = `
          <div class="summary-receipt-row"><strong>Customer:</strong> <span>${name} (${phone})</span></div>
          <div class="summary-receipt-row"><strong>Service:</strong> <span>${serviceName}</span></div>
          <div class="summary-receipt-row"><strong>Configuration:</strong> <span>${detailValue}</span></div>
          <div class="summary-receipt-row"><strong>Schedule:</strong> <span>${prefDate} at ${prefTime}</span></div>
          <div class="summary-receipt-row"><strong>Est. Total:</strong> <strong style="color:#C9A45C;">${estPrice}</strong></div>
        `;
      }

      if (modalBackdrop) {
        modalBackdrop.classList.add('active');
      }

      // Store WA URL on modal confirmation button
      const confirmWaBtn = document.getElementById('confirmWaBtn');
      if (confirmWaBtn) {
        confirmWaBtn.onclick = () => {
          window.open(waURL, '_blank');
        };
      }

      // Automatically open WhatsApp in new tab
      window.open(waURL, '_blank');
    });
  }

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }
});
