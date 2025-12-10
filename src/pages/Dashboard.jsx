import { useEffect, useState } from "react";
import WeatherHeader from "../components/WeatherHeader";
import WeatherMain from "../components/WeatherMain";
import NavComponent from "../components/NavComponent";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import {
  getWeatherByCity,
  getTwoWeeksForecast,
  getMonthlyWeather,
} from "../utils/api";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Tehran");
  const [forecast, setForecast] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [clock, setClock] = useState({ day: "", date: "", hour: "" });

  useEffect(() => {
    if (weather?.tzOffsetSec == null) return;
    const L = i18n?.language === "fa" ? "fa-IR" : "en-US";
    const tick = () => {
      const utcNowMs = Date.now();
      const cityNow = new Date(utcNowMs + weather.tzOffsetSec * 1000);
      setClock({
        day: cityNow.toLocaleDateString(L, {
          weekday: "long",
          timeZone: "UTC",
        }),
        date: cityNow.toLocaleDateString(L, {
          month: "short",
          day: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),
        hour: cityNow.toLocaleTimeString(L, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [weather?.tzOffsetSec, i18n.language]);

  const fetchAll = async (cityName) => {
    try {
      const w = await getWeatherByCity(cityName);
      setWeather(w);
      if (w?.coord?.lat != null && w?.coord?.lon != null) {
        const [f, m] = await Promise.all([
          getTwoWeeksForecast(w.coord.lat, w.coord.lon),
          getMonthlyWeather(w.coord.lat, w.coord.lon),
        ]);
        setForecast(f);
        setMonthlyData(m);
      } else {
        setForecast([]);
        setMonthlyData([]);
      }
    } catch (err) {
      console.error(err);
      alert(err?.message || t("errors.cityNotFound"));
      setForecast([]);
      setMonthlyData([]);
    }
  };

  useEffect(() => {
    fetchAll(city);
  }, [city]);

  return (
    <div>
      <NavComponent setCity={setCity} />
      {weather && (
        <WeatherHeader
          cityName={weather.cityName}
          day={clock.day}
          date={clock.date}
          hour={clock.hour}
          Temperature={weather.Temperature}
          high={weather.high}
          low={weather.low}
          Status={weather.Status}
          img={weather.img}
          feels={weather.feelsLike}
          monthlyData={monthlyData}
        />
      )}
      <WeatherMain forecast={forecast} />
      <Footer />
    </div>
  );
}
