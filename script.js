// Destination-specific activities with dynamic pricing
const destinationActivities = {
  jaipur: [
    { id: "amber-fort", name: "Amber Fort & Elephant Ride", price: 2500 },
    { id: "city-palace", name: "City Palace Museum Tour", price: 1500 },
    { id: "jantar-mantar", name: "Jantar Mantar Observatory", price: 800 },
    {
      id: "johari-bazaar",
      name: "Shopping Tour at Johari Bazaar",
      price: 1000,
    },
    { id: "cultural-show", name: "Rajasthani Cultural Evening", price: 2000 },
  ],
  goa: [
    { id: "watersports", name: "Water Sports Package", price: 3000 },
    { id: "dudhsagar", name: "Dudhsagar Waterfall Trek", price: 2500 },
    { id: "dolphin-cruise", name: "Dolphin Spotting Cruise", price: 1800 },
    { id: "old-goa", name: "Old Goa Heritage Tour", price: 1200 },
    { id: "night-cruise", name: "Dinner Cruise on Mandovi River", price: 2800 },
  ],
  kerala: [
    { id: "houseboat", name: "Overnight Houseboat Stay", price: 8000 },
    { id: "ayurveda", name: "Ayurvedic Spa Treatment", price: 3500 },
    { id: "tea-plantation", name: "Munnar Tea Plantation Tour", price: 1500 },
    { id: "kathakali", name: "Kathakali Dance Performance", price: 1000 },
    { id: "periyar", name: "Periyar Wildlife Safari", price: 2200 },
  ],
  varanasi: [
    { id: "ganga-aarti", name: "Ganga Aarti Ceremony (Boat)", price: 1500 },
    { id: "sunrise-boat", name: "Sunrise Boat Ride", price: 800 },
    { id: "temple-tour", name: "Ancient Temple Walking Tour", price: 1200 },
    { id: "sarnath", name: "Sarnath Buddhist Site Visit", price: 1000 },
    { id: "silk-weaving", name: "Silk Weaving Workshop", price: 1800 },
  ],
  mumbai: [
    { id: "bollywood-tour", name: "Bollywood Studio Tour", price: 3000 },
    { id: "elephanta-caves", name: "Elephanta Caves Excursion", price: 2000 },
    { id: "street-food", name: "Mumbai Street Food Tour", price: 1500 },
    { id: "heritage-walk", name: "Victorian Heritage Walk", price: 1200 },
    { id: "marine-drive", name: "Marine Drive Evening Tour", price: 800 },
  ],
};

// Distance multipliers for travel cost (from average Indian city)
const travelMultipliers = {
  jaipur: 1.0,
  goa: 1.3,
  kerala: 1.5,
  varanasi: 1.1,
  mumbai: 1.2,
};

// Destination names for display
const destinationNames = {
  jaipur: "Jaipur - The Pink City",
  goa: "Goa - Beach Paradise",
  kerala: "Kerala - God's Own Country",
  varanasi: "Varanasi - Spiritual Capital",
  mumbai: "Mumbai - City of Dreams",
};

document.addEventListener("DOMContentLoaded", () => {
  // Helper: navigate
  function navigateToPage(pageId) {
    const pages = document.querySelectorAll(".page");
    pages.forEach((p) => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Registration Form Elements
  const registrationForm = document.getElementById("registrationForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const pincodeInput = document.getElementById("pincode");
  const pincodeError = document.getElementById("pincodeError");
  const nameInput = document.getElementById("fullName");
  const nameError = document.getElementById("nameError");

  // Modal Elements
  const successModal = document.getElementById("successModal");
  const bookingModal = document.getElementById("bookingModal");

  // Navigation Buttons
  const goToPage3Btn = document.getElementById("goToPage3Btn");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");
  const startOverBtn = document.getElementById("startOverBtn");

  // Price Calculator Elements
  const destinationSelect = document.getElementById("destinationSelect");
  const tripDaysInput = document.getElementById("tripDays");
  const travelersInput = document.getElementById("travelers");
  const activitiesContainer = document.getElementById("activitiesContainer");
  const totalPriceEl = document.getElementById("totalPrice");
  const travelCostEl = document.getElementById("travelCost");
  const accommodationCostEl = document.getElementById("accommodationCost");
  const mealCostEl = document.getElementById("mealCost");
  const activitiesCostEl = document.getElementById("activitiesCost");
  const subtotalEl = document.getElementById("subtotal");
  const gstEl = document.getElementById("gst");
  const totalTravelersEl = document.getElementById("totalTravelers");
  const totalDaysEl = document.getElementById("totalDays");

  // Input sanitizers
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
  });

  pincodeInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  // Validation helpers
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).trim());
  }

  function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  function validatePincode(pin) {
    return /^\d{6}$/.test(pin);
  }

  // Form submit
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const pincodeVal = pincodeInput.value.trim();

    let isValid = true;

    if (!nameVal) {
      nameError.classList.add("active");
      nameInput.classList.add("input-error");
      isValid = false;
    } else {
      nameError.classList.remove("active");
      nameInput.classList.remove("input-error");
    }

    if (!validateEmail(emailVal)) {
      emailError.classList.add("active");
      emailInput.classList.add("input-error");
      isValid = false;
    } else {
      emailError.classList.remove("active");
      emailInput.classList.remove("input-error");
    }

    if (!validatePhone(phoneVal)) {
      phoneError.classList.add("active");
      phoneInput.classList.add("input-error");
      isValid = false;
    } else {
      phoneError.classList.remove("active");
      phoneInput.classList.remove("input-error");
    }

    if (!validatePincode(pincodeVal)) {
      pincodeError.classList.add("active");
      pincodeInput.classList.add("input-error");
      isValid = false;
    } else {
      pincodeError.classList.remove("active");
      pincodeInput.classList.remove("input-error");
    }

    if (!isValid) return;

    successModal.classList.add("active");
    successModal.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      successModal.classList.remove("active");
      successModal.setAttribute("aria-hidden", "true");
      navigateToPage("page2");
    }, 1600);
  });

  // Populate activities based on destination
  function populateActivities(destination) {
    activitiesContainer.innerHTML = "";

    if (!destination || !destinationActivities[destination]) {
      return;
    }

    const activities = destinationActivities[destination];
    activities.forEach((activity) => {
      const activityHtml = `
        <label class="checkbox-item flex items-center gap-3 border-2 border-gray-300 rounded-lg p-4 cursor-pointer">
          <input type="checkbox" class="activity-checkbox form-checkbox h-5 w-5" 
            data-price="${activity.price}" data-id="${activity.id}" />
          <span class="flex-1 font-semibold">${activity.name}</span>
          <span class="text-purple-600 font-bold">₹${activity.price.toLocaleString()}</span>
        </label>
      `;
      activitiesContainer.insertAdjacentHTML("beforeend", activityHtml);
    });

    // Add event listeners to new checkboxes
    document.querySelectorAll(".activity-checkbox").forEach((cb) => {
      cb.addEventListener("change", calculateTotal);
    });
  }

  // Calculate total price with breakdown
  function calculateTotal() {
    const destination = destinationSelect.value;
    const days = parseInt(tripDaysInput.value) || 0;
    const travelers = parseInt(travelersInput.value) || 0;

    // Update display
    totalTravelersEl.textContent = travelers;
    totalDaysEl.textContent = days;

    if (!destination || days === 0 || travelers === 0) {
      confirmBookingBtn.disabled = true;
      confirmBookingBtn.textContent = "Select a Destination to Continue";
      totalPriceEl.textContent = "₹0";
      travelCostEl.textContent = "₹0";
      accommodationCostEl.textContent = "₹0";
      mealCostEl.textContent = "₹0";
      activitiesCostEl.textContent = "₹0";
      subtotalEl.textContent = "₹0";
      gstEl.textContent = "₹0";
      return;
    }

    confirmBookingBtn.disabled = false;
    confirmBookingBtn.textContent = "Confirm Your Journey";

    // Calculate travel cost
    const travelClassRadio = document.querySelector(
      'input[name="travelClass"]:checked'
    );
    const travelBasePrice =
      parseInt(
        travelClassRadio.parentElement.querySelector("[data-base-price]")
          .dataset.basePrice
      ) || 0;
    const travelMultiplier = travelMultipliers[destination] || 1;
    const travelCost = Math.round(
      travelBasePrice * travelMultiplier * travelers
    );

    // Calculate accommodation cost
    const accommodationRadio = document.querySelector(
      'input[name="accommodation"]:checked'
    );
    const accommodationPerNight =
      parseInt(
        accommodationRadio.parentElement.querySelector("[data-base-price]")
          .dataset.basePrice
      ) || 0;
    const accommodationCost = accommodationPerNight * days;

    // Calculate meal cost
    const mealRadio = document.querySelector('input[name="mealPlan"]:checked');
    const mealPriceElement =
      mealRadio.parentElement.querySelector("[data-base-price]");
    const mealPerDay = mealPriceElement
      ? parseInt(mealPriceElement.dataset.basePrice) || 0
      : 0;
    const mealCost = mealPerDay * days * travelers;

    // Calculate activities cost
    const selectedActivities = document.querySelectorAll(
      ".activity-checkbox:checked"
    );
    let activitiesCost = 0;
    selectedActivities.forEach((cb) => {
      activitiesCost += parseInt(cb.dataset.price) || 0;
    });
    activitiesCost *= travelers; // Activities cost is per person

    // Calculate totals
    const subtotal = travelCost + accommodationCost + mealCost + activitiesCost;
    const gst = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + gst;

    // Update display
    travelCostEl.textContent = "₹" + travelCost.toLocaleString();
    accommodationCostEl.textContent = "₹" + accommodationCost.toLocaleString();
    mealCostEl.textContent = "₹" + mealCost.toLocaleString();
    activitiesCostEl.textContent = "₹" + activitiesCost.toLocaleString();
    subtotalEl.textContent = "₹" + subtotal.toLocaleString();
    gstEl.textContent = "₹" + gst.toLocaleString();
    totalPriceEl.textContent = "₹" + total.toLocaleString();
  }

  // Destination change handler
  destinationSelect.addEventListener("change", function () {
    const destination = this.value;
    populateActivities(destination);
    calculateTotal();
  });

  // Add change listeners to all inputs
  tripDaysInput.addEventListener("input", calculateTotal);
  travelersInput.addEventListener("input", calculateTotal);

  document.querySelectorAll('input[name="travelClass"]').forEach((radio) => {
    radio.addEventListener("change", calculateTotal);
  });

  document.querySelectorAll('input[name="accommodation"]').forEach((radio) => {
    radio.addEventListener("change", calculateTotal);
  });

  document.querySelectorAll('input[name="mealPlan"]').forEach((radio) => {
    radio.addEventListener("change", calculateTotal);
  });

  // Radio button visual feedback
  document.querySelectorAll(".radio-item").forEach((item) => {
    item.addEventListener("click", function () {
      const radio = this.querySelector('input[type="radio"]');
      const group = radio.name;

      // Remove selected class from all items in group
      document.querySelectorAll(`input[name="${group}"]`).forEach((r) => {
        r.parentElement.classList.remove("border-purple-500", "bg-purple-50");
      });

      // Add selected class to clicked item
      if (radio.checked) {
        this.classList.add("border-purple-500", "bg-purple-50");
      }
    });
  });

  // Checkbox visual feedback
  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("activity-checkbox")) {
      if (e.target.checked) {
        e.target.parentElement.classList.add(
          "border-purple-500",
          "bg-purple-50"
        );
      } else {
        e.target.parentElement.classList.remove(
          "border-purple-500",
          "bg-purple-50"
        );
      }
    }
  });

  // Wire page navigation buttons
  if (goToPage3Btn) {
    goToPage3Btn.addEventListener("click", () => navigateToPage("page3"));
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      const destination = destinationSelect.value;
      const days = tripDaysInput.value;
      const travelers = travelersInput.value;
      const total = totalPriceEl.textContent;

      // Store booking data for confirmation page
      document.getElementById("summaryDestination").textContent =
        destinationNames[destination];
      document.getElementById("summaryDuration").textContent = `${days} days`;
      document.getElementById(
        "summaryTravelers"
      ).textContent = `${travelers} person(s)`;
      document.getElementById("summaryTotal").textContent = total;

      bookingModal.classList.add("active");
      bookingModal.setAttribute("aria-hidden", "false");

      setTimeout(() => {
        bookingModal.classList.remove("active");
        bookingModal.setAttribute("aria-hidden", "true");
        navigateToPage("page4");
      }, 1400);
    });
  }

  if (startOverBtn) {
    startOverBtn.addEventListener("click", () => {
      // Reset form
      registrationForm.reset();
      nameError.classList.remove("active");
      nameInput.classList.remove("input-error");
      emailError.classList.remove("active");
      emailInput.classList.remove("input-error");
      phoneError.classList.remove("active");
      phoneInput.classList.remove("input-error");
      pincodeError.classList.remove("active");
      pincodeInput.classList.remove("input-error");

      // Reset calculator
      destinationSelect.value = "";
      tripDaysInput.value = 3;
      travelersInput.value = 2;

      document.querySelector(
        'input[name="travelClass"][value="economy"]'
      ).checked = true;
      document.querySelector(
        'input[name="accommodation"][value="budget"]'
      ).checked = true;
      document.querySelector(
        'input[name="mealPlan"][value="none"]'
      ).checked = true;

      activitiesContainer.innerHTML = "";

      // Remove all visual selections
      document
        .querySelectorAll(".radio-item, .checkbox-item")
        .forEach((item) => {
          item.classList.remove("border-purple-500", "bg-purple-50");
        });

      calculateTotal();
      navigateToPage("page1");
    });
  }

  // Close modal when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  // Initialize
  calculateTotal();
});
