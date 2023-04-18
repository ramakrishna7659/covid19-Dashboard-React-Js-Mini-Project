import './index.css'

const DistrictItem = props => {
  const {
    districtDetails,
    showConfirmedCases,
    showRecoveredCases,
    showDeceasedCases,
    showActiveCases,
  } = props

  const {
    districtName,
    confirmed,
    recovered,
    deceased,
    // tested,
    active,
  } = districtDetails
  return (
    <li className="district-records">
      {showConfirmedCases && <p className="count">{confirmed}</p>}
      {showRecoveredCases && <p className="count">{recovered}</p>}
      {showDeceasedCases && <p className="count">{deceased}</p>}
      {showActiveCases && <p className="count">{active}</p>}
      <p className="district-name ">{districtName}</p>
    </li>
  )
}

export default DistrictItem
