import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Эволюция ближайших к Солнцу звезд</Navbar.Brand>

      </Container>
    </Navbar>
  );
}

export default NavBar;
