

// API Base URL - Update this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * API Module - Handles all HTTP requests to the backend
 */
const API = {
    // ==================== CITIES ====================
    
    /**
     * Get all cities
     */
    async getCities() {
        try {
            const response = await fetch(`${API_BASE_URL}/cities`);
            if (!response.ok) throw new Error('Failed to fetch cities');
            return await response.json();
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    },

    /**
     * Get a single city by ID
     */
    async getCity(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/cities/${id}`);
            if (!response.ok) throw new Error('Failed to fetch city');
            return await response.json();
        } catch (error) {
            console.error(`Error fetching city ${id}:`, error);
            throw error;
        }
    },

    /**
     * Create a new city
     */
    async createCity(cityData) {
        try {
            const response = await fetch(`${API_BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData)
            });
            if (!response.ok) throw new Error('Failed to create city');
            return await response.json();
        } catch (error) {
            console.error('Error creating city:', error);
            throw error;
        }
    },

    /**
     * Update an existing city
     */
    async updateCity(id, cityData) {
        try {
            const response = await fetch(`${API_BASE_URL}/cities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData)
            });
            if (!response.ok) throw new Error('Failed to update city');
            return await response.json();
        } catch (error) {
            console.error(`Error updating city ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a city
     */
    async deleteCity(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete city');
            return true;
        } catch (error) {
            console.error(`Error deleting city ${id}:`, error);
            throw error;
        }
    },

    // ==================== COMMUNITIES ====================
    
    /**
     * Get all communities
     */
    async getCommunities() {
        try {
            const response = await fetch(`${API_BASE_URL}/communities`);
            if (!response.ok) throw new Error('Failed to fetch communities');
            return await response.json();
        } catch (error) {
            console.error('Error fetching communities:', error);
            throw error;
        }
    },

    /**
     * Get communities by city ID
     */
    async getCommunitiesByCity(cityId) {
        try {
            const response = await fetch(`${API_BASE_URL}/communities/city/${cityId}`);
            if (!response.ok) throw new Error('Failed to fetch communities');
            return await response.json();
        } catch (error) {
            console.error(`Error fetching communities for city ${cityId}:`, error);
            throw error;
        }
    },

    /**
     * Create a new community
     */
    async createCommunity(communityData) {
        try {
            const response = await fetch(`${API_BASE_URL}/communities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(communityData)
            });
            if (!response.ok) throw new Error('Failed to create community');
            return await response.json();
        } catch (error) {
            console.error('Error creating community:', error);
            throw error;
        }
    },

    /**
     * Update an existing community
     */
    async updateCommunity(id, communityData) {
        try {
            const response = await fetch(`${API_BASE_URL}/communities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(communityData)
            });
            if (!response.ok) throw new Error('Failed to update community');
            return await response.json();
        } catch (error) {
            console.error(`Error updating community ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a community
     */
    async deleteCommunity(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/communities/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete community');
            return true;
        } catch (error) {
            console.error(`Error deleting community ${id}:`, error);
            throw error;
        }
    }
};