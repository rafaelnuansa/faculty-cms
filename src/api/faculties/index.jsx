// import API instance
import Api from '../index';

// Get faculties with optional search query and pagination
export const getFaculties = async (page = 1, keywords = '', token) => {
    return Api.get(`/api/admin/faculties?search=${keywords}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Create new faculty
export const createFaculty = async (data, token) => {
    return Api.post('/api/admin/faculties', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Edit faculty
export const editFaculty = async (id, data, token) => {
    return Api.put(`/api/admin/faculties/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Delete faculty
export const deleteFaculty = async (id, token) => {
    return Api.delete(`/api/admin/faculties/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
