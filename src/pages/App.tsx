import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Modal } from '@material-ui/core'
import { RiExchangeDollarFill, RiLoginBoxLine } from 'react-icons/ri'
import { FaStaylinked, FaListUl } from 'react-icons/fa'
import { MdSaveAlt, MdInput, MdOutlineMicrowave, MdAccountBalanceWallet, MdShop } from 'react-icons/md'
import { GiFarmTractor } from 'react-icons/gi'
import { SiSamsungpay, SiHiveBlockchain, SiVirtualbox } from 'react-icons/si'
import { BsDice6, BsPencilSquare } from 'react-icons/bs'
import styled from 'styled-components'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import langSrc from '../constants/localisation/translate/index'

// import Landing from './Landing'

// import Menu from '../components/Menu'
import Mark_Logo from '../img/safu_logo_text.png'
// import Icon_Menu from '../img/menu_icon.png'

export const CustomBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: white;
  opacity: 0.6;
`

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  /* padding-top: 10%; */
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    /* min-height: 100vh; */
  }
`

// const Marginer = styled.div`
//   margin-top: 5rem;
// `

const StyledComponent = styled.div`
  display: flex;
  position: relative;
  width: 430px;
  /* height: 100%; */
  flex-direction: column;
  align-items: center;
  overflow: auto;

  background-color: rgb(37 148 225);
  @media (max-width: 900px) {
    display: none;
  }
`
const MarkImg = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const Collapse = styled.div`
  display: none;
  position: fixed;
  margin-top: 5%;
  margin-left: 7%;
  color: rgb(37 148 225);
  font-weight: 600;
  font-size: 30px;
  @media (max-width: 900px) {
    display: flex;
  }
  &:hover {
    transition: 0.3s;
    cursor: pointer;
    font-size: 35px;
  }
  &:out-of-range {
    transition: 0.3s;
    cursor: pointer;
    font-size: 30px;
  }
`

const LinkList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: white;
  margin-top: 30px;
`
const EachLink = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  align-items: center;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    color: rgb(249, 205, 128);
    font-size: 1.3rem;
  }
`
const EachLinkTxt = styled.div`
  display: flex;
  margin-left: 15px;
`

const ModalComponent = styled.div`
  display: none;
  transition: 1s;
  position: fixed;
  width: 280px;
  overflow: auto;

  outline: none;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: rgb(37 148 225);
  @media (max-width: 900px) {
    display: flex;
  }
`

// const ContactList = styled(Box)`
//   display: flex;
//   position: fixed;
//   bottom: 15px;
//   min-width: 340px;
//   left: 0px;
//   justify-content: center;
//   align-items: center;
// `

// const ContactBox = styled(Box)`
//   display: flex;
//   color: white;
//   font-size: 1.5rem;
//   &:hover {
//     cursor: pointer;
//     color: rgb(249, 205, 128);
//     font-size: 1.7rem;
//   }
// `

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem('pancakeSwapLanguage')
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const getLang = () => {
    return langSrc[selectedLanguage.code] ? langSrc[selectedLanguage.code].src : []
  }

  const fetchTranslationsForSelectedLanguage = async () => {
    setTranslations(getLang())
    setTranslatedLanguage(selectedLanguage)
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Popups />
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100vh',
                }}
              >
                <StyledComponent>
                  <MarkImg>
                    <img src={Mark_Logo} width="280px" alt="" />
                  </MarkImg>
                  {/* <MarkLetter>Olympus</MarkLetter> */}
                  <LinkList>
                    <EachLink>
                      <RiExchangeDollarFill />
                      <EachLinkTxt>SWAP</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdSaveAlt />
                      <EachLinkTxt>STAKING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdInput />
                      <EachLinkTxt>POOL</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <GiFarmTractor />
                      <EachLinkTxt>FARMING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdOutlineMicrowave />
                      <EachLinkTxt>LENDING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdAccountBalanceWallet />
                      <EachLinkTxt>SAFU WALLET</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiSamsungpay />
                      <EachLinkTxt>SAFU PAY</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <BsDice6 />
                      <EachLinkTxt>DICE GAME</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdShop />
                      <EachLinkTxt>NFT MARKETPLACE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiHiveBlockchain />
                      <EachLinkTxt>ITSO</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <FaStaylinked />
                      <EachLinkTxt>GOVERNANCE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiVirtualbox />
                      <EachLinkTxt>METAVERSE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <RiLoginBoxLine />
                      <EachLinkTxt>LOGIN</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <BsPencilSquare />
                      <EachLinkTxt>REGISTER</EachLinkTxt>
                    </EachLink>
                  </LinkList>
                  {/* <ContactList>
                    <Box display="flex" width="100%" justifyContent="space-between">
                      <ContactBox>
                        <FaGithub />
                      </ContactBox>
                      <ContactBox>
                        <FaMedium />
                      </ContactBox>
                      <ContactBox>
                        <FaTwitter />
                      </ContactBox>
                      <ContactBox>
                        <FaDiscord />
                      </ContactBox>
                    </Box>
                  </ContactList> */}
                </StyledComponent>
                <Collapse
                  onClick={() => {
                    handleOpen()
                  }}
                >
                  <FaListUl />
                </Collapse>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/">
                        <Redirect to="/swap" />
                      </Route>
                      {/* <BodyWrapper>
                    <Route exact strict path="/swap" component={Swap} />
                    <Route exact strict path="/pool" component={Pool} />
                    <Route exact path="/add" component={AddLiquidity} />
                    <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                    <Route component={RedirectPathToSwapOnly} />
                  </BodyWrapper> */}
                      <BodyWrapper>
                        <Route exact strict path="/swap" component={Swap} />
                        <Route exact strict path="/find" component={PoolFinder} />
                        <Route exact strict path="/pool" component={Pool} />
                        <Route exact path="/add" component={AddLiquidity} />
                        <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                        <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                        <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                        <Route
                          exact
                          strict
                          path="/remove/:tokens"
                          component={RedirectOldRemoveLiquidityPathStructure}
                        />
                        <Route component={RedirectPathToSwapOnly} />
                      </BodyWrapper>
                      {/* <Menu>

                  </Menu> */}

                      {/* <BodyWrapper>
                        <Route exact strict path="/swap" component={Swap} />
                        <Route exact strict path="/find" component={PoolFinder} />
                        <Route exact strict path="/pool" component={Pool} />
                        <Route exact path="/add" component={AddLiquidity} />
                        <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                        <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                        <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                        <Route
                          exact
                          strict
                          path="/remove/:tokens"
                          component={RedirectOldRemoveLiquidityPathStructure}
                        />
                        <Route component={RedirectPathToSwapOnly} />
                      </BodyWrapper> */}
                    </Switch>
                  </Web3ReactManager>
                </div>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropComponent={CustomBackdrop}
              >
                <ModalComponent>
                  <MarkImg>
                    <img src={Mark_Logo} width="230px" alt="" />
                  </MarkImg>
                  <LinkList>
                    <EachLink>
                      <RiExchangeDollarFill />
                      <EachLinkTxt>SWAP</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdSaveAlt />
                      <EachLinkTxt>STAKING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdInput />
                      <EachLinkTxt>POOL</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <GiFarmTractor />
                      <EachLinkTxt>FARMING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdOutlineMicrowave />
                      <EachLinkTxt>LENDING</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdAccountBalanceWallet />
                      <EachLinkTxt>SAFU WALLET</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiSamsungpay />
                      <EachLinkTxt>SAFU PAY</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <BsDice6 />
                      <EachLinkTxt>DICE GAME</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <MdShop />
                      <EachLinkTxt>NFT MARKETPLACE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiHiveBlockchain />
                      <EachLinkTxt>ITSO</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <FaStaylinked />
                      <EachLinkTxt>GOVERNANCE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <SiVirtualbox />
                      <EachLinkTxt>METAVERSE</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <RiLoginBoxLine />
                      <EachLinkTxt>LOGIN</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                      <BsPencilSquare />
                      <EachLinkTxt>REGISTER</EachLinkTxt>
                    </EachLink>
                  </LinkList>
                </ModalComponent>
              </Modal>
              {/* <Marginer /> */}
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
