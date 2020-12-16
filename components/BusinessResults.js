
import styles from '../styles/components/Results.module.css';
import {Card} from 'react-bootstrap'

export default function BusinessResults({businesses}){
  return(
    <div className={styles.businessCardsLayout}>
      {businesses.map((business) => (
        <Card key={business.name} className={styles.businessCard}>
          <a href={business.addressLink} target='_blank'>
            <img
              className={styles.businessCardImage}
              src={business.image_url}
              alt='song-img'
            />
            <Card.Body className={styles.businessCardBody}>
              <h6 className='business-name'>{business.name}</h6>
              <p>
                <b>Category</b>: {business.category}
              </p>
              <p>
                <b>Rating:</b> {business.rating}
              </p>
              <p>
              <b>Distance:</b> {business.distance}
              </p>
            </Card.Body> 
          </a>
        </Card>
      ))}
    </div>
  )
}