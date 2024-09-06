// import useState and useEffect
import { useState, useEffect, useCallback } from "react";

// import Link from react router dom
import { Link } from "react-router-dom";

// import api
import Api from "../../api";

// import js cookie
import Cookies from "js-cookie";

// import layout
import Layout from "../../layouts/default";

// import pagination component
import Pagination from "../../components/pagination";

// import SweetAlert2
import Swal from "sweetalert2";

export default function Categories() {
  // title page
  document.title = "Categories";

  // define state "categories"
  const [categories, setCategories] = useState([]);

  // define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // define state "keywords"
  const [keywords, setKeywords] = useState("");

  // token from cookies
  const token = Cookies.get("token");

  // function fetchData
  const fetchData = useCallback(async (pageNumber = 1, keywords = "") => {
    try {
      const response = await Api.get(`/api/admin/categories?search=${keywords}&page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update categories and pagination state
      setCategories(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [token]);

  // useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // function "searchData"
  const searchData = (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value); // Reset to first page on search
  };

  // function to delete category
  const deleteCategory = async (id) => {
    // Confirm deletion with Swal
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await Api.delete(`/api/admin/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire(
          'Deleted!',
          'The category has been deleted.',
          'success'
        );
        // Refresh the data after deletion
        fetchData(pagination.currentPage, keywords); // Ensure it fetches data for the current page
      } catch (error) {
        Swal.fire(
          'Error!',
          error,
          'error'
        );
      }
    }
  };

  return (
    <Layout>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  to="/categories/create"
                  className="btn btn-md btn-tertiary border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle"></i> Create New
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
                        <th className="border-0" style={{ width: "5%" }}>
                          No.
                        </th>
                        <th className="border-0">Category Name</th>
                        <th className="border-0">Slug</th>
                        <th className="border-0" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // check if data exists
                        categories.length > 0 ? (
                          // loop through "categories" with "map"
                          categories.map((category, index) => (
                            <tr key={category.id}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{category.name}</td>
                              <td>{category.slug}</td>
                              <td className="text-center">
                                <div className="btn-group">
                                  <Link
                                    to={`/categories/edit/${category.id}`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCategory(category.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          // display no data message
                          <tr>
                            <td colSpan={4}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100"
                                role="alert"
                              >
                                Data Belum Tersedia!.
                              </div>
                            </td>
                          </tr>
                        )
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
