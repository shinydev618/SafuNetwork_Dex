import React from 'react'
import LayoutDefault from 'components/LayoutDefault'
import Header from './components/Header'
import Main from './components/Main'
import Text from './components/Text'
import Footer from './components/Footer'

const Home: React.FC = () => {
  return (
    <LayoutDefault>
      <Header />
      <Main />
      <Text />
      <Footer />
    </LayoutDefault>
  )
}

export default Home
