//import useState and useEffect
import { useState, useEffect } from "react";
//import Link from react router dom
import { Link } from "react-router-dom";
//import js cookie
import Cookies from "js-cookie";
import Layout from "../../layouts/default";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaculties } from "../../redux/faculties";

export default function UsersIndex() {
  // Set the page title
  document.title = "Users";

  // Initialize Redux hooks
  const dispatch = useDispatch();
  const { faculties, pagination, status, error } = useSelector((state) => state.faculties);

  // State for search keywords
  const [keywords, setKeywords] = useState('');
  const token = Cookies.get('token');
  useEffect(() => {
    dispatch(fetchFaculties({ pageNumber: 1, keywords, token }));
  }, [dispatch, keywords, token]);
  const searchData = (e) => {
    setKeywords(e.target.value);
    dispatch(fetchFaculties({ pageNumber: 1, keywords: e.target.value, token }));
  };
  const handlePageChange = (pageNumber) => {
    dispatch(fetchFaculties({ pageNumber, keywords, token }));
  };

  return (
    <Layout>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  to="/faculties/create"
                  className="btn btn-tertiary border-0 shadow w-100"
                  type="button"
                >
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
            <div className="card shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "5%" }}>No.</th>
                        <th>Faculty</th>
                        <th>Domain</th>
                        <th style={{ width: "15%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {status === 'loading' && <tr><td colSpan={5}>Loading...</td></tr>}
                      {status === 'succeeded' && faculties.length > 0 ? (
                        faculties.map((faculties, index) => (
                          <tr key={faculties.id}>
                            <td className="fw-bold text-center">
                              {++index + (pagination.currentPage - 1) * pagination.perPage}
                            </td>
                            <td>{faculties.name}</td>
                            <td>{faculties.domain}</td>
                            <td className="text-center">
                              <Link
                                to={`/faculties/edit/${faculties.id}`}
                                className="btn btn-primary btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {/* Implement delete functionality */}}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : status === 'succeeded' && faculties.length === 0 ? (
                        <tr>
                          <td colSpan={5}>
                            <div
                              className="alert alert-danger border-0 rounded shadow-sm w-100"
                              role="alert"
                            >
                              Data Belum Tersedia!
                            </div>
                          </td>
                        </tr>
                      ) : null}
                      {error && (
                        <tr>
                          <td colSpan={5}>
                            <div
                              className="alert alert-danger border-0 rounded shadow-sm w-100"
                              role="alert"
                            >
                             {error}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={pagination.currentPage}
                  perPage={pagination.perPage}
                  total={pagination.total}
                  onChange={handlePageChange}
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
