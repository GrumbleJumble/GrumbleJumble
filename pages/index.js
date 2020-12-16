import React, { useState, useEffect } from 'react';

import axios from 'axios';
import styles from '../styles/Home.module.css';

import {Container, Row, Col, Button} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

export default function Home() {
  const [distance, setDistance] = useState(5)

  const handleChangeDistance = (event) => {
    setDistance(event.target.value)
  }
  return (
    <div>
      <div className={styles.background}>
        <Container className={styles.landingLayout}>          
            <div className={styles.landingText}>
              <h1 style={{fontSize: '10vw'}}>GrumbleJumble</h1>
              <p style={{fontSize: '5vw'}}>Can't decide what to eat?</p>
            </div>

            <div className={styles.distanceSection}>
              <p style={{fontSize: '3vw'}}>How far are you willing to travel?</p>

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
            <Button variant='info' className={styles.decideBtn}>Decide for me!</Button>
        </Container>
      </div>
    </div>
  )
}
