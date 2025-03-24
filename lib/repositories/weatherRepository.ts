import axios from "axios"

// These would typically be in your .env.local file
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || process.env.API_KEY
const API_KEY_NEWS = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.API_KEY_NEWS

export const fetchWeatherData = async (cityName: string) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
  return response.data
}

export const fetchNews = async () => {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY_NEWS}`)
  return response.data
}

