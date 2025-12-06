import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const shopId = sessionStorage.getItem('xeno_shop_id');
        if (shopId) {
            config.headers['x-shop-id'] = shopId;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchDashboardStats = async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
};

export const fetchSalesChart = async () => {
    const response = await api.get('/dashboard/chart');
    return response.data;
};

export const fetchTopCustomers = async () => {
    const response = await api.get('/dashboard/top-customers');
    return response.data;
};

export default api;