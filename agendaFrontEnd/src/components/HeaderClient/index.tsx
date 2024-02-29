import './styles.css'
import iconAdmin from '../../assets/user-admin.svg'

export default function HeaderClient() {
  return (
    <>
      <header className="dsc-header-client">
        <nav className="dsc-container">
          <h1>DSAgenda</h1>
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
