const { createApp } = Vue;

const API_BASE_URL = 'http://localhost:8080/api';

createApp({
    data() {
        return {
            // Data
            cities: [],
            communities: [],
            
            // UI State
            loading: false,
            showCityModal: false,
            showCommunityModal: false,
            selectedCityFilter: '',
            
            // Forms
            cityForm: {
                name: '',
                state: '',
                population: null,
                mayor: ''
            },
            communityForm: {
                name: '',
                cityId: '',
                type: '',
                numberOfHomes: null,
                yearEstablished: null,
                hasAmenities: false
            },
            
            // Edit tracking
            editingCity: null,
            editingCommunity: null
        };
    },
    
    computed: {
        filteredCommunities() {
            if (this.selectedCityFilter === '') {
                return this.communities;
            }
            return this.communities.filter(c => c.city?.id === parseInt(this.selectedCityFilter));
        }
    },
    
    async mounted() {
        await this.loadData();
    },
    
    methods: {
        // ==================== DATA LOADING ====================
        
        async loadData() {
            this.loading = true;
            try {
                await Promise.all([
                    this.loadCities(),
                    this.loadCommunities()
                ]);
            } catch (error) {
                alert('Error loading data: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
        
        async loadCities() {
            const response = await fetch(`${API_BASE_URL}/cities`);
            if (!response.ok) throw new Error('Failed to load cities');
            this.cities = await response.json();
        },
        
        async loadCommunities() {
            const response = await fetch(`${API_BASE_URL}/communities`);
            if (!response.ok) throw new Error('Failed to load communities');
            this.communities = await response.json();
        },
        
        // ==================== CITY OPERATIONS ====================
        
        openCityModal(city = null) {
            if (city) {
                this.editingCity = city;
                this.cityForm = {
                    name: city.name,
                    state: city.state,
                    population: city.population,
                    mayor: city.mayor
                };
            } else {
                this.editingCity = null;
                this.cityForm = {
                    name: '',
                    state: '',
                    population: null,
                    mayor: ''
                };
            }
            this.showCityModal = true;
        },
        
        closeCityModal() {
            this.showCityModal = false;
            this.editingCity = null;
        },
        
        async saveCityForm() {
            this.loading = true;
            try {
                const cityData = {
                    name: this.cityForm.name,
                    state: this.cityForm.state,
                    population: this.cityForm.population || null,
                    mayor: this.cityForm.mayor
                };
                
                if (this.editingCity) {
                    // Update existing city
                    const response = await fetch(`${API_BASE_URL}/cities/${this.editingCity.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cityData)
                    });
                    if (!response.ok) throw new Error('Failed to update city');
                    alert('City updated successfully!');
                } else {
                    // Create new city
                    const response = await fetch(`${API_BASE_URL}/cities`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cityData)
                    });
                    if (!response.ok) throw new Error('Failed to create city');
                    alert('City created successfully!');
                }
                
                await this.loadCities();
                this.closeCityModal();
            } catch (error) {
                alert('Error saving city: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
        
        editCity(city) {
            this.openCityModal(city);
        },
        
        async deleteCity(id) {
            if (!confirm('Are you sure you want to delete this city? All associated communities will also be deleted.')) {
                return;
            }
            
            this.loading = true;
            try {
                const response = await fetch(`${API_BASE_URL}/cities/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to delete city');
                
                alert('City deleted successfully!');
                await this.loadData();
            } catch (error) {
                alert('Error deleting city: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
        
        // ==================== COMMUNITY OPERATIONS ====================
        
        openCommunityModal(community = null) {
            if (community) {
                this.editingCommunity = community;
                this.communityForm = {
                    name: community.name,
                    cityId: community.city?.id || '',
                    type: community.type,
                    numberOfHomes: community.numberOfHomes,
                    yearEstablished: community.yearEstablished,
                    hasAmenities: community.hasAmenities
                };
            } else {
                this.editingCommunity = null;
                this.communityForm = {
                    name: '',
                    cityId: '',
                    type: '',
                    numberOfHomes: null,
                    yearEstablished: null,
                    hasAmenities: false
                };
            }
            this.showCommunityModal = true;
        },
        
        closeCommunityModal() {
            this.showCommunityModal = false;
            this.editingCommunity = null;
        },
        
        async saveCommunityForm() {
            this.loading = true;
            try {
                const communityData = {
                    name: this.communityForm.name,
                    type: this.communityForm.type,
                    numberOfHomes: this.communityForm.numberOfHomes || null,
                    yearEstablished: this.communityForm.yearEstablished || null,
                    hasAmenities: this.communityForm.hasAmenities,
                    city: { id: parseInt(this.communityForm.cityId) }
                };
                
                if (this.editingCommunity) {
                    // Update existing community
                    const response = await fetch(`${API_BASE_URL}/communities/${this.editingCommunity.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(communityData)
                    });
                    if (!response.ok) throw new Error('Failed to update community');
                    alert('Community updated successfully!');
                } else {
                    // Create new community
                    const response = await fetch(`${API_BASE_URL}/communities`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(communityData)
                    });
                    if (!response.ok) throw new Error('Failed to create community');
                    alert('Community created successfully!');
                }
                
                await this.loadCommunities();
                this.closeCommunityModal();
            } catch (error) {
                alert('Error saving community: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
        
        editCommunity(community) {
            this.openCommunityModal(community);
        },
        
        async deleteCommunity(id) {
            if (!confirm('Are you sure you want to delete this community?')) {
                return;
            }
            
            this.loading = true;
            try {
                const response = await fetch(`${API_BASE_URL}/communities/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to delete community');
                
                alert('Community deleted successfully!');
                await this.loadCommunities();
            } catch (error) {
                alert('Error deleting community: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
        
        // ==================== UTILITY METHODS ====================
        
        filterByCity(cityId) {
            this.selectedCityFilter = cityId.toString();
            // Scroll to communities section
            document.querySelector('.community-section').scrollIntoView({ behavior: 'smooth' });
        },
        
        applyFilter() {
            // Filter is reactive, no action needed
        },
        
        getCityName(cityId) {
            const city = this.cities.find(c => c.id === cityId);
            return city ? city.name : 'Unknown City';
        },
        
        formatNumber(num) {
            return num ? num.toLocaleString() : 'N/A';
        }
    }
}).mount('#app');