import { useState } from 'react'
import useCountries from './hooks/useCountries'
import InfoPage from './pages/InfoPage'

function App() {
  // useState for regions
  const regions = ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania']
  const [selectedRegion, setSelectedRegion] = useState([])

  // useState for status
  const status = ["Member of the United Nations", "Independent"]
  const [selectedStatus, setSelectedStatus] = useState([])

  // useState for sorting
  const sortBy = ["Population", "Alphabetical"]
  const [selectedSortBy, setSelectedSortBy] = useState("Population")
  const [showSortBox, setShowSortBox] = useState(false)

  // useState for searching
  const [searchTerm, setSearchTerm] = useState("")

  // useState for info page
  const [showInfoPage, setShowInfoPage] = useState(false)
  const [selectedCca3, setSelectedCca3] = useState("")

  const countries = useCountries({ isMemberOfUN: selectedStatus.includes("Member of the United Nations"), isIndependent: selectedStatus.includes("Independent"), regions: selectedRegion, sortBy: selectedSortBy , searchTerm});

  const toggleRegion = (region) => {
    if (selectedRegion.includes(region)) {
      setSelectedRegion(selectedRegion.filter(r => r !== region))
    } else {
      setSelectedRegion([...selectedRegion, region])
    }
  }

  const toggleStatus = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(s => s !== status))
    } else {
      setSelectedStatus([...selectedStatus, status])
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  }

  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      <div className="w-full h-64 bg-[url('/images/hero-image-sm.jpg')] 
                md:bg-[url('/images/hero-image.jpg')] 
                bg-cover bg-center absolute z-0 flex justify-center items-center">
        <img src={`${baseUrl}/images/Logo.svg`} alt="logo"></img>
      </div>

      <div className="w-9/10 absolute z-10 top-50 bg-[#1B1D1F] rounded-md border-2 border-[#282B30] flex flex-col gap-4 p-10 max-lg:w-11/12 max-lg:p-5">
        <div className="flex justify-between items-center max-lg:flex-col max-lg:items-start max-lg:gap-5">
          <h3 className="font-bold text-2xl">Found {countries.length} countries</h3>
          <div className="flex gap-2 items-center bg-[#282B30] rounded-md px-2 max-lg:w-full max-lg:justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="#D2D5DA" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="#D2D5DA" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            <input type="search" className="border-none rounded-md p-2 text-md w-80 outline-none placeholder-[#D2D5DA] font-[var(--font-vietnam)]" placeholder="Search by Name, Region ..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-10 justify-between max-lg:flex-col">
          <div className="flex flex-col gap-10 max-w-1/4 max-lg:max-w-full">
            <div className="flex flex-col gap-2 cursor-pointer relative">
              <h3 className="text-lg">Sort by</h3>
              <div className="border-1 border-[#6C727F] rounded-lg py-2 px-4 flex justify-between items-center max-lg:w-full" onClick={() => setShowSortBox(!showSortBox)}>{selectedSortBy}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6L8 10L4 6" stroke="#D2D5DA" strokeWidth="2"/>
                </svg>
              </div>

              {showSortBox && (
                <div className="absolute w-full top-full left-0 bg-[#1B1D1F] border-1 border-[#6C727F] rounded-lg mt-2 p-2 z-10 flex flex-col gap-1">
                  {sortBy.map(sort => (
                    <div key={sort} onClick={() => { setSelectedSortBy(sort); setShowSortBox(false) }} className="relative overflow-hidden rounded-sm px-2 py-1 cursor-pointer bg-gradient-to-r from-[#282B30] to-[#282B30] bg-[length:0%_100%] hover:bg-[length:100%_100%] transition-[background-size] duration-300 ease-out bg-no-repeat bg-left">
                      {sort}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg">Region</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {regions.map(region => (
                  <span key={region} onClick={() => toggleRegion(region)} className={`cursor-pointer rounded-md px-2 py-1 text-md transition-all duration-200 ${selectedRegion.includes(region) ? 'bg-[#282B30]' : 'hover:bg-[#282B30]'}`}>{region}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg">Status</h3>

              {status.map(sta => (
                <label key={ sta } className="flex items-center gap-2 cursor-pointer">
                  <span onClick={() => toggleStatus(sta)} className={`w-5 h-5 flex items-center justify-center border-2 rounded-sm transition-colors duration-200 ${selectedStatus.includes(sta)?"bg-blue-500 border-none":""} border-gray-400`}>

                    {/* Dấu check */}
                    {selectedStatus.includes(sta) && <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>}
                  </span> { sta }
                </label>
              ))}
            </div>
          </div>

          {/* countries */}
          <div className="w-full h-auto flex flex-col gap-4">
            <div className="flex w-full gap-2 border-b-1 border-[#6C727F] p-2 mb-2">
              <h5 className="text-md w-1/10 max-lg:w-1/5">Flag</h5>
              <h5 className="text-md w-7/20 max-lg:w-2/5">Name</h5>
              <h5 className="text-md w-1/5 max-lg:w-2/5">Population</h5>
              <h5 className="text-md w-1/5 max-lg:hidden">Area</h5>
              <h5 className="text-md w-3/20 max-lg:hidden">Region</h5>
            </div>

            {countries.map(country => (
              <div key={country.cca3} className="flex w-full gap-2 items-center rounded-sm p-2 bg-gradient-to-r from-[#282B30] to-[#282B30] bg-[length:0%_100%] hover:bg-[length:100%_100%] transition-all duration-200 ease-out bg-no-repeat bg-left cursor-pointer" onClick={() => { setSelectedCca3(country.cca3); setShowInfoPage(true); }}>
                  <div className="w-1/10 h-auto max-lg:w-1/5">
                    <img src={country.flags.svg} alt={country.name} className="w-4/5 h-auto object-cover rounded-md max-lg:w-2/3" />
                  </div>
                  <p className="w-7/20 text-lg max-lg:w-2/5">{country.name.common}</p>
                  <p className="w-1/5 text-lg max-lg:w-2/5">{formatNumber(country.population)}</p>
                  <p className="w-1/5 text-lg max-lg:hidden">{formatNumber(country.area)}</p>
                  <p className="w-3/20 text-lg max-lg:hidden">{country.region}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
      {showInfoPage && <InfoPage cca3={selectedCca3} isOpen={showInfoPage} onClose={() => setShowInfoPage(false)} onClickBorder={(border) => setSelectedCca3(border)} formatNumber={(num) => formatNumber(num)} />}
    </>
  )
}

export default App;
