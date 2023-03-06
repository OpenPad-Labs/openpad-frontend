import './App.css'
import { Route, Routes } from 'react-router-dom'
import routes from './pages/index'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect, useInactiveListener } from './web3/useMetaConnect'
import {useWallet, WalletProvider,useAccountBalance,SuietWallet,MartianWallet} from '@suiet/wallet-kit'
import React, {useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@suiet/wallet-kit/style.css'
import 'react-image-crop/dist/ReactCrop.css'

import Header from './components/header/Header/Header'
import Footer from './components/footer/Footer'

function App() {

  return (
    <WalletProvider defaultWallets={[SuietWallet]}>
      <Header />
      <Routes>
        {routes.map((data, index) => (
          <Route
            onUpdate={() => window.scrollTo(0, 0)}
            exact={true}
            path={data.path}
            element={data.component}
            key={index}
          />
        ))}
      </Routes>
      <Footer />
      <ToastContainer autoClose={2000} />
    </WalletProvider>
  )
}

export default App
