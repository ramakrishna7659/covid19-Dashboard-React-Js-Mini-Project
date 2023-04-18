import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    displaySmNavItems: false,
    activeHomeNav: true,
    activeAboutNav: false,
    activeVaccinationNav: false,
  }

  onClickNavBarIcon = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  onClickCloseNav = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  activeHomeNav = () => {
    this.setState({
      activeHomeNav: true,
      activeAboutNav: false,
      activeVaccinationNav: false,
    })
  }

  activeAboutNav = () => {
    this.setState({
      activeHomeNav: false,
      activeAboutNav: true,
      activeVaccinationNav: false,
    })
  }

  activeVaccinationNav = () => {
    this.setState({
      activeHomeNav: false,
      activeAboutNav: false,
      activeVaccinationNav: true,
    })
  }

  render() {
    const {
      displaySmNavItems,
      activeHomeNav,
      activeAboutNav,
      activeVaccinationNav,
    } = this.state
    const activeHomeClass = activeHomeNav === true ? 'active-tab-class' : ''
    const activeAboutClass = activeAboutNav === true ? 'active-tab-class' : ''
    const activeVaccinationClass =
      activeVaccinationNav === true ? 'active-tab-class' : ''

    return (
      <div className="header-container">
        <div className="nav-bar-sm-container">
          <Link to="/" className="nav-item-link">
            <h1 className="logo-heading">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            onClick={this.onClickNavBarIcon}
            className="navigation-btn"
          >
            <img
              src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521129/mini-project/nav-bar-icon-sm_uee2un.png"
              alt="nav-bar-icon"
              className="nav-bar-icon"
            />
          </button>
        </div>
        {displaySmNavItems && (
          <div className="nav-sm-controls">
            <ul className="sm-controls">
              <Link to="/" className="nav-item-link">
                <li
                  className={`nav-item-home ${activeHomeClass}`}
                  onClick={this.activeHomeNav}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="nav-item-link">
                <li
                  onClick={this.activeAboutNav}
                  className={`nav-item ${activeAboutClass}`}
                >
                  About
                </li>
              </Link>
              <Link to="/vaccination" className="nav-item-link">
                <li
                  onClick={this.activeVaccinationNav}
                  className={`nav-item ${activeVaccinationClass}`}
                >
                  Vaccination
                </li>
              </Link>
            </ul>
            <button
              testid="close-nav-btn"
              className="close-nav-btn"
              type="button"
              onClick={this.onClickCloseNav}
            >
              <img
                src="https://res.cloudinary.com/dnv6kesmt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1636521128/mini-project/cross-icon_jezz2z.png"
                alt="close nav btn"
                className="close-nav-btn"
              />
            </button>
          </div>
        )}
        <div className="nav-bar-large-container">
          <Link to="/" className="nav-item-link">
            <h1 className="logo-heading">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <ul className="nav-controls">
            <Link to="/" className="nav-item-link">
              <li
                className={`nav-item ${activeHomeClass}`}
                onClick={this.activeHomeNav}
              >
                Home
              </li>
            </Link>

            <Link to="/about" className="nav-item-link">
              <li
                className={`nav-item ${activeAboutClass}`}
                onClick={this.activeAboutNav}
              >
                About
              </li>
            </Link>

            <Link to="/vaccination" className="nav-item-link">
              <li
                className={`nav-item ${activeVaccinationClass}`}
                onClick={this.activeVaccinationNav}
              >
                Vaccination
              </li>
            </Link>
          </ul>
        </div>
      </div>
    )
  }
}
export default Header
