//import react  
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";
//import layout
import Layout from '../../layouts/default';
//import api
import Api from '../../api';
//import js cookie
import Cookies from 'js-cookie';
import FlashMessage from "../../components/flash-message";

export default function UserEdit() {

    //title page
    document.title = "Edit User";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [facultyId, setFacultyId] = useState(''); // Initialize with empty string
    const [faculties, setFaculties] = useState([]); // Added faculties state
    const [errors, setErrors] = useState([]); // Corrected state name

    //token from cookies
    const token = Cookies.get('token');

    //function "fetchDataUser"
    const fetchDataUser = async () => {
        await Api.get(`/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const userData = response.data.data;
            //set response data to state
            setName(userData.name);
            setEmail(userData.email);
            setFacultyId(userData.faculty_id || ''); // Handle case if faculty_id is null
        });
    }

    //fetch faculties
    const fetchDataFaculty = async () => {
        await Api.get('/api/admin/faculties/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setFaculties(response.data.data); // Set faculties data
        });
    }

    //useEffect
    useEffect(() => {
        fetchDataUser();
        fetchDataFaculty(); // Fetch faculties when component loads
    }, []);

    //function "updateUser"
    const updateUser = async (e) => {
        e.preventDefault();

        //sending data
        await Api.put(`/api/admin/users/${id}`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            faculty_id: facultyId || '', // Ensure faculty_id is an empty string if not set
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
      
            FlashMessage("success", response.data.message);
            navigate('/users');
        })
        .catch(error => {
            setErrors(error.response.data);
        })
    }

    return (
        <Layout>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/users" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button"><i className="fa fa-long-arrow-alt-left me-2"></i> Back</Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-user"></i> Edit User</h6>
                                <hr/>
                                <form onSubmit={updateUser}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Full Name</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name"/>
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
                                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address"/>
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
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
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
                                                <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Enter Password Confirmation"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Faculty</label>
                                                <select className="form-control" value={facultyId} onChange={(e) => setFacultyId(e.target.value)}>
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
                                        <button type="submit" className="btn btn-md btn-tertiary me-2"><i className="fa fa-save"></i> Update</button>
                                        <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> Reset</button>
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
