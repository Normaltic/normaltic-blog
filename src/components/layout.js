import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components';
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const LayoutWrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 960px;

  main {
    padding: 5rem 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    @media screen and (max-width: 960px) {
      padding: 2rem 0;
    }
  }
  
  footer {
    padding: 2rem 0;
  }
`

const Layout = ({children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <LayoutWrapper>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer>
        © 2020, Normaltic
      </footer>
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
