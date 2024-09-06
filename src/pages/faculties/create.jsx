import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layouts/default';
import Api from '../../api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function FacultyCreate() {
    // Title page
    document.title = "Create Faculty";

    // Navigate
    const navigate = useNavigate();

    // Define state for form
    const [name, setName] = useState('');
    const [initial, setInitial] = useState('');
    const [desc, setDesc] = useState('');
    const [domain, setDomain] = useState('');
    const [errors, setErrors] = useState([]);

    // Token from cookies
    const token = Cookies.get('token');

    // Function to store faculty
    const storeFaculty = async (e) => {
        e.preventDefault();

        // Sending data
        await Api.post('/api/admin/faculties', {
            name: name,
            initial: initial,
            desc: desc,
            domain: domain,
        }, {
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
            // Set error messages to state
            setErrors(error.response.data.errors || {});
        });
    }

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
                                <h6><i className="fa fa-building"></i> Create Faculty</h6>
                                <hr/>
                                <form onSubmit={storeFaculty}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Name</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={name} 
                                                    onChange={(e) => setName(e.target.value)} 
                                                    placeholder="Enter Faculty Name"
                                                />
                                            </div>
                                            {errors.name && (
                                                <div className="alert alert-danger">
                                                    {errors.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Initial</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={initial} 
                                                    onChange={(e) => setInitial(e.target.value)} 
                                                    placeholder="Enter Initial"
                                                />
                                            </div>
                                            {errors.initial && (
                                                <div className="alert alert-danger">
                                                    {errors.initial[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Domain</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={domain} 
                                                    onChange={(e) => setDomain(e.target.value)} 
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

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Description</label>
                                                <textarea 
                                                    className="form-control" 
                                                    value={desc} 
                                                    onChange={(e) => setDesc(e.target.value)} 
                                                    placeholder="Enter Description"
                                                />
                                            </div>
                                            {errors.desc && (
                                                <div className="alert alert-danger">
                                                    {errors.desc[0]}
                                                </div>
                                            )}
                                        </div>
                                        
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-md btn-tertiary me-2">
                                            <i className="fa fa-save"></i> Save
                                        </button>
                                        <button type="reset" className="btn btn-md btn-warning">
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
