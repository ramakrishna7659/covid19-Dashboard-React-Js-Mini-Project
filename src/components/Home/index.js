import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StateWiseTotalRecord from '../StateWiseRecord'
import HomeCaseCardItem from '../HomeCaseCardItem'
import SearchRecommendation from '../SearchRecommendation'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
let TabelData = []

class Home extends Component {
  state = {
    stateWiseData: {},
    showStateStats: true,
    showSearchSuggestions: false,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    sortedTableStatesList: TabelData,
    showAscSort: false,
    showDescSort: false,
    showInitialTable: true,
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getAllStatesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response1 = await fetch(apiUrl, options)
    const fetchedData1 = await response1.json()

    this.setState({
      stateWiseData: fetchedData1,
      apiStatus: apiStatusConstants.success,
    })
  }

  onchangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({
        showSearchSuggestions: false,
        searchInput: event.target.value,
        showStateStats: true,
      })
    } else {
      this.setState({
        showSearchSuggestions: true,
        searchInput: event.target.value,
        showStateStats: false,
      })
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {stateWiseData} = this.state
    // console.log(`stateWiseData`, stateWiseData)

    // getting keys of an object object
    const keyNames = Object.keys(stateWiseData)

    keyNames.forEach(keyName => {
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        let stateName
        const name = statesList.find(state => state.state_code === keyName)
        if (name !== undefined) {
          stateName = name.state_name
        }

        resultList.push({
          stateCode: keyName,
          // name: statesList.find(state => state.state_code === keyName),
          name: stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // returning sorted resultList
    return resultList.sort((a, b) => {
      const x = a.name
      const y = b.name
      //  console.log('x', x, y, 'name')
      return x > y ? 1 : -1
    })
  }

  sortByCaseKeyDesc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? -1 : 1
    })

  sortByCaseKeyAsc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      // console.log('x', x, y, key)
      return x > y ? 1 : -1
    })

  sortAscending = () => {
    const sortedStateArray = this.sortByCaseKeyAsc(TabelData, 'name')
    this.setState({
      sortedTableStatesList: sortedStateArray,
      showDescSort: false,
      showAscSort: true,
      showInitialTable: false,
    })
  }

  sortDescending = () => {
    const sortedStateArrayrev = this.sortByCaseKeyDesc(TabelData, 'name')
    this.setState({
      sortedTableStatesList: sortedStateArrayrev,
      showAscSort: false,
      showDescSort: true,
      showInitialTable: false,
    })

    // console.log(sortedStateArrayrev)
  }

  renderCovidCasesData = () => {
    const {
      stateWiseData,
      timeLineData,
      searchInput,
      showSearchSuggestions,
      showStateStats,
      sortedTableStatesList,
      showAscSort,
      showDescSort,
      showInitialTable,
    } = this.state

    TabelData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    // console.log(`tableData`, TabelData)
    // console.log(`tableStateDataList`, tableStateDataList)
    // TabelData.map(eachState => {
    //     totalConfirmed : eachState.confirmed

    // } console.log(eachState))

    let filteredStatesList = []
    filteredStatesList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const getUpdatedFilteredStates = state => ({
      stateCode: state.state_code,
      stateName: state.state_name,
    })

    const updatedFilteredStates = filteredStatesList.map(eachState =>
      getUpdatedFilteredStates(eachState),
    )

    const getUpdated = (a, b) => ({
      confirmed: a.confirmed + b.confirmed,
      deceased: a.deceased + b.deceased,
      recovered: a.recovered + b.recovered,
      active: a.active + b.active,
    })

    const sum = TabelData.reduce(getUpdated)
    // console.log(sum)

    return (
      <div className="home-route-container">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Enter the State"
            onChange={this.onchangeSearchInput}
            onBlur={this.onChangeFocus}
            value={searchInput}
          />
        </div>
        {showSearchSuggestions && (
          <ul
            testid="searchResultsUnorderedList"
            className="search-recommendation-list"
          >
            {updatedFilteredStates.map(eachState => (
              <SearchRecommendation
                key={eachState.stateCode}
                state={eachState}
                allStates={stateWiseData}
                timeLineData={timeLineData}
                gotoStateSpecificRoute={this.gotoStateSpecificRoute}
              />
            ))}
          </ul>
        )}

        <div className="states-records-container">
          {showStateStats && (
            <div className="stats-section">
              {/* <div className="diff-type-total-case-cards">
                {TabelData.map(
                  eachTotal =>
                    eachTotal.name === undefined && (
                      <HomeCaseCardItem
                        key={eachTotal.confirmed}
                        stateTotal={eachTotal}
                      />
                    ),
                )}
              </div> */}

              <div className="diff-type-total-case-cards">
                <HomeCaseCardItem stateTotal={sum} />
                {/* Directly return
                component without using map() method. */}{' '}
              </div>

              <div
                className="state-wise-records"
                testid="stateWiseCovidDataTable"
              >
                <div className="state-wise-total-table-record">
                  <div className="total-record">
                    <div className="table-head">
                      <div className="sorting-item">
                        <p className="table-heading">States/UT</p>
                        <button
                          type="button"
                          className="sort-icon"
                          testid="ascendingSort"
                          onClick={this.sortAscending}
                        >
                          <FcGenericSortingAsc />
                        </button>
                        <button
                          type="button"
                          className="sort-icon"
                          testid="descendingSort"
                          onClick={this.sortDescending}
                        >
                          <FcGenericSortingDesc />
                        </button>
                      </div>
                      <p className="table-heading">Confirmed</p>
                      <p className="table-heading">Active</p>
                      <p className="table-heading">Recovered</p>
                      <p className="table-heading">Deceased</p>
                      <p className="table-heading">Population</p>
                    </div>
                    {/* <hr className="hr-line" /> */}
                    <ul className="table-results">
                      {showInitialTable &&
                        TabelData.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseTotalRecord
                                key={eachTotal.stateCode}
                                stateTotal={eachTotal}
                              />
                            ),
                        )}
                      {showAscSort &&
                        sortedTableStatesList.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseTotalRecord
                                key={eachTotal.stateCode}
                                stateTotal={eachTotal}
                              />
                            ),
                        )}
                      {showDescSort &&
                        sortedTableStatesList.map(
                          eachTotal =>
                            eachTotal.name !== undefined && (
                              <StateWiseTotalRecord
                                key={eachTotal.confirmed}
                                stateTotal={eachTotal}
                              />
                            ),
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="covid-loader-container">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCovidData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidCasesData()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderCovidData()}
      </div>
    )
  }
}

export default Home
