import { useEffect } from "react";
import { useState } from "react";

export default function useCountries({ isMemberOfUN = false, isIndependent = false, sortBy = "Population", regions = [], searchTerm = null }) {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,region,population,area,flags,independent,unMember,cca3");
            let data = await response.json();

            if (isMemberOfUN) data = data.filter(country => country.unMember);
            if (isIndependent) data = data.filter(country => country.independent);

            if (regions.length > 0) {
                data = data.filter(country => regions.includes(country.region));
            }

            if (sortBy === "Population") {
                data = data.sort((a, b) => b.population - a.population);
            }
            else if (sortBy === "Alphabetical") {
                data = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            }

            if (searchTerm) {
                data = data.filter(country => (country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) || country.region.toLowerCase().includes(searchTerm.toLowerCase())));
            }

            setCountries(data);
        };
        fetchCountries();
    }, [isMemberOfUN, isIndependent, regions, sortBy, searchTerm]);
    return countries;
}