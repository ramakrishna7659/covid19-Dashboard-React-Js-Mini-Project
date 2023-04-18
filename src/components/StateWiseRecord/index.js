import './index.css'

const StateWiseRecord = props => {
  const {stateTotal} = props
  const {confirmed, deceased, name, population, recovered, active} = stateTotal

  // console.log(confirmed)
  return (
    <li className="state-total-record-card">
      <p className="case-item state-name">{name}</p>
      <p className="case-item  confirmed1">{confirmed}</p>
      <p className="case-item active1">{active}</p>
      <p className="case-item  recovered1">{recovered}</p>
      <p className="case-item  deceased1">{deceased}</p>
      <p className="case-item population">{population}</p>
    </li>
  )
}

export default StateWiseRecord
