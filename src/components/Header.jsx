import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logo-block">
                <Link to="/home">
                    <img width={100} height={100} src="img/scooter.png" alt="logo" />
                </Link>
                <div>
                    <h3 className="logo-text">Scooter sharing</h3>
                    <p style={{ opacity: 0.8 }}>Electric scooter rental service</p>
                </div>
            </div>
            <ul className="header-list">
                <li className="list-item">
                    <Link to="/user">
                        <img width={50} height={50} src="img/user-profile.webp" alt="user profile" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;