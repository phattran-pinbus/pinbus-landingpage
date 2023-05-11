import React from 'react'
import HomePageComponent from '../components/home'
import MainLayout from '../layout/main'

const Home = () => (
  <MainLayout lightHeader={false} title="Pinbus.vn">
    <HomePageComponent />
  </MainLayout>
)

export default Home
