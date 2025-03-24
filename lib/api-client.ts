// API client functions to interact with our backend

export async function fetchCities() {
  try {
    const response = await fetch("/api/cities")
    if (!response.ok) {
      throw new Error("Failed to fetch cities")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching cities:", error)
    throw error
  }
}

export async function fetchWeatherForCity(cityName: string) {
  try {
    const response = await fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityName }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching weather for ${cityName}:`, error)
    throw error
  }
}

export async function fetchWeatherForAllCities() {
  try {
    const cities = await fetchCities()
    const weatherPromises = cities.map(async (city: string) => {
      const weatherData = await fetchWeatherForCity(city)
      return { cityName: city, weatherData }
    })

    return await Promise.all(weatherPromises)
  } catch (error) {
    console.error("Error fetching weather for all cities:", error)
    throw error
  }
}

export async function fetchAlerts() {
  try {
    const response = await fetch("/api/alerts")
    if (!response.ok) {
      throw new Error("Failed to fetch alerts")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching alerts:", error)
    throw error
  }
}

