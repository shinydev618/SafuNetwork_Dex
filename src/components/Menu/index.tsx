import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@spacegrimedex-uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'

import LogoTextLight from 'img/uikit/LogoTextLight.png'
import LogoTextDark from 'img/uikit/LogoTextDark.png'
import SidebarBack from 'img/uikit/SidebarBack.png'
import AstroLight from 'img/uikit/Astronaut-Light.png'
import AstroDark from 'img/uikit/Astronaut-Dark.png'
import LightCreate from 'img/uikit/LightCreate.png'
import DarkCreate from 'img/uikit/DarkCreate.png'
import GearIcon from 'img/uikit/GearIcon.png'

import Icon1 from 'img/uikit/social/Telegram.png'
import Icon2 from 'img/uikit/social/Twitter.png'
import Icon3 from 'img/uikit/social/Email.png'

import links from './config'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  const cakePriceUsd = priceData ? Number(priceData.prices.Cake) : undefined

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={(connectorId: string) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      imgProvider={[
        LogoTextLight, LogoTextDark,
        SidebarBack,
        AstroLight,
        AstroDark,
        LightCreate,
        DarkCreate,
        GearIcon,
        Icon1,
        Icon2,
        Icon3
      ]}
      {...props}
    />
  )
}

export default Menu
