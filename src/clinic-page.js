document.querySelector("#menu").addEventListener("click", function () {
  const navLinks = document.querySelector("#nav-links");
  navLinks.style.display = navLinks.style.display === "none" ? "block" : "none";
});

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const state = document.getElementById('stateInput').value;
  const city = document.getElementById('cityInput').value;

  try {
    // Fetch real-time clinic data from the new endpoint
    const response = await fetch(`http://localhost:5000/clinics/real-time?state=${state}&city=${city}`);
    if (response.ok) {
      const clinics = await response.json();
      displayClinicsOnMap(clinics);
    } else {
      alert('Failed to fetch clinics');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while fetching clinics');
  }
});

let map; // Declare map variable in the outer scope to track its state

function displayClinicsOnMap(clinics) {
  const mapSection = document.getElementById('mapSection');
  mapSection.classList.remove('hidden');

  if (map) {
    map.remove(); // Remove the existing map instance before creating a new one
  }

  map = L.map('map').setView([4.85, 31.6], 6); // Default view centered on South Sudan

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  clinics.forEach(clinic => {
    L.marker([clinic.geometry.location.lat, clinic.geometry.location.lng])
      .addTo(map)
      .bindPopup(`<b>${clinic.name}</b><br>${clinic.formatted_address}`);
  });
}
