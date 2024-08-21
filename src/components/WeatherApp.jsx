import React, { useEffect, useState } from 'react'
import getWeather from '../WeatherApi/getWeather';

function WeatherApp() {

    // const [data, setData] = useState({});
    const [input, setInput] = useState("");
    const [place, setPlace] = useState("london");

    const data = getWeather(place);

    return (
        <div className='myFont body h-dvh w-dvw flex justify-center items-center gap-2 p-1 max-sm:flex-col max-sm:h-fit max-xl:flex-wrap max-xl:content-center max-lg:flex-nowrap max-lg:flex-col max-lg:h-fit'>
            <div className='gradientbg h-96 w-1/5 flex flex-col justify-evenly items-center text-white rounded-lg max-2xl:w-96 max-sm:w-11/12'>
                <div className='h-10 w-4/5 flex items-center justify-evenly px-1 '>
                    <input
                        type="text"
                        placeholder='Search'
                        className='h-full w-3/4 pl-4 outline-none rounded-full text-black placeholder:text-gray-500 placeholder:font-semibold'
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <div
                        className='h-10 w-10 flex justify-center items-center bg-white rounded-full'
                        onClick={(e) => {
                            e.preventDefault();
                            setPlace(input);
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                    </div>
                </div>

                <div className='h-16 w-16 flex justify-center items-center'>
                    <img
                        src={data.icon}
                        alt="temperature type icon"
                        className="object-contain"
                    />
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <h1 className='text-5xl'>{data.weather}&deg;C</h1>
                    <p className='text-3xl'>{data.name}</p>
                </div>
                <div className='h-12 w-4/5 flex items-center justify-between gap-1'>
                    <div className='h-full w-1/2 flex items-center justify-start gap-2'>
                        <i className="fa-solid fa-water text-2xl"></i>
                        <div>
                            <div>{data.humidity}%</div>
                            <div>Humidity</div>
                        </div>
                    </div>
                    <div className='h-full w-1/2 flex items-center justify-end gap-2'>
                        <i className="fa-solid fa-wind text-2xl"></i>
                        <div>
                            <div>{data.wind} km/h</div>
                            <div>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='gradientbg2 h-96 w-1/5 text-white flex flex-col items-center gap-4 p-1 overflow-auto noscroll rounded-lg max-2xl:w-96 max-sm:w-11/12'>
                <h1 className='text-2xl'>24 Hours Forecast</h1>
                {
                    data.finalForecastArr ? (
                        data.finalForecastArr.map((currEle, idx) => {
                            return (
                                <div
                                    className='flex justify-center items-center font-semibold gap-2'
                                    key={idx}>
                                    <p
                                        className='text-lg'
                                    >{currEle.time.substring(10, 16)}</p>
                                    <img
                                        className='h-12 w-14'
                                        src={currEle.condition.icon} alt="weather type icon" />
                                    <p
                                        className='text-lg'
                                    >{currEle.temp_c}&deg;C</p>
                                </div>
                            )
                        })
                    ) : ("")
                }
            </div>
            {
                data.otherData ? (
                    <div className='gradientbg3 h-96 w-1/5 flex flex-wrap justify-center items-center content-center gap-2 rounded-lg max-2xl:w-96 max-sm:w-11/12 max-sm:mb-2'>
                        <div className='h-40 w-40 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center gap-1'>
                            <h1 className='text-xl font-semibold'>Local Date</h1>
                            <p className='text-lg'>{data.time.substring(0, 10)}</p>
                        </div>
                        <div className='h-40 w-40 rounded-lg bg-white flex flex-col items-center justify-center gap-1'>
                            <img
                                src="aqi-icon.jpg"
                                alt="aqi icon image"
                                className='h-22 w-36'
                            />
                            <p className='text-xl font-semibold'>{data.aqi}</p>
                        </div>
                        <div className='h-40 w-40 rounded-lg flex flex-col bg-white items-center justify-center gap-1'>
                            <img
                                src="uv-icon.jpg"
                                alt="uv index icon image"
                                className='h-22 w-36 object-'
                            />
                            <p className='text-xl font-semibold'>{data.uvIndex}</p>
                        </div>
                        <div className='h-40 w-40 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center gap-3'>
                            <h1 className='text-xl font-semibold'>Feels Like</h1>
                            <p className='text-4xl'>{data.feelsLike}&deg;C</p>
                        </div>
                    </div>
                ) : ('')
            }
        </div>
    )
}

export default WeatherApp
