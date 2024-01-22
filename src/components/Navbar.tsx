import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface Props {
  path: string | undefined,
  slug: string | undefined,
}

const NavBar: React.FC<Props> = ({ path, slug }) => {
  return (
    <Navbar className="navbar">
      <div className='divider'></div>

      <Link to="/StarEvents-ReactApp" className="breadcrump__item breadcrump__part">Home</Link>

      {slug ?
        <Link to={`/StarEvents-ReactApp/star/${path}`} className="breadcrump__item">
          <div className="breadcrump__part"> -&gt; </div>
          <div className="breadcrump__part">{slug}</div>
        </Link>
        : path &&
        <Link to={`/StarEvents-ReactApp/${path}`} className="breadcrump__item">
          <div className="breadcrump__part"> -&gt; </div>
          <div className="breadcrump__part">{path}</div>
        </Link>
      }
    </Navbar>
  );
}

export default NavBar;
