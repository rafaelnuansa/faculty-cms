import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/default";
import Api from "../../api";
import Cookies from "js-cookie";
import FlashMessage from "../../components/flash-message";

export default function CategoryEdit() {
  // Title page
  document.title = "Edit Category";

  // Navigate
  const navigate = useNavigate();

  // Get category ID from URL params
  const { id } = useParams();

  // Define state for form
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  // Token from cookies
  const token = Cookies.get("token");

  // Function to fetch category details with useCallback
  const fetchCategory = useCallback(async () => {
    try {
      const response = await Api.get(`/api/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.name);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  }, [id, token]); // Add id and token as dependencies

  // Function to update category
  const updateCategory = async (e) => {
    e.preventDefault();

    // Sending data
    await Api.put(
      `/api/admin/categories/${id}`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        // Show flash message
        FlashMessage('success', response.data.message);
        // Redirect
        navigate("/categories");
      })
      .catch((error) => {
        // Set error messages to state
        setErrors(error.response.data.errors || {});
      });
  };

  // useEffect to fetch category details on component load
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]); // Add 'fetchCategory' to the dependency array

  return (
    <Layout>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/categories"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-building"></i> Edit Category
                </h6>
                <hr />
                <form onSubmit={updateCategory}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Category Name"
                        />
                      </div>
                      {errors.name && (
                        <div className="alert alert-danger">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
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
