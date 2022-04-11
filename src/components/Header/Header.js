import './Header.css'
import { useState } from 'react';

function Header(){

    var daysSinceLaunch = 0;
    const [daysSince, setDaysSince] = useState();
    const [wikiUrl, setWikiUrl] = useState();
    const [missionName, setMissionName] = useState();
    var responseData;

    var req = new XMLHttpRequest();
    req.onreadystatechange = processResponse;
    req.open("GET", "https://api.spacexdata.com/v4/launches/latest");
    req.send();

    function processResponse() {
      if (req.readyState !== 4) return; // State 4 is DONE
      responseData = JSON.parse(req.responseText)
      var wikiUrl = responseData['links']['wikipedia'];
      setWikiUrl(wikiUrl);
      var missionName = responseData['name'];
      setMissionName(missionName);
      var days = Math.floor(Date.now()/1000)  - parseInt(responseData['date_unix']);
      daysSinceLaunch = Math.floor(days/60/60/24);
      setDaysSince(daysSinceLaunch == 1 ? `Launched ${daysSinceLaunch} day ago` : `Launched ${daysSinceLaunch} days ago`);
      
    }


    return (
        <header>
            <h1>SpaceX <font style={{fontSize: '0.6em', color: '#508AA8'}}>Latest launch: {missionName}</font></h1>
            <ul>
                <li>{daysSince}</li>
                <a className='wiki-link' href={wikiUrl}>
                    <li>Wikipedia</li>
                </a>
            </ul>
        </header>
    )
}

export default Header;