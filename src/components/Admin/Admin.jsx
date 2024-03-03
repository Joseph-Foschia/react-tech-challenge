import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="Admin">
      <h1>Admin Page</h1>
        <Link to="/Workflow"><button>Workflow Page</button></Link>
    </div>
  );
}

export default Admin;