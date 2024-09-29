import React from 'react'
import HeroImage from '../Components/HeroImage/HeroImage'
import PopularItem from '../Components/PopularItem/PopularItem'
import NewCollection from '../Components/NewCollection/NewCollection'
import Offers from '../Components/Offers/Offers'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <>
        <HeroImage/>
        <PopularItem/>
        <Offers/>
        <NewCollection/>
        <NewsLetter/>
    </>
  )
}

export default Shop