/**
 * Main Application Logic
 */

// Application State
let cities = [];
let communities = [];
let currentEditCityId = null;
let currentEditCommunityId = null;

// DOM Elements
const cityList = document.getElementById('cityList');
const communityList = document.getElementById('communityList');
const totalCitiesEl = document.getElementById('totalCities');
const totalCommunitiesEl = document.getElementById('totalCommunities');

// City Modal Elements
const cityModal = document.getElementById('cityModal');
const cityForm = document.getElementById('cityForm');
const addCityBtn = document.getElementById('addCityBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Community Modal Elements
const communityModal = document.getElementById('communityModal');
const communityForm = document.getElementById('communityForm');
const addCommunityBtn = document.getElementById('addCommunityBtn');
const cancelCommunityBtn = document.getElementById('cancelCommunityBtn');
const cityFilter = document.getElementById('cityFilter');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

/**
 * Initialize the application
 */
async function initializeApp() {
    try {
        Utils.showLoader();
        await loadCities();
        await loadCommunities();
        updateStats();
        populateCityDropdowns();
        Utils.hideLoader();
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error loading data: ' + error.message, 'error');
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // City modal events
    addCityBtn.addEventListener('click', openAddCityModal);
    cancelBtn.addEventListener('click', closeCityModal);
    cityForm.addEventListener('submit', handleCityFormSubmit);
    
    // Community modal events
    addCommunityBtn.addEventListener('click', openAddCommunityModal);
    cancelCommunityBtn.addEventListener('click', closeCommunityModal);
    communityForm.addEventListener('submit', handleCommunityFormSubmit);
    
    // Filter events
    cityFilter.addEventListener('change', handleCityFilterChange);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cityModal) closeCityModal();
        if (e.target === communityModal) closeCommunityModal();
    });
    
    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            closeCityModal();
            closeCommunityModal();
        });
    });
}

// ==================== DATA LOADING ====================

async function loadCities() {
    cities = await API.getCities();
    renderCities();
}

async function loadCommunities() {
    communities = await API.getCommunities();
    renderCommunities(communities);
}

// ==================== RENDERING ====================

function renderCities() {
    cityList.innerHTML = '';
    
    if (cities.length === 0) {
        cityList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No cities found. Add your first city!</p>';
        return;
    }
    
    cities.forEach(city => {
        const cityCard = createCityCard(city);
        cityList.appendChild(cityCard);
    });
}

function createCityCard(city) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
        <h3>${city.name}</h3>
        <div class="city-info">
            <p><strong>State:</strong> ${city.state || 'N/A'}</p>
            <p><strong>Population:</strong> ${Utils.formatNumber(city.population)}</p>
            <p><strong>Mayor:</strong> ${city.mayor || 'N/A'}</p>
        </div>
        <div class="card-actions">
            <button class="btn btn-view" onclick="viewCityCommunities(${city.id})">
                Communities
            </button>
            <button class="btn btn-edit" onclick="editCity(${city.id})">
                Edit
            </button>
            <button class="btn btn-delete" onclick="deleteCity(${city.id})">
                Delete
            </button>
        </div>
    `;
    return card;
}

function renderCommunities(communitiesToRender) {
    communityList.innerHTML = '';
    
    if (communitiesToRender.length === 0) {
        communityList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No communities found. Add your first community!</p>';
        return;
    }
    
    communitiesToRender.forEach(community => {
        const communityCard = createCommunityCard(community);
        communityList.appendChild(communityCard);
    });
}

function createCommunityCard(community) {
    const card = document.createElement('div');
    card.className = 'community-card';
    
    // Find city name
    const city = cities.find(c => c.id === community.city?.id);
    const cityName = city ? city.name : 'Unknown City';
    
    card.innerHTML = `
        <h3>${community.name}</h3>
        <div class="community-info">
            <p><strong>City:</strong> ${cityName}</p>
            <p><strong>Type:</strong> ${community.type || 'N/A'}</p>
            <p><strong>Homes:</strong> ${Utils.formatNumber(community.numberOfHomes)}</p>
            <p><strong>Year:</strong> ${community.yearEstablished || 'N/A'}</p>
            <p><strong>Amenities:</strong> ${community.hasAmenities ? '✅ Yes' : '❌ No'}</p>
        </div>
        <div class="card-actions">
            <button class="btn btn-edit" onclick="editCommunity(${community.id})">
                Edit
            </button>
            <button class="btn btn-delete" onclick="deleteCommunity(${community.id})">
                Delete
            </button>
        </div>
    `;
    return card;
}

// ==================== CITY OPERATIONS ====================

function openAddCityModal() {
    currentEditCityId = null;
    document.getElementById('modalTitle').textContent = 'Add City';
    cityForm.reset();
    cityModal.style.display = 'block';
}

function closeCityModal() {
    cityModal.style.display = 'none';
    cityForm.reset();
    currentEditCityId = null;
}

async function handleCityFormSubmit(e) {
    e.preventDefault();
    
    const cityData = {
        name: document.getElementById('cityName').value,
        state: document.getElementById('cityState').value,
        population: parseInt(document.getElementById('cityPopulation').value) || null,
        mayor: document.getElementById('cityMayor').value
    };
    
    try {
        Utils.showLoader();
        
        if (currentEditCityId) {
            await API.updateCity(currentEditCityId, cityData);
            Utils.showNotification('City updated successfully!');
        } else {
            await API.createCity(cityData);
            Utils.showNotification('City created successfully!');
        }
        
        await loadCities();
        populateCityDropdowns();
        updateStats();
        closeCityModal();
        Utils.hideLoader();
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error saving city: ' + error.message, 'error');
    }
}

async function editCity(id) {
    try {
        Utils.showLoader();
        const city = await API.getCity(id);
        
        currentEditCityId = id;
        document.getElementById('modalTitle').textContent = 'Edit City';
        document.getElementById('cityName').value = city.name;
        document.getElementById('cityState').value = city.state || '';
        document.getElementById('cityPopulation').value = city.population || '';
        document.getElementById('cityMayor').value = city.mayor || '';
        
        cityModal.style.display = 'block';
        Utils.hideLoader();
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error loading city: ' + error.message, 'error');
    }
}

async function deleteCity(id) {
    if (!Utils.confirm('Are you sure you want to delete this city? All associated communities will also be deleted.')) {
        return;
    }
    
    try {
        Utils.showLoader();
        await API.deleteCity(id);
        await loadCities();
        await loadCommunities();
        populateCityDropdowns();
        updateStats();
        Utils.hideLoader();
        Utils.showNotification('City deleted successfully!');
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error deleting city: ' + error.message, 'error');
    }
}

async function viewCityCommunities(cityId) {
    try {
        Utils.showLoader();
        const cityCommunities = await API.getCommunitiesByCity(cityId);
        renderCommunities(cityCommunities);
        cityFilter.value = cityId;
        Utils.hideLoader();
        
        // Scroll to communities section
        document.querySelector('.community-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error loading communities: ' + error.message, 'error');
    }
}

// ==================== COMMUNITY OPERATIONS ====================

function openAddCommunityModal(cityId = null) {
    currentEditCommunityId = null;
    document.getElementById('communityModalTitle').textContent = 'Add Community';
    communityForm.reset();
    if (cityId) {
        document.getElementById('communityCity').value = cityId;
    }
    communityModal.style.display = 'block';
}

function closeCommunityModal() {
    communityModal.style.display = 'none';
    communityForm.reset();
    currentEditCommunityId = null;
}

async function handleCommunityFormSubmit(e) {
    e.preventDefault();
    
    const cityId = parseInt(document.getElementById('communityCity').value);
    
    const communityData = {
        name: document.getElementById('communityName').value,
        type: document.getElementById('communityType').value,
        numberOfHomes: parseInt(document.getElementById('communityHomes').value) || null,
        yearEstablished: parseInt(document.getElementById('communityYear').value) || null,
        hasAmenities: document.getElementById('communityAmenities').checked,
        city: { id: cityId }
    };
    
    try {
        Utils.showLoader();
        
        if (currentEditCommunityId) {
            await API.updateCommunity(currentEditCommunityId, communityData);
            Utils.showNotification('Community updated successfully!');
        } else {
            await API.createCommunity(communityData);
            Utils.showNotification('Community created successfully!');
        }
        
        await loadCommunities();
        updateStats();
        closeCommunityModal();
        Utils.hideLoader();
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error saving community: ' + error.message, 'error');
    }
}

async function editCommunity(id) {
    try {
        Utils.showLoader();
        const community = communities.find(c => c.id === id);
        
        if (!community) {
            throw new Error('Community not found');
        }
        
        currentEditCommunityId = id;
        document.getElementById('communityModalTitle').textContent = 'Edit Community';
        document.getElementById('communityName').value = community.name;
        document.getElementById('communityCity').value = community.city?.id || '';
        document.getElementById('communityType').value = community.type || '';
        document.getElementById('communityHomes').value = community.numberOfHomes || '';
        document.getElementById('communityYear').value = community.yearEstablished || '';
        document.getElementById('communityAmenities').checked = community.hasAmenities || false;
        
        communityModal.style.display = 'block';
        Utils.hideLoader();
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error loading community: ' + error.message, 'error');
    }
}

async function deleteCommunity(id) {
    if (!Utils.confirm('Are you sure you want to delete this community?')) {
        return;
    }
    
    try {
        Utils.showLoader();
        await API.deleteCommunity(id);
        await loadCommunities();
        updateStats();
        Utils.hideLoader();
        Utils.showNotification('Community deleted successfully!');
    } catch (error) {
        Utils.hideLoader();
        Utils.showNotification('Error deleting community: ' + error.message, 'error');
    }
}

// ==================== UTILITY FUNCTIONS ====================

function updateStats() {
    totalCitiesEl.textContent = cities.length;
    totalCommunitiesEl.textContent = communities.length;
}

function populateCityDropdowns() {
    // Populate community form city dropdown
    const communityCity = document.getElementById('communityCity');
    communityCity.innerHTML = '<option value="">Select a city...</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        communityCity.appendChild(option);
    });
    
    // Populate filter dropdown
    cityFilter.innerHTML = '<option value="">All Cities</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        cityFilter.appendChild(option);
    });
}

function handleCityFilterChange() {
    const selectedCityId = cityFilter.value;
    
    if (selectedCityId === '') {
        renderCommunities(communities);
    } else {
        const filtered = communities.filter(c => c.city?.id === parseInt(selectedCityId));
        renderCommunities(filtered);
    }
}

// Make functions globally accessible for onclick handlers
window.editCity = editCity;
window.deleteCity = deleteCity;
window.viewCityCommunities = viewCityCommunities;
window.editCommunity = editCommunity;
window.deleteCommunity = deleteCommunity;
window.openAddCommunityModal = openAddCommunityModal;