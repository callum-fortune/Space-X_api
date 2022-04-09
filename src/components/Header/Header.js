import './Header.css'
import { useState } from 'react';

function Header(){

    var daysSinceLaunch = 0;
    const [daysSince, setDaysSince] = useState();
    var responseData;

    var req = new XMLHttpRequest();
    req.onreadystatechange = processResponse;
    req.open("GET", "https://api.spacexdata.com/v4/launches/latest");
    req.send();

    function processResponse() {
      if (req.readyState !== 4) return; // State 4 is DONE
      responseData = JSON.parse(req.responseText)
      var days = Math.floor(Date.now()/1000)  - parseInt(responseData['date_unix']);
      daysSinceLaunch = Math.floor(days/60/60/24);
      setDaysSince(daysSinceLaunch == 1 ? `Launched ${daysSinceLaunch} day ago` : `Launched ${daysSinceLaunch} days ago`);
      
    }


    return (
        <header>
            <h1>SpaceX <font style={{fontSize: '0.6em', color: '#508AA8'}}>Latest launch</font></h1>
            <ul>
                <li>{daysSince}</li>
                <li>blah</li>
            </ul>
        </header>
    )
}

export default Header;