import {Row, Col, Button} from 'react-bootstrap'
import styles from '../styles/components/MainResult.module.css'

export default function MainResult({business}){
  return (
    <div className={styles.mainResultCard}>
      <Row>
        <Col className={styles.cardImg}>
            <img src={business.image_url} alt="chosen business"/>
        </Col>
        <Col style={{display: 'flex', alignItems: 'center'}}>
        <div>
          <h3 className='business-name'>{business.name}</h3>
          <p>
            Category: {business.category}
          </p>
          <p>
            Rating: {business.rating}
          </p>
          <p>
            Address: {business.address}
          </p>
          <Button>
            <a href={business.addressLink} target='_blank' style={{color: 'white'}}>Find Directions</a>
          </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}