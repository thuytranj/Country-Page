import { useState } from "react"
import { useEffect } from "react"

const fetchCountryInfo = async (cca3, fields = []) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}?fields=${fields.join(",")}`);
  const data = await response.json();
  return data;
}
export default function InfoPage({ isOpen, cca3, onClose, onClickBorder, formatNumber }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const [countryInfo, setCountryInfo] = useState({})
  const [borders, setBorders] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountryInfo(cca3, ["name", "population", "area", "region", "subregion", "flags", "capital", "currencies", "languages", "borders"]);
      setCountryInfo(data);
      // console.log(data);

      if (data.borders && data.borders.length > 0) {
        const borderData = await Promise.all(data.borders.map(border => fetchCountryInfo(border, ["name", "flags", "cca3"])));
        setBorders(borderData);
        // console.log(borderData)
      }
      else setBorders([]);
    }
    fetchData();
  }, [cca3]);

  // console.log(borders);
  return (
    <div className="w-screen h-screen fixed z-100 top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center overflow-y-scroll pt-32 pb-5 max-sm:pt-20" onClick={onClose}>
      <div className="bg-[#1B1D1F] border-1 border-[#282B30] rounded-sm w-3/5 flex flex-col items-center gap-5 max-lg:w-9/10 max-w-3xl" onClick={e => e.stopPropagation()}>
        <div className="w-full min-h-30 relative flex justify-center">
          <img src={countryInfo.flags?.svg} alt="flag" className="absolute bottom-0 w-2/5 max-md:w-1/2 h-auto object-cover z-1000 rounded-lg min-w-50" />
        </div>
        <div className="w-full flex flex-col items-center gap-4 px-5">
          <h1 className="text-4xl font-bold">{countryInfo.name?.common}</h1>
          <h2 className="text-xl">{countryInfo.name?.official}</h2>
          <div className="w-full flex items-center justify-evenly gap-2 max-lg:flex-col max-lg:gap-5 max-lg:items-stretch">
            <div className="bg-[#282B30] px-4 py-1 rounded-sm text-lg w-1/2 text-center max-lg:w-auto">Population <span className="text-[#1B1D1F] text-2xl">|</span> {formatNumber(countryInfo.population)}</div>
            <div className="bg-[#282B30] px-4 py-1 rounded-sm text-lg w-1/2 text-center max-lg:w-auto">Area (km<sup>2</sup>) <span className="text-[#1B1D1F] text-2xl">|</span> {formatNumber(countryInfo.area)}</div>
          </div>
        </div>

        <div className="flex flex-col w-full h-auto bg-[#1B1D1F]">
          <div className="border-t-2 border-[#282B30] w-full flex justify-between px-5 py-4 gap-2">
            <p className="text-lg">Capital</p>
            <p className="text-lg">{countryInfo.capital}</p>
          </div>

          <div className="border-t-2 border-[#282B30] w-full flex justify-between px-5 py-4 gap-2">
            <p className="text-lg">Subregion</p>
            <p className="text-lg">{countryInfo.subregion}</p>
          </div>

          <div className="border-t-2 border-[#282B30] w-full flex justify-between px-5 py-4 gap-2">
            <p className="text-lg">Languages</p>
            <p className="text-lg">
              {countryInfo.languages && Object.values(countryInfo.languages).join(", ")}
            </p>
          </div>

          <div className="border-t-2 border-[#282B30] w-full flex justify-between px-5 py-4 gap-2">
            <p className="text-lg">Currencies</p>
            <p className="text-lg">{countryInfo.currencies && Object.values(countryInfo.currencies).map((currency) => currency.name).join(", ")}</p>
          </div>

          <div className="border-t-2 border-[#282B30] w-full flex justify-between px-5 py-4 gap-2">
            <p className="text-lg">Continents</p>
            <p className="text-lg">{countryInfo.region}</p>
          </div>

          <div className="border-t-2 border-[#282B30] w-full flex flex-col px-5 py-4 gap-4">
            <p className="text-lg">Neighboring countries</p>
            <div className="flex overflow-x-auto gap-4">
              {borders && borders.map((border, index) => (
                <div key={index} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => onClickBorder(border.cca3)}>
                  <img src={border.flags?.svg} alt="flag" className="w-12 h-8 object-cover rounded-sm" />
                  <p className="text-lg text-center whitespace-nowrap">{border.name?.common}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}