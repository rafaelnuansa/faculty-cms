// import useState, useEffect, and useCallback
import { useState, useEffect, useCallback } from 'react';

// import Link from react router dom
import { Link } from "react-router-dom";

// import api
import Api from '../../api';

// import js cookie
import Cookies from 'js-cookie';

// import layout
import Layout from "../../layouts/default";

// import pagination component
import Pagination from "../../components/pagination";

export default function UsersIndex() {
    // title page
    document.title = "Faculties";

    // define state "faculties"
    const [faculties, setFaculties] = useState([]);

    // define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 1,  // Start from page 1
        perPage: 10,
        total: 0
    });

    // define state "keywords"
    const [keywords, setKeywords] = useState('');

    // token from cookies
    const token = Cookies.get('token');

    // function fetchData
    const fetchData = useCallback(async (pageNumber = 1, keywords = '') => {
        try {
            const response = await Api.get(`/api/admin/faculties?search=${keywords}&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setFaculties(response.data.data.data);
            setPagination({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total
            });
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [token]);

    // function searchData
    const searchData = useCallback((e) => {
        const newKeywords = e.target.value;
        setKeywords(newKeywords);
        fetchData(1, newKeywords);  // Reset to first page on search
    }, [fetchData]);

    // useEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Layout>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link to="/faculties/create" className="btn btn-tertiary border-0 shadow w-100" type="button">
                                    <i className="fa fa-plus-circle"></i> Add New
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control border-0 shadow" 
                                        onChange={searchData} 
                                        placeholder="search here..." 
                                    />
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
                                                <th className="border-0">Faculty Name</th>
                                                <th className="border-0">Domain</th>
                                                <th className="border-0" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                faculties.length > 0 
                                                    ? faculties.map((faculty, index) => (
                                                        <tr key={faculty.id}>
                                                            <td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
                                                            <td>{faculty.name}</td>
                                                            <td>{faculty.domain}</td>
                                                            <td className="text-center">
                                                                <div className="btn-group">
                                                                    <Link to={`/faculties/edit/${faculty.id}`} className="btn btn-primary btn-sm">
                                                                        <i className="fa fa-pencil-alt"></i>
                                                                    </Link>
                                                                    <button className="btn btn-danger btn-sm">
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    : <tr>
                                                        <td colSpan={4}>
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
    );
}
