import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-3">404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
