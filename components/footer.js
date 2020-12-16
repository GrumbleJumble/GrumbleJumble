import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <h4>
        GrumbleJumble By{' '}
        <a
          href='https://ivanwhuang.me/'
          target='_blank'
          className={styles.footerLink}
        >
          Ivan Huang
        </a>{' '}
        and{' '}
        <a
          href='https://github.com/pundoraa'
          target='_blank'
          className={styles.footerLink}
        >
          Roy Jou 
        </a>
      </h4>
      <div>
        View on{' '}
        <a
          href='https://github.com/younghuangbao/SpotTheTrack'
          target='_black'
          className={styles.footerLink}
        >
          Github <i className='fa fa-github'></i>
        </a>
      </div>
    </div>
  );
}
