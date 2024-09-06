// src/pages/users/index.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../../layouts/default";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/users";
import { ROUTES } from "../../routes/index"; // Import ROUTES

export default function UsersIndex() {
  document.title = "Users";

  const dispatch = useDispatch();
  const { users, pagination, status, error } = useSelector((state) => state.users);

  const [keywords, setKeywords] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    dispatch(fetchUsers({ pageNumber: 1, keywords, token }));
  }, [dispatch, keywords, token]);

  const searchData = (e) => {
    setKeywords(e.target.value);
    dispatch(fetchUsers({ pageNumber: 1, keywords: e.target.value, token }));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(fetchUsers({ pageNumber, keywords, token }));
  };

  return (
    <Layout>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  to={ROUTES.USER_CREATE}
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
            <div className="card border-0 shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 rounded">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "5%" }}>No.</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Fakultas</th>
                        <th style={{ width: "15%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {status === 'loading' && 
                       <tr>
                       <td colSpan={5}>
                         <div
                           className="alert alert-danger border-0 text-center rounded shadow-sm w-100"
                           role="alert"
                         >
                           Loading...
                         </div>
                       </td>
                     </tr>
                      }
                      {status === 'succeeded' && users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td className="fw-bold text-center">
                              {++index + (pagination.currentPage - 1) * pagination.perPage}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.faculty?.name ?? "-"}</td>
                            <td className="text-center">
                              <Link
                                to={`${ROUTES.USER_EDIT.replace(':id', user.id)}`}
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
                      ) : status === 'succeeded' && users.length === 0 ? (
                        <tr>
                          <td colSpan={5}>
                            <div
                              className="alert alert-danger border-0 text-center rounded shadow-sm w-100"
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
                              Error loading users: {error}
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
