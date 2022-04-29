import React from 'react'
import styled from 'styled-components'
import { Card } from '@spacegrimedex-uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 436px;
  width: 100%;
  /* height: 100%; */
  z-index: 5;
  box-shadow: 1px 1px 20px 10px rgb(168, 122, 233);
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
