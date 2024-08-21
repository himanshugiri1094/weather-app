import { useEffect, useState } from "react";

const getWeather = (place) => {
    const [data, setData] = useState({});
    useEffect(()=>{
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=0f85ed57f36c438092a125442242507&q=${place}&days=7&aqi=yes&alerts=no`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            const weatherData = {
                name: response.location.name,
                icon: response.current.condition.icon,
                weather: Math.floor(response.current.temp_c),
                wind: response.current.wind_kph,
                humidity: response.current.humidity,
                currForecastArr: response.forecast.forecastday[0].hour.filter((eachEle) => {
                    let len = (new Date().getTime() / 1000).toFixed();
                    return eachEle.time_epoch > len;
                }),
                nextForecastArr: response.forecast.forecastday[1].hour,
                aqi: response.current.air_quality.pm10,
                feelsLike: Math.floor(response.current.feelslike_c),
                time: response.location.localtime,
                uvIndex: response.current.uv,
            }
            const forecastArr = [...weatherData.currForecastArr, ...weatherData.nextForecastArr];
            const finalForecastArr = forecastArr.filter((currEle, idx) => {
                return idx <= 23;
            })
            const otherData = { ...weatherData.aqi, ...weatherData.uvIndex, ...weatherData.time, ...weatherData.feelsLike };
            setData({ ...weatherData, finalForecastArr, otherData });
        });
    },[place])
    return data;
}

export default getWeather;