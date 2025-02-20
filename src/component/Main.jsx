import { useContext } from "react";
import { newContext } from "../context/Context";
import "../App.css";

function Main() {
  const {
    videoRef,
    video,
    sehir,
    handleSehirChange,
    sehirler,
    gunlukData,
    videoSource,
    handleDayClick,
  } = useContext(newContext);
  return (
    <div className="mainDiv">
      <div className="video-background">
        <video autoPlay loop muted playsInline ref={videoRef}>
          <source src={`${videoSource(video)}`} type="video/mp4"></source>
        </video>
      </div>
      <select value={sehir} onChange={handleSehirChange}>
        {sehirler.map((sehirSecim, index) => (
          <option key={index} value={sehirSecim}>
            {sehirSecim}
          </option>
        ))}
      </select>
      <br></br> <br></br>
      <h1>{sehir} - 5 Günlük Hava Tahmini</h1>
      <div className="container">
        {gunlukData.length > 0 ? (
          <ul className="liste" onClick={handleDayClick}>
            {gunlukData.map((forecast, index) => {
              const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}.png`;
              return (
                <li key={index} id={index === 0 ? "li0" : ""} className="days">
                  {forecast.dayName}
                  <br></br>
                  <img
                    src={iconUrl}
                    alt={forecast.main}
                    title={forecast.description}
                    className="icons"
                  />{" "}
                  <br></br>
                  <small className="max">
                    {forecast.maxTemp.toFixed(0)}°C{" "}
                  </small>{" "}
                  <br></br>
                  <small className="min">{forecast.minTemp.toFixed(0)}°C</small>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Hava durumu verileri yükleniyor...</p>
        )}
      </div>
    </div>
  );
}

export default Main;
