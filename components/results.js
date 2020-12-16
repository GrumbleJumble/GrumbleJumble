
import styles from '../styles/components/Results.module.css';

export default function results(businesses){

  return(
    <div className={styles.songCardsLayout}>
      {businesses.map((business) => (
        {/* <Card key={track.name} className={styles.songCard}>
          <a href={track.url} target='_blank'>
            <img
              className='card-img-top'
              src={track.artwork}
              alt='song-img'
            />
            <Card.Body className={styles.songCardBody}>
              <h6 className='card-title'>{track.name}</h6>
              <p>
                {track.artists
                  .map((artist) => artist.name)
                  .join(', ')}
              </p>
            </Card.Body> */}
          {/* </a> */}
        {/* </Card> */}
      ))}
    </div>
  )
}