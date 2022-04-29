import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@spacegrimedex-uikit'
import TranslatedText from '../TranslatedText'
// import Mark_Logo from '../../img/safu_logo_text.png'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

// const Title = styled.div`
//   color: rgb(132, 70, 228);
//   margin-bottom: 24px;
//   font-size: 40px;
//   > span {
//     color: rgb(168, 122, 233);
//   }
// `

// const ConnectComment = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: flex-start;
//   margin-left: 20%;
//   margin-bottom: 30px;
//   align-items: center;
//   color: #f1c55e;
//   > span {
//     margin-left: 10%;
//     font-size: 3rem;
//     font-weight: 600;
//     color: rgb(240, 217, 9);
//     text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
//     -webkit-text-stroke-width: 3px;
//     -webkit-text-stroke-color: black;
//   }
// `

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <>
    {/* <ConnectComment>
      <img src={Mark_Logo} width="300px" alt="" />
      <span>
        {' '}
        SAFUNET{'\u00a0'}
        {'\u00a0'}DEX{' '}
      </span>
    </ConnectComment> */}
    {/* <ConnectComment>
      Connect your wallet by clicking the<span> CONNECT </span>button.
    </ConnectComment> */}
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} variant="primary">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          <TranslatedText translationId={8}>Swap</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          <TranslatedText translationId={262}>Liquidity</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://www.binance.org/en/bridge?utm_source=PancakeSwap"
          target="_blank"
          rel="noreferrer noopener"
          variant="subtle"
        >
          Bridge
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  </>
)

export default Nav
