import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="content-page not-found">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-add">Back to the tester</Link>
    </div>
  );
}
