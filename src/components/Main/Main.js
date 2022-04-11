import './Main.css';
import { useState } from 'react';
import Header from '../Header/Header.js'

function Main(){

    const [responseData, setResponseData] = useState(
        {
            imgUrl : '',
            youtubeLink: '',
            missionDetails: '',
            flightNumber: 0,
            crew: 0,
            missionStats: '',
            reddit: {}
        }
    );


    var req = new XMLHttpRequest();
    req.onreadystatechange = processResponse;
    req.open("GET", "https://api.spacexdata.com/v4/launches/latest");
    req.send();

    function processResponse() {
      if (req.readyState !== 4) return; // State 4 is DONE
      var response = JSON.parse(req.responseText)
      console.log(JSON.stringify(response));
      setResponseData(lastState => ({
          ...lastState,
          imgUrl : response['links']['patch']['small'],
          youtubeLink: `https://www.youtube.com/embed/${response['links']['youtube_id']}`,
          missionDetails: response['details'],
          flightNumber: response['flight_number'],
          crew: response['crew'].length,
          missionStats: response['cores'][0],
          reddit: response['links']['reddit']
      }))
    //   responseData.img = response['links']['patch']['small'];
    //   responseData.youtubeId = response['links']['youtube_id'];
    //   responseData.youtubeId = `https://www.youtube.com/embed/${responseData.youtubeId}`;
    //   responseData.missionDetails = response['details']
    //   responseData.missionStats = response['cores'][0];
    }

    return (
        <div>
            <div className="main-content-ctr" >
                <Header></Header>
                <div className="main-content">
                    <div className="info-unit mission-info">
                        <div className="inner-ctr">
                            <div className="img-wrapper"><img src={responseData.imgUrl} style={{height: 'auto'}} alt="" /></div>
                            <div className="text-wrapper">
                                <h1>Mission brief</h1>
                                <p>{responseData.missionDetails}</p>
                            </div>
                        </div>
                    </div>
                    <div className="info-unit">
                    <iframe width="100%" height="400" src={responseData.youtubeLink} title="YouTube video player" autoplay="1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="info-unit">
                        <div className="stats-ctr">
                            <h1>Flight number: #{`${responseData.flightNumber}`}</h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Crew members</td>
                                        <td>{responseData.crew}</td>
                                    </tr>
                                    <tr>
                                        <td>Successful flight</td>
                                        <td> {responseData.missionStats['landing_success'] ? <i className="fa fa-check"></i> : <i className="fa fa-cross"></i>}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing attempted</td>
                                        <td> {responseData.missionStats['landing_attempt'] ? <i className="fa fa-check"></i> : <i className="fa fa-cross"></i>}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing successful</td>
                                        <td> {responseData.missionStats['landing_success'] ? <i className="fa fa-check"></i> : <i className="fa fa-cross"></i>}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="info-unit reddit">
                            {
                        (() => {var reddit = JSON.stringify(responseData.reddit);
                            reddit = JSON.parse(reddit);
                            console.log(reddit)
                            var markup = ''
                            for(const link in reddit) {
                                if(reddit[link] != null){
                                    markup += `<a href="${reddit[link]}"><h3>${link}</h3></a>`;
                                }
                            }
                            return (
                                <div>
                                    <h1>Reddit reads</h1>
                                    <h4>Read these reddit threads all about the launch</h4>
                                    <div style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: markup}}></div>
                                </div>
                            )
                        }
                        )()
                    }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Main;