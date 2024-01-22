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

      <Link to="/" className="breadcrump__item breadcrump__part">Home</Link>

      {slug ?
        <Link to={`/star/${path}`} className="breadcrump__item">
          <div className="breadcrump__part"> -&gt; </div>
          <div className="breadcrump__part">{slug}</div>
        </Link>
        : path &&
        <Link to={`${path}`} className="breadcrump__item">
          <div className="breadcrump__part">/</div>
          <div className="breadcrump__part">{path}</div>
        </Link>
      }
    </Navbar>
  );
}

export default NavBar;
