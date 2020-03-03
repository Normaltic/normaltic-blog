import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components';

import { Link } from "gatsby"

const HeaderWrapper = styled.header`
  padding: 0.5rem 0;
}`

const Title = styled.h1`
  margin-top: 1.45rem;
`

const Navi = styled.div`
  a {
    margin-right: 1rem;
    color: gray;
    transition: color 0.15s ease-out;
    &:hover {
      color: inherit;
    }
  }
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <Title>
      <Link to="/">{siteTitle}</Link>
    </Title>
    <Navi>
      <Link to='/'>Home</Link>
      {/* <Link to='/about'>About</Link> */}
    </Navi>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
