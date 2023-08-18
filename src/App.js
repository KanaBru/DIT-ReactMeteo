
import { useCallback, useEffect, useState } from 'react';
import { formatData } from './fonctions/formatdata';
import Aujourdhui from "./components/Aujourdhui";
import Semaine from "./components/Semaine";

function App() {

  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [geLoc, setGeoLoc] = useState({ Latitude: 0, Longitude: 0 });
  const [weatherUnits, setWeatherUnits] = useState({})
  const [weatherData, setWeatherData] = useState([])


  const fetchweather = useCallback(async (url) => {
    setErreur(false);

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);

      if (Object.keys(data).length == 0) {
        setErreur(true)
      } else {
        //formate dally


        const formaFrancais = formatData(data.daily);
        setWeatherData(formaFrancais);

        setWeatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
        })
      }
    } catch (error) {

    }

  }, []);

  useEffect(() => {
    setEnCours(true);

    if (!navigator.geolocation) {
      Window.alert("Votre navigateur");
    }

    getGeolocalisation();

    fetchweather(
      `https://api.open-meteo.com/v1/forecast?latitude=${geLoc.Latitude}&longitude=${geLoc.Longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=auto`
    ).then(() => setEnCours(false));

  }, []);

  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      setGeoLoc({ Latitude: position.coords.latitude, Longitude: position.coords.longitude })
    }, () => {
      setErreur(true);
    })
  };


  if (enCours) {
    return (
      <div>
        <p>Chargement en cours ...</p>
      </div>
    )
  }

  if (erreur) {
    return (
      <div>
        <p>Une erreur de chargement</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen h-max  bg-gray-600 flex justify-center items-start p-8 md:px-20 ">
      <div className="w-full max-w-7xl bg-gradient-to-r from-gray-500 to-blue-500 rounded-lg shadow-lg px-4 py-4 xl:py-12 xl:px-28 md:px-12 md:py-8 ">
        <Aujourdhui data={weatherData[0]} weatherUnits={weatherUnits} />
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
          {weatherData &&
            weatherData
              .slice(1, weatherData.length)
              .map((data, index) => (
                <Semaine
                  key={index}
                  data={data}
                  weatherUnits={weatherUnits}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
