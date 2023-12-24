import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface Props {
  path: string | undefined,
  slug: string | undefined,
}

const NavBar: React.FC<Props> = ({ path, slug }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">

      <Link to="/" className="breadcrump__item breadcrump__part">Home</Link>

      {slug ?
        <Link to={`/star/${path}`} className="breadcrump__item">
          <div className="breadcrump__part">/</div>
          <div className="breadcrump__part">{slug}</div>
        </Link>
        : path &&
        <Link to={`${path}`} className="breadcrump__item">
          <div className="breadcrump__part">/</div>
          <div className="breadcrump__part">{path}</div>
        </Link>
      }

      <Container>
        <Link to="/">
          <Navbar.Brand>Эволюция ближайших к Солнцу звезд</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
