// Store parking slots data
const parkingSlots = [
    {
        id: 1,
        name: "HITEC City Parking",
        address: "Gachibowli - Miyapur Rd, Whitefields, HITEC City, Kondapur, Telangana 500084",
        price: 50,
        available: true,
        amenities: ["CCTV", "Security", "EV Charging"],
        distance: "2.5 km"
    },
    {
        id: 2,
        name: "Airport Parking",
        address: "RGI AIRPORT, Shamshabad, Hyderabad, Telangana 500409",
        price: 100,
        available: true,
        amenities: ["CCTV", "Security", "Valet"],
        distance: "5.2 km"
    },
    {
        id: 3,
        name: "College Parking",
        address: "Vardhaman College of Engineering",
        price: 30,
        available: false,
        amenities: ["CCTV", "Security"],
        distance: "3.8 km"
    }
];

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.form-container, .slots-container').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Open modal with parking slot details
function openModal(address) {
    const slot = parkingSlots.find(slot => slot.address === address);
    if (!slot) return;

    const modal = document.getElementById('modal');
    const details = document.getElementById('slot-details');
    
    details.innerHTML = `
        <div class="slot-info">
            <h4>${slot.name}</h4>
            <p><strong>Address:</strong> ${slot.address}</p>
            <p><strong>Price:</strong> ₹${slot.price}/hour</p>
            <p><strong>Distance:</strong> ${slot.distance}</p>
            <p><strong>Status:</strong> <span class="${slot.available ? 'available' : 'full'}">${slot.available ? 'Available' : 'Full'}</span></p>
            <div class="amenities">
                <strong>Amenities:</strong>
                ${slot.amenities.map(amenity => `<span>${amenity}</span>`).join('')}
            </div>
        </div>
    `;

    document.getElementById('overlay').style.display = 'block';
    modal.style.display = 'block';

    // Add animation class
    modal.classList.add('modal-open');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('modal-open');
    modal.classList.add('modal-close');
    
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        modal.style.display = 'none';
        modal.classList.remove('modal-close');
    }, 300);
}

// Redirect to payment
function redirectToPayment() {
    const slotAddress = document.getElementById('slot-details').querySelector('p').textContent.split(': ')[1];
    const slot = parkingSlots.find(slot => slot.address === slotAddress);
    
    if (slot && slot.available) {
        // Here you would typically integrate with a payment gateway
        alert(`Redirecting to payment for ${slot.name}...`);
        // window.location.href = "https://razorpay.com";
    } else {
        alert('This slot is no longer available. Please select another slot.');
    }
}

// Form validation
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const vehicleType = document.getElementById('vehicle-type').value;
    const vehicleNumber = document.getElementById('vehicle-number').value;
    const mobileNumber = document.getElementById('mobile-number').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Basic validation
    if (!name || !vehicleType || !vehicleNumber || !mobileNumber || !date || !time) {
        alert('Please fill in all fields');
        return;
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Date validation
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
        alert('Please select a future date');
        return;
    }

    showSection('slots-container');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showSection('form-container');
    
    // Add today's date as minimum date for the date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});