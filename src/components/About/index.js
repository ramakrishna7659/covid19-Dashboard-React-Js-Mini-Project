import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FaqItem from '../FaqsList'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovid19Faqs()
  }

  getCovid19Faqs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(faqUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        faqsList: fetchedData.faq,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderCovidAbout = () => {
    const {faqsList} = this.state
    return (
      <div className="about-route-container">
        <h1 className="about-heading">About</h1>
        <p className="last-update">Last update on Monday, Nov 15th 2021.</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faq-list" testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqItem faqData={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCovidAboutData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidAbout()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCovidAboutData()}
      </>
    )
  }
}

export default About
