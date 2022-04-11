import './Main.css';
import { useState } from 'react';
import Header from '../Header/Header.js'

function Main(){

    const [imgUrl, setImgUrl] = useState();
    const [missionDetails, setMissionDetails] = useState();
    const [youtubeId, setYoutubeId] = useState();
    const [missionStats, setMissionStats] = useState();

    var req = new XMLHttpRequest();
    req.onreadystatechange = processResponse;
    req.open("GET", "https://api.spacexdata.com/v4/launches/latest");
    req.send();

    function processResponse() {
      if (req.readyState !== 4) return; // State 4 is DONE
      var responseData = JSON.parse(req.responseText)
      console.log(JSON.stringify(responseData));
      var img = responseData['links']['patch']['small'];
      var youtubeId = responseData['links']['youtube_id'];
      var youtubeId = `https://www.youtube.com/embed/${youtubeId}`;
      var missionDetails = responseData['details']
      var missionStats = responseData['cores'][0];
      setImgUrl(img) 
      setMissionDetails(missionDetails)
      setYoutubeId(youtubeId)
      setMissionStats(missionStats)
    }

    return (
        <div>
            <div className="main-content-ctr" >
                <Header></Header>
                <div className="main-content">
                    <div className="info-unit mission-info">
                        <div className="inner-ctr">
                            <div className="img-wrapper"><img src={imgUrl} style={{height: 'auto'}} alt="" /></div>
                            <div className="text-wrapper">
                                <h1>Mission brief</h1>
                                <p>{missionDetails}</p>
                            </div>
                        </div>
                    </div>
                    <div className="info-unit">
                    <iframe width="100%" height="400" src={youtubeId} title="YouTube video player" autoplay="1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="info-unit">
                        <div className="stats-ctr">
                            <h1>Flight number 32</h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Crew</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Successful flight</td>
                                        <td><i className="fa fa-check"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Fairings</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Crew</td>
                                        <td>4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Main;