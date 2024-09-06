// import API instance
import Api from '../index';

// Get users with optional search query and pagination
export const getUsers = async (page = 1, keywords = '', token) => {
    return Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Create new user
export const createUser = async (data, token) => {
    return Api.post('/api/admin/users', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Edit user
export const editUser = async (id, data, token) => {
    return Api.put(`/api/admin/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Delete user
export const deleteUser = async (id, token) => {
    return Api.delete(`/api/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
