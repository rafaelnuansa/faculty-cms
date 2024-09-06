//import navbar
import Navbar from "../components/navbar";

//import sidebar
import Sidebar from '../components/sidebar';

// import PropTypes for props validation
import PropTypes from 'prop-types';

export default function Layout ({children}) {
   return (
       <>
           <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
               <a className="navbar-brand me-lg-5" href="/">
                   <img className="navbar-brand-dark" src="" alt="Brand Dark" />
                   <img className="navbar-brand-light" src="" alt="Brand Light" />
               </a>
               <div className="d-flex align-items-center">
                   <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse"
                       data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                       aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>
               </div>
           </nav>

           {/* sidebar */}
           <Sidebar />

           <main className="content">

               {/* navbar */}
               <Navbar />

               {/* children */}
               {children}

           </main>
       </>
   );
}

// Prop validation for children
Layout.propTypes = {
   children: PropTypes.node.isRequired,
};
