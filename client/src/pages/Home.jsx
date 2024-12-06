import React from 'react'
import Carouselbanner from '../components/CarouselBanner'
import CarouselBelt from '../components/CarouselBelt'

const Home = () => {
  return (
    <div className='max-w-screen-2xl'>
        <Carouselbanner />
        <CarouselBelt />
    </div>
  )
}

export default Home