// import '../styles/globals.css'
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import Footer from '../components/footer.js';


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer/>
    </div>
  )
}

export default MyApp
