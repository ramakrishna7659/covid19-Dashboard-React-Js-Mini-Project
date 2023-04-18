import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SearchRecommendation = props => {
  const {state} = props
  const {stateCode, stateName} = state

  return (
    <Link className="recommendation-link-item" to={`/state/${stateCode}`}>
      {/* <li className="recommendation-card" onClick={onClickSearchItem}> */}
      <li className="recommendation-card">
        <p className="suggest-state-name">{stateName}</p>
        <div className="stateCode-item">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-square-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchRecommendation
