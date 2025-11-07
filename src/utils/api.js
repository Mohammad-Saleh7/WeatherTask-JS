// import axios from "axios";

// const API_KEY = import.meta.env.VITE_WEATHER_KEY;

// const api = axios.create({
//   baseURL: "https://api.openweathermap.org/data/2.5",
//   timeout: 10000,
// });

// export async function getWeatherByCity(cityName) {
//   try {
//     const { data } = await api.get("/weather", {
//       params: {
//         q: cityName,
//         units: "metric",
//         appid: API_KEY,
//       },
//     });

//     return {
//       cityName: data.name,
//       Temperature: `${Math.round(data.main.temp)}°C`,
//       high: Math.round(data.main.temp_max),
//       low: Math.round(data.main.temp_min),
//       Status: data.weather[0].main,
//       img: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
//       tzOffsetSec: data.timezone,
//       feelsLike: Math.round(data.main.feels_like),
//     };
//   } catch (err) {
//     console.log(err);
//     alert("City not found❗");
//   }
// }
// // *******************************************
// // const fetchWeather = async (cityName) => {
// //   try {
// //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
// //     const res = await axios.get(url);
// //     const data = res.data;

// //     setWeather({
// //       cityName: data.name,
// //       Temperature: `${Math.round(data.main.temp)}°C`,
// //       high: Math.round(data.main.temp_max),
// //       low: Math.round(data.main.temp_min),
// //       Status: data.weather[0].main,
// //       img: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
// //       tzOffsetSec: data.timezone,
// //       feelsLike: Math.round(data.main.feels_like),
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     alert("City not found!");
// //   }
// // };

// // *************************************

// // const monthlyApi = axios.create({
// //   baseURL: "https://archive-api.open-meteo.com/v1/archive",
// //   timeout: 10000,
// // });

// // export async function getMonthlyWeather(lat, lon) {
// //   try {
// //     const { data } = await monthlyApi.get("", {
// //       params: {
// //         latitude: lat,
// //         longitude: lon,
// //         start_date: "2024-01-01",
// //         end_date: "2024-12-31",
// //         monthly: "temperature_2m_mean",
// //       },
// //     });

// //     return data.monthly.time.map((month, i) => ({
// //       month, // e.g. "2024-01"
// //       avgTemp: Math.round(data.monthly.temperature_2m_mean[i]),
// //     }));
// //   } catch (err) {
// //     console.error(err);
// //     throw new Error("Couldn't fetch monthly temperature data.");
// //   }
// // }

// src/utils/api.js
import axios from "axios";
import i18n from "../i18n";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const owApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

export async function getWeatherByCity(cityName) {
  try {
    const { data } = await owApi.get("/weather", {
      params: {
        q: cityName,
        units: "metric",
        appid: API_KEY,
        lang: i18n.language === "fa" ? "fa" : "en",
      },
    });
    return {
      cityName: data.name,
      Temperature: `${Math.round(data.main.temp)}°C`,
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      // Status: data.weather?.[0]?.main ?? "Unknown",
      Status: data.weather?.[0]?.description ?? "Unknown",
      img: `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`,
      tzOffsetSec: data.timezone,
      feelsLike: Math.round(data.main.feels_like),
      coord: data.coord,
      // temp: data.main.temp,
    };
  } catch {
    throw new Error(i18n.t("errors.cityNotFound"));
  }
}

const forecastApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1/forecast",
  timeout: 10000,
});

export async function getTwoWeeksForecast(lat, lon) {
  try {
    const { data } = await forecastApi.get("", {
      params: {
        latitude: lat,
        longitude: lon,
        daily: "temperature_2m_max,weathercode",
        forecast_days: 14,
        timezone: "auto",
      },
    });

    // const map = {
    //   0: { label: "Clear sky", icon: "☀️" },
    //   1: { label: "Mainly clear", icon: "🌤" },
    //   2: { label: "Partly cloudy", icon: "⛅" },
    //   3: { label: "Overcast", icon: "☁️" },
    //   45: { label: "Fog", icon: "🌫" },
    //   48: { label: "Fog", icon: "🌫" },
    //   51: { label: "Drizzle", icon: "🌦" },
    //   61: { label: "Rain", icon: "🌧" },
    //   63: { label: "Moderate rain", icon: "🌧" },
    //   65: { label: "Heavy rain", icon: "🌧" },
    //   71: { label: "Snow", icon: "❄️" },
    //   80: { label: "Rain showers", icon: "🌦" },
    //   95: { label: "Thunderstorm", icon: "⛈" },
    // };
    const iconMap = {
      0: "☀️",
      1: "🌤",
      2: "⛅",
      3: "☁️",
      45: "🌫",
      48: "🌫",
      51: "🌦",
      61: "🌧",
      63: "🌧",
      65: "🌧",
      71: "❄️",
      80: "🌦",
      95: "⛈",
    };
    const L = i18n.language === "fa" ? "fa-IR" : "en-US";

    return data.daily.time.map((iso, i) => {
      const code = data.daily.weathercode[i];
      const d = new Date(iso);
      return {
        date: iso,
        // weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        weekday: d.toLocaleDateString(L, { weekday: "short" }),
        maxTemp: Math.round(data.daily.temperature_2m_max[i]),
        // weather: map[code]?.label ?? "Unknown",
        weather: i18n.t(`wmo.${code}`, { defaultValue: i18n.t("wmo.unknown") }),
        // icon: map[code]?.icon ?? "❔",
        icon: iconMap[code] ?? "❔",
      };
    });
  } catch {
    // throw new Error("Couldn't fetch 2 weeks forecast.");
    throw new Error(i18n.t("errors.forecast2wFail"));
  }
}

const archiveApi = axios.create({
  baseURL: "https://archive-api.open-meteo.com/v1/archive",
  timeout: 10000,
});

export async function getMonthlyWeather(lat, lon) {
  try {
    const { data } = await archiveApi.get("", {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        daily: "temperature_2m_mean,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        models: "era5",
      },
    });

    const days = data?.daily?.time || [];
    const tMean = data?.daily?.temperature_2m_mean || [];
    const tMax = data?.daily?.temperature_2m_max || [];
    const tMin = data?.daily?.temperature_2m_min || [];

    if (!days.length) throw new Error();

    const agg = Array.from({ length: 12 }, () => ({ sum: 0, n: 0 }));
    for (let i = 0; i < days.length; i++) {
      const m = new Date(days[i]).getMonth();
      const v =
        typeof tMean[i] === "number"
          ? tMean[i]
          : typeof tMax[i] === "number" && typeof tMin[i] === "number"
          ? (tMax[i] + tMin[i]) / 2
          : null;
      if (v != null && !Number.isNaN(v)) {
        agg[m].sum += v;
        agg[m].n += 1;
      }
    }

    // const labels = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];

    return agg.map((m, i) => ({
      month: `2024-${String(i + 1).padStart(2, "0")}`,
      // label: labels[i],
      label: null,
      avgTemp: m.n ? Math.round(m.sum / m.n) : null,
    }));
  } catch {
    // throw new Error("Couldn't fetch monthly temperature data.");
    throw new Error(i18n.t("errors.monthlyFail"));
  }
}
