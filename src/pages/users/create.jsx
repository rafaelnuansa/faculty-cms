// import react  
import { useState, useEffect, useCallback } from "react";

// import react router dom
import { Link, useNavigate } from "react-router-dom";

// import layout
import Layout from '../../layouts/default';

// import api
import Api from '../../api';

// import js cookie
import Cookies from 'js-cookie';
import FlashMessage from "../../components/flash-message";

export default function UserCreate() {

    // title page
    document.title = "Create User";

    // navigate
    const navigate = useNavigate();

    // define state for form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [facultyId, setFacultyId] = useState(''); // for faculty selection
    const [errors, setErrors] = useState([]);

    // define state for faculties
    const [faculties, setFaculties] = useState([]);

    // token from cookies
    const token = Cookies.get('token');

    // function "storeUser"
    const storeUser = async (e) => {
        e.preventDefault();

        // sending data
        await Api.post('/api/admin/users', {
            // data
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            faculty_id: facultyId, // Include faculty_id
        }, {
            // header
            headers: {
                // header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            // show toast
            FlashMessage('success', response.data.message);

            // redirect
            navigate('/users');
        })
        .catch(error => {
            // set error message to state "errors"
            setErrors(error.response.data);
        })
    }

    // fetch faculties
    const fetchDataFaculty = useCallback(async () => {
        await Api.get('/api/admin/faculties/all', {
            // header
            headers: {
                // header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            // set response data to state "faculties"
            setFaculties(response.data.data);
        })
        .catch(error => {
            console.error("Failed to fetch faculties:", error);
        });
    }, [token]);

    // useEffect to fetch faculties on component load
    useEffect(() => {
        fetchDataFaculty();
    }, [fetchDataFaculty]); // Include fetchDataFaculty in the dependency array

    return (
        <Layout>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/users" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button">
                            <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                        </Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-user"></i> Create User</h6>
                                <hr/>
                                <form onSubmit={storeUser}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={name} 
                                                    onChange={(e) => setName(e.target.value)} 
                                                    placeholder="Enter Full Name"
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
                                                <label className="form-label fw-bold">Email Address</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    placeholder="Enter Email Address"
                                                />
                                            </div>
                                            {errors.email && (
                                                <div className="alert alert-danger">
                                                    {errors.email[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Password</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    value={password} 
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                    placeholder="Enter Password"
                                                />
                                            </div>
                                            {errors.password && (
                                                <div className="alert alert-danger">
                                                    {errors.password[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Password Confirmation</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    value={passwordConfirmation} 
                                                    onChange={(e) => setPasswordConfirmation(e.target.value)} 
                                                    placeholder="Enter Password Confirmation"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Faculty</label>
                                                <select 
                                                    className="form-control" 
                                                    value={facultyId} 
                                                    onChange={(e) => setFacultyId(e.target.value)}
                                                >
                                                    <option value="">Select Faculty</option>
                                                    {faculties.map(faculty => (
                                                        <option key={faculty.id} value={faculty.id}>
                                                            {faculty.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.faculty_id && (
                                                <div className="alert alert-danger">
                                                    {errors.faculty_id[0]}
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
    )
}
