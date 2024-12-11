import React from 'react'
import Carouselbanner from '../components/Home/CarouselBanner'
import CarouselBelt from '../components/Home/CarouselBelt'

const Home = () => {
  return (
    <div className='max-w-screen-2xl'>
        <Carouselbanner />
        <CarouselBelt />
    </div>
  )
}

export default Home