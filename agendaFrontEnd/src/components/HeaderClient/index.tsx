import "./styles.css";
import iconAdmin from "../../assets/user-admin.svg";
import { Link } from "react-router-dom";

export default function HeaderClient() {
  return (
    <>
      <header className="dsc-header-client dsc-mb20 ">
        <nav className="dsc-container">
          <Link to="/">
            <h1>DSAgenda</h1>
          </Link>
          <div className="dsc-navbar-right">
            <div className="dsc-menu-items-container">
              <div className="dsc-menu-item">
                <img src={iconAdmin} alt="Carrinho de compras" />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
