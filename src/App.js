import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

 function App() {

  let [allData, setAllData] = useState([]);
  //const [filtered]
  //const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [isLaunchSuccess, setIsLaunchSuccess] = useState(true);
  const [isLandingSuccess, setIsLandingSuccess] = useState(true);

  useEffect( ()=> {
    renderPosts();
  },[]);

  const renderPosts = async () => {
    try {
      const fetchInitialData = await axios.get('https://api.spaceXdata.com/v3/launches?limit=100');
      //sconsole.log(JSON.stringify(fetchData.data));
      setAllData(fetchInitialData.data);
    } catch (err) {
      console.log(err);
    }
  }

  const displayYears = () => {
    return ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'].map((data,i) => (
      <div className="each-content">
        <button key={i} className="button" onClick={() => showYear(data, setYear)}>{data}</button>
      </div>
    ))
  };

  const displayLaunch = () => {
    return ['true', 'false'].map((data,i) => (
      <div className="each-content">
        <button key={i} className="button" onClick={() => showLaunch(data, setIsLaunchSuccess)}>{data}</button>
      </div>
    ))
  };

  const displayLanding = () => {
    return ['true', 'false'].map((data,i) => (
      <div className="each-content">
        <button key={i} className="button" onClick={() => showLanding(data, setIsLandingSuccess)}>{data}</button>
      </div>
    ))
  };

  const showYear = async (data, setYear) => {
    setYear(data);
    const fetchFilteredData = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${isLaunchSuccess}&land_success=${isLandingSuccess}&launch_year=${data}`);
    setAllData(fetchFilteredData.data);
  }

  const showLaunch = async (data, setIsLaunchSuccess) => {
    setIsLaunchSuccess(data);
    const fetchFilteredData = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${data}&land_success=${isLandingSuccess}&launch_year=${year}`);
    setAllData(fetchFilteredData.data);
  }

  const showLanding = async (data, setIsLandingSuccess) => {
    setIsLandingSuccess(data);
    const fetchFilteredData = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${isLaunchSuccess}&land_success=${data}&launch_year=${year}`);
    setAllData(fetchFilteredData.data);
  }

  return (
    <div>
    <header className="header">
        SpaceX Launch Programs
      </header>
    <div className="body-class">
      <div className="filter-list-box">
        Filters
      <div className="filter-list-box-container">
        <div className="sub-header">Launch Year</div>
        <div className="filter-content">
          {displayYears()}  
        </div>
      </div>

      <div className="filter-list-box-container">
        <div className="sub-header">Successful Launch</div>
        <div className="filter-content">
          {displayLaunch()}  
        </div>
      </div>

      <div className="filter-list-box-container">
        <div className="sub-header">Successful Landing</div>
        <div className="filter-content">
          {displayLanding()}  
        </div>
      </div>

      </div>
      <div className="main">
      {allData.map((data,i)=> {
        return (
          
          <div key={i} className="filtered-data">
            <div className="data-container">

              <div className="section">
                <div className="image-body">
                  <img src={data.links.flickr_images[0]} className="image"></img>
                </div>
                <div className="image-title">
                {data.mission_name}#{data.flight_number}
                  </div>
              </div>
              
              <div className="section">
                <label htmlFor="mission_id" className="label-section">Mission Ids: </label>   
                <ul>
                  {
                    data.mission_id && data.mission_id.map((id,j) => <li key={j}>{id}</li>)
                  }
                </ul>
                </div>
              
              <div className="section">
                <label htmlFor="launch_year" className="label-section">Launch Year: </label>
                  {data.launch_year}
              </div>
              
              <div className="section">
                <label htmlFor="launch_success" className="label-section">Successful Launch: </label>
                  <span>{JSON.stringify(data.launch_success)}</span>
                  </div>
                
                  <div className="section">
                <label htmlFor="launch_landing" className="label-section">Successful Landing: </label>
                  {data.launch_landing}
                  </div>
                
              </div>
            </div>
            
        )
      })
      
        
      }
      </div>
      
    </div>
    </div>
  );
}

export default App;
