import React from 'react'
import { Container, Wrapper } from './Styled'

interface LayoutProps {
  padded?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, padded }) => {
  if (padded) {
    return (
      <Wrapper>
        <Container>
          <div className="p-4 w-full">{children}</div>
        </Container>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Layout
