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

//import toast
import toast from 'react-hot-toast';

export default function UserEdit() {

    //title page
    document.title = "Edit User - NewsApp Administartor";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [rolesData, setRolesData] = useState([]);
    const [errors, setErros] = useState([]);


    //token from cookies
    const token = Cookies.get('token');


    //function "fetchDataUser"
    const fetchDataUser = async () => {

        await Api.get(`/api/admin/users/${id}`, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {

            //set response data to state
            setName(response.data.data.name);
            setEmail(response.data.data.email);
            setRolesData(response.data.data.roles.map(obj => obj.name));
        });

    }

    //useEffect
    useEffect(() => {

        //call function "fetchDataUser"
        fetchDataUser();
    }, []);


    //function "updateUser"
    const updateUser = async (e) => {
        e.preventDefault();

        //sending data
        await Api.put(`/api/admin/users/${id}`, {

            //data
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            roles: rolesData
        }, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {

            //show toast
            toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
            });

            //redirect
            navigate('/users');

        })
        .catch(error => {

            //set error message to state "errors"
            setErros(error.response.data);
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