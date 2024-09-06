//import useState and useEffect
import { useState, useEffect } from 'react';

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from '../../api';

//import js cookie
import Cookies from 'js-cookie';

//import layout
import Layout from "../../layouts/default";

//import pagination component
import Pagination from "../../components/pagination";

export default function UsersIndex() {

    //title page
    document.title = "Users";

    //define state "users"
    const[users, setUsers] = useState([]);

    //define state "pagination"
    const[pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0
    });

    //define state "keywords"
    const[keywords, setKeywords] = useState('');

    //token from cookies
    const token = Cookies.get('token');

    //function fetchData
    const fetchData = async (pageNumber=1, keywords='') => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;
        await Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                //set data response to state "setUsers"
                setUsers(response.data.data.data);
                //set data pagination to state "pagination"
                setPagination(() => ({ 
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total
                }));

            })

    }

    

    //useEffect
    useEffect(() => {

        //call function "fetchData"
    fetchData();

    }, []);

    //function "searchData"
    const searchData = async (e) => {

        //set value to state "keywords"
        setKeywords(e.target.value);

        //call function "fetchData"
        fetchData(1, e.target.value)

    }

    return (
        <Layout>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                        
                                <div className="col-md-3 col-12 mb-2">
                                    <Link to="/users/create" className="btn btn-md btn-tertiary border-0 shadow w-100" type="button">
                                        <i className="fa fa-plus-circle"></i> Add New
                                    </Link>
                                </div>
                            <div className="col-md-9 col-12 mb-2">
                                <div className="input-group">
                                    <input type="text" className="form-control border-0 shadow" onChange={(e) => searchData(e)} placeholder="search here..." />
                                    <span className="input-group-text border-0 shadow">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-md-12">
                        <div className="card border-0 shadow">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-striped mb-0 rounded">
                                        <thead className="thead-dark">
                                            <tr className="border-0">
                                                <th className="border-0" style={{ width: '5%' }}>No.</th>
                                                <th className="border-0">Full Name</th>
                                                <th className="border-0">Email Address</th>
                                                <th className="border-0">Fakultas</th>
                                                <th className="border-0" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                users.length > 0

                                                //looping data "users" dengan "map"
                                                ?   users.map((user, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index + (pagination.currentPage-1) * pagination.perPage}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.faculty?.name ?? 'Administrator'}</td>
                                                            <td className="text-center">
                                                                   <Link to={`/users/edit/${user.id}`} className="btn btn-primary btn-sm me-2"><i className="fa fa-pencil-alt"></i></Link>
                                                                    <button className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                                                         

                                                            </td>
                                                        </tr>
                                                    ))

                                                    //tampilkan pesan data belum tersedia
                                                :   <tr>
                                                        <td colSpan={5}>
                                                            <div className="alert alert-danger border-0 rounded shadow-sm w-100" role="alert">
                                                                Data Belum Tersedia!.
                                                            </div>
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination 
                                    currentPage={pagination.currentPage} 
                                    perPage={pagination.perPage} 
                                    total={pagination.total} 
                                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                    position="end"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}