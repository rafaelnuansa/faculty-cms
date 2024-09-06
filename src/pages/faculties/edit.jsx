// Import React
import { useState, useEffect } from "react";

// Import React Router DOM
import { Link, useNavigate, useParams } from "react-router-dom";

// Import Layout
import Layout from '../../layouts/default';

// Import API
import Api from '../../api';

// Import JS Cookie
import Cookies from 'js-cookie';

// Import Toast
import toast from 'react-hot-toast';

export default function FacultyEdit() {
    // Title page
    document.title = "Edit Faculty - NewsApp Administrator";

    // Navigate
    const navigate = useNavigate();

    // Get ID from parameter URL
    const { id } = useParams();

    // Define initial state values
    const initialState = {
        name: '',
        initial: '',
        desc: '',
        domain: ''
    };

    // Define state for form
    const [formState, setFormState] = useState(initialState);
    const [initialFormState, setInitialFormState] = useState(initialState);
    const [errors, setErrors] = useState([]);

    // Token from cookies
    const token = Cookies.get('token');

    // Function to fetch data
    const fetchDataFaculty = async () => {
        await Api.get(`/api/admin/faculties/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const data = response.data.data;
            // Set response data to state
            setFormState({
                name: data.name,
                initial: data.initial,
                desc: data.desc,
                domain: data.domain
            });
            // Set initial form state
            setInitialFormState({
                name: data.name,
                initial: data.initial,
                desc: data.desc,
                domain: data.domain
            });
        })
        .catch(error => {
            // Handle errors if needed
            console.error(error);
        });
    }

    // useEffect
    useEffect(() => {
        // Call function to fetch faculty data
        fetchDataFaculty();
    }, [id]);

    // Function to update faculty
    const updateFaculty = async (e) => {
        e.preventDefault();

        // Sending data
        await Api.put(`/api/admin/faculties/${id}`, formState, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            // Show toast
            toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
            });

            // Redirect
            navigate('/faculties');
        })
        .catch(error => {
            // Set error message to state
            setErrors(error.response.data.errors || {});
        });
    }

    // Function to reset form to initial data
    const resetForm = () => {
        setFormState(initialFormState);
        setErrors([]);
    };

    return (
        <Layout>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/faculties" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button">
                            <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                        </Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-building"></i> Edit Faculty</h6>
                                <hr/>
                                <form onSubmit={updateFaculty}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Name</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={formState.name} 
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })} 
                                                    placeholder="Enter Faculty Name"
                                                />
                                            </div>
                                            {errors.name && (
                                                <div className="alert alert-danger">
                                                    {errors.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Initial</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={formState.initial} 
                                                    onChange={(e) => setFormState({ ...formState, initial: e.target.value })} 
                                                    placeholder="Enter Initial"
                                                />
                                            </div>
                                            {errors.initial && (
                                                <div className="alert alert-danger">
                                                    {errors.initial[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Description</label>
                                                <textarea 
                                                    className="form-control" 
                                                    value={formState.desc} 
                                                    onChange={(e) => setFormState({ ...formState, desc: e.target.value })} 
                                                    placeholder="Enter Description"
                                                />
                                            </div>
                                            {errors.desc && (
                                                <div className="alert alert-danger">
                                                    {errors.desc[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Domain</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={formState.domain} 
                                                    onChange={(e) => setFormState({ ...formState, domain: e.target.value })} 
                                                    placeholder="Enter Domain"
                                                />
                                            </div>
                                            {errors.domain && (
                                                <div className="alert alert-danger">
                                                    {errors.domain[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-md btn-tertiary me-2">
                                            <i className="fa fa-save"></i> Update
                                        </button>
                                        <button type="button" className="btn btn-md btn-warning" onClick={resetForm}>
                                            <i className="fa fa-redo"></i> Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
