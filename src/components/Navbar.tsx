import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface Props {
  path: string | undefined,
  slug: string | undefined,
}

const NavBar: React.FC<Props> = ({ path, slug }) => {
  return (
    <Navbar className="navbar">
      <div>
        <div className='divider'></div>

        <Link to="/StarEvents-ReactApp/" className="breadcrump__item breadcrump__part">Звезды</Link>

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
      </div>

      <div>
        <Link className="navbar_item navbar-btn" to="/auth">
          <Button variant="primary">Войти</Button>
        </Link>

        <Link className="navbar_item navbar-btn" to="/reg">
          <Button variant="secondary">Регистрация</Button>
        </Link>
      </div>
    </Navbar>
  );
}

export default NavBar;
