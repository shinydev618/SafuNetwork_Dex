import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@spacegrimedex-uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

const Title = styled.div`
  color: rgb(132, 70, 228);
  margin-bottom: 24px;
  font-size: 40px;
  >span {
    color: rgb(168, 122, 233);
  }
`

const ConnectComment = styled.div`
  margin-bottom: 36px;
  color: rgb(168, 122, 233);
  >span {
    color: rgb(132, 70, 228);
  }
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <>
    <ConnectComment>
      Connect your wallet by clicking the<span> CONNECT </span>button.
    </ConnectComment>
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
