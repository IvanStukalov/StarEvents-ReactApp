import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

interface Props {
  path: string,
  slug: string,
  draftId: number,
  setLoading: (loading: boolean) => void,
}

const NavBar: React.FC<Props> = ({ path, slug, draftId, setLoading }) => {
  const { login, isAuthorized, isAdmin, resetUser } = useUser();

  const logout = async () => {
    setLoading(true);
    const resGetDraft = await api.api.eventDetail(draftId);
    const draftStars = resGetDraft.data.star_list;
    if (draftStars && draftStars.length !== 0) {
      for (let star of draftStars) {
        await api.api.starEventStarIdDelete(star.star_id);
      }
    }
    try {
      await api.api.logoutCreate();
    } catch (error) {
      console.log("Ошибка выхода из аккаунта");
    }
    resetUser();
    setLoading(false);
  }

  return (
    <Navbar style={{ backgroundColor: "#2050a0", color: "white" }} className="navbar">

      <div style={{ width: "20%", display: "flex" }}>
        <div className='divider'></div>

        <Link to="/" className="breadcrump__item breadcrump__part">Звезды</Link>

        {slug ?
          <Link to={path} className="breadcrump__item">
            <div className="breadcrump__part"> -&gt; </div>
            <div className="breadcrump__part">{slug}</div>
          </Link>
          : path &&
          <Link to={path} className="breadcrump__item">
            <div className="breadcrump__part">/</div>
            <div className="breadcrump__part">{path}</div>
          </Link>
        }
      </div>

      <Container className="navbar__container" style={{justifyContent: "start"}}>
        <Link to="/">
          <Navbar.Brand className="navbar-btn">Звезды</Navbar.Brand>
        </Link>

        {
          isAuthorized &&
          <>
            <Link to="/orders">
              <Navbar.Brand className="navbar-btn">События</Navbar.Brand>
            </Link>

            {
              isAdmin &&
              <>
                <Link to="/starTable">
                  <Navbar.Brand className="navbar-btn">Таблица звезд</Navbar.Brand>
                </Link>
              </>
            }
          </>
        }
      </Container>

      {!isAuthorized ?
        <>
          <Link className="navbar_item navbar-btn" to="/auth">
            <Button variant="primary">Войти</Button>
          </Link>

          <Link className="navbar_item navbar-btn" to="/reg">
            <Button variant="secondary">Регистрация</Button>
          </Link>
        </>
        :
        <>
          <h5>{login}</h5>

          <Link className="navbar_item navbar-btn" to="/star" style={{marginBottom: "5px"}}>
            <div onClick={logout}>Выйти</div>
          </Link>
        </>
      }

    </Navbar>
  );
}

export default NavBar;
