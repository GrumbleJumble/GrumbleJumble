import React, { useState, useEffect } from 'react';

import axios from 'axios';
import styles from '../styles/Home.module.css';

import {Container, Row, Col, Button} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import PropagateLoader from 'react-spinners/PropagateLoader';

import BusinessResults from '../components/BusinessResults';
import MainResult from '../components/MainResult';

// import logo from '/logo.png';

export default function Home() {
  const [distance, setDistance] = useState(6)
  const [mainBusiness, setMainBusiness] = useState('')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [contentState, setcontentState] = useState('landing')

  // useEffect(() => {
  // }, [])

  const handleChangeDistance = (event) => {
    setDistance(event.target.value)
  }

  const handleDecideBtn = () => {
    if (navigator.geolocation){
      setLoading(true)
      navigator.geolocation.getCurrentPosition( async (position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        const yelpSearchUrl = `http://localhost:5000/v1/search?latitude=0&longitude=${long}&radius=${distance}`
        console.log(yelpSearchUrl)

        try {
          const res = await axios.get(yelpSearchUrl)
          const results = res.data.results
          setMainBusiness(results[0])
          setBusinesses(results.slice(1,6))
          setLoading(false)
          setcontentState('results')
        } catch (e) {
          if (e.response) {
            let errMsg = `${e.response.status} error from Yelp API: ${e.response.data}`
            console.log(errMsg);
            alert(errMsg)
          } else {
            alert('Error calling Yelp API')
          }
        }
      })
    }else{
      alert('Turn on your location fool.')
    }
  }

  const handleGoBackBtn = () => {
    setcontentState('landing');
  }

  if (contentState === 'landing') {
    return (
      <div className={styles.background}>
        <Container className={styles.homeLayout}>
            <div className={styles.landingText}>
              <img src="/images/logo.png" style={{height: '20vw'}} alt="logo"/>
              <h1 style={{fontSize: '50px'}}>GrumbleJumble</h1>
              <p style={{fontSize: '25px'}}>Can't decide what to eat?</p>
            </div>

            <div className={styles.distanceSection}>
              <p style={{fontSize: '18px'}}>How far are you willing to travel?</p>

              <RangeSlider
                  value={distance}
                  min={1}
                  max={10}
                  step={1}
                  size='lg'
                  tooltipPlacement='bottom'
                  tooltip='on'
                  variant='info'
                  onChange={handleChangeDistance}
                  tooltipLabel={currentValue => `${currentValue} Miles`}

                />   
  
              </div>        
            <Button variant='info' className={styles.decideBtn} onClick={handleDecideBtn}>Let's Jumble!</Button>
            {loading && 

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <PropagateLoader
                size={30}
                loading={loading}
                color='#17a2b8'
                css='margin: 0rem 2rem 0rem 0rem;'
              />
              </div>}
        </Container>
      </div>
    )
  } else {
    return(
      <div className={styles.background}>
        <Container className={styles.homeLayout}>
        <img src="/images/logo.png" style={{height: '20vw'}} alt="logo"/>

        <MainResult business={mainBusiness} />
        <Button variant='info' className={styles.goBackBtn} onClick={handleGoBackBtn}>Decide for me again!</Button>

          {businesses.length > 0 ? <BusinessResults businesses={businesses}/> : ''}
        </Container>
      </div>
    )
  }
}
