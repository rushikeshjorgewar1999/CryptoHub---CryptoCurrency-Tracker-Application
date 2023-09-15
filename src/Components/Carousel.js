import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { TrendingCoins } from '../config/api';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  Carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  // Define your other styles here
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency } = CryptoState();

  // Define fetchTrendingCoins as a useCallback
  const fetchTrendingCoins = useCallback(async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  }, [currency]); // Make sure to include currency in the dependencies array

  useEffect(() => {
    // Call fetchTrendingCoins within the useEffect
    fetchTrendingCoins();
  }, [fetchTrendingCoins]); // Include fetchTrendingCoins in the dependencies array

  // Rest of your component code

  // Define responsive settings for the carousel
  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
  };

  const items = trending.map((coin) => (
    <Link
      className={classes.carouselItem}
      to={`/coins/${coin.id}`}
      key={coin.id} // Add a unique key for each item
    >
      {/* Your item JSX */}
    </Link>
  ));

  // Rest of your component code

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={150}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
