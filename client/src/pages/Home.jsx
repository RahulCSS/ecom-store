import React from 'react'
import Carouselbanner from '../components/Home/CarouselBanner'
import CarouselBelt from '../components/Home/CarouselBelt'
import OfferZone from '../components/Home/OfferZone'
import Products from '../components/Home/Products'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div className='max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center'>
        <Carouselbanner />
        <CarouselBelt />
        <OfferZone />
        <Products />
        <Footer />
    </div>
  )
}

export default Home