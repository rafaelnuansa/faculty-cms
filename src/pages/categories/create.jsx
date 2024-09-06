import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layouts/default";
import Api from "../../api";
import Cookies from "js-cookie";
import FlashMessage from "../../components/flash-message";

export default function CategoryCreate() {
  // Title page
  document.title = "Create Category";

  // Navigate
  const navigate = useNavigate();

  // Define state for form
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  // Token from cookies
  const token = Cookies.get("token");

  // Function to store faculty
  const storeCategory = async (e) => {
    e.preventDefault();

    // Sending data
    await Api.post(
      "/api/admin/categories",
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
        // Show toast
      
        FlashMessage('success', response.data.message);
        // Redirect
        navigate("/categories");
      })
      .catch((error) => {
        // Set error messages to state
        setErrors(error.response.data.errors || {});
      });
  };

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
                  <i className="fa fa-building"></i> Create Category
                </h6>
                <hr />
                <form onSubmit={storeCategory}>
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
