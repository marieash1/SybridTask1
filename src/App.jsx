import { useState, useEffect } from "react";
import './index.css';

function UniversityCount() {
    const [countryCount, setCountryCount] = useState({});
    // const [min, setMin] = useState(Infinity);
    // const [max, setMax] = useState(0);
    // const [minCountry, setMinCountry] = useState("");
    // const [maxCountry, setMaxCountry] = useState("");
    // const [arr, setArr] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [filteredUniversities, setFilteredUniversities] = useState([]); 

    useEffect(() => {
        fetch('http://universities.hipolabs.com/search')
            .then(response => response.json())
            .then(data => {
                const newCountryCount = {};
                data.forEach(item => {
                    let country = item.country;
                    if (newCountryCount[country]) {
                        newCountryCount[country]++;
                    } else {
                        newCountryCount[country] = 1;
                    }
                });
                setCountryCount(newCountryCount);
                setUniversities(data);

                // let minimum = Infinity;
                // let maximum = 0;
                // let miniCountry = "";
                // let maxiCountry = "";
                // let array = [];

                // Object.keys(newCountryCount).forEach(
                //     country => {
                //         let count = newCountryCount[country];
                //         if (count < minimum) {
                //             minimum = count;
                //             miniCountry = country;
                //         }
                //         if (count === 1) {
                //             array.push(country);
                //         }

                //         if (count > maximum) {
                //             maximum = count;
                //             maxiCountry = country;
                //         }
                //     });
                // setMin(minimum);
                // setMax(maximum);
                // setMinCountry(miniCountry);
                // setMaxCountry(maxiCountry);
                // setArr(array);

            }).catch(error => { console.log("Error occurred", error) });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const filtered = universities.filter(university => university.country === selectedCountry);
            setFilteredUniversities(filtered);
        } else {
            setFilteredUniversities([]);
        }
    }, [selectedCountry, universities]);

    return (
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 p-4">
          <div className="bg-gray-50 text-black rounded-lg p-4 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">University Count by Country</h1>
            <ul className="list-disc space-y-2">
              {Object.keys(countryCount).map((country, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{country}</span>
                  <span>{countryCount[country]} universities</span>
                </li>
              ))}
            </ul>
          </div>
    
          <div className="bg-gray-50 text-black rounded-lg p-4 w-full md:w-1/2 sm:w-2.5 flex flex-col">
            <select className="mb-4" onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Select Country</option>
              {Object.keys(countryCount).map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
    
            <h2 className="text-2xl font-bold  text-blue-600 mb-4">Universities in {selectedCountry}:</h2>
            <ul className="space-y-2">
              {filteredUniversities.map((university, index) => (
                <li key={index} className=" border-b border-gray-200 py-4">
                  <h3 className="font-bold">{university.name}</h3>
                  <p className="text-gray-600">Webpages: <a href={university.web_pages[0]} className="text-blue-500">{university.web_pages[0]}</a></p>
                  <p className="text-gray-600">Domain: {university.domains}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default UniversityCount;
