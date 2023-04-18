import {FaTwitter} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    {/* <h1 className="logo-heading">
      COVID19<span className="india">INDIA</span>
    </h1> */}
    <h1 className="logo-heading">COVID19INDIA</h1>
    <p className="footer-description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="social-icons-container">
      <VscGithubAlt className="icon" />
      <FiInstagram className="icon" />
      <FaTwitter className="icon" />
    </div>
  </div>
)

export default Footer
