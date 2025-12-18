/**
 * Utility Functions
 */
const Utils = {
    /**
     * Show loading spinner
     */
    showLoader() {
        document.getElementById('loader').style.display = 'flex';
    },

    /**
     * Hide loading spinner
     */
    hideLoader() {
        document.getElementById('loader').style.display = 'none';
    },

    /**
     * Show a toast notification (you can enhance this with a library)
     */
    showNotification(message, type = 'success') {
        alert(message); // Simple for now - can be enhanced with toast library
    },

    /**
     * Format number with commas
     */
    formatNumber(num) {
        return num ? num.toLocaleString() : 'N/A';
    },

    /**
     * Confirm action
     */
    confirm(message) {
        return window.confirm(message);
    }
};

