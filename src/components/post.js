import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from './layout';
import SEO from './seo';

const Head = styled.div`
  margin-bottom: 4rem;
  h1 {
    font-size: 2rem;
  }
`

const Content = styled.div`
  h2 {
    padding-left: 0.5rem;
    border-left: 0.2rem solid black;
  }
`

const Template = ({pageContext}) => {
  const {title, html, date} = pageContext;

  const dateAgo = Math.floor((new Date().getTime() - new Date(date).getTime()) / ( 1000 * 60 * 60 * 24 ) );

  return (
    <>
      <SEO title={title} />
      <Layout>
        <Head>
          <h1>{title}</h1>
          <p>{date}, 약 {dateAgo}일 전</p>
        </Head>
        <Content dangerouslySetInnerHTML={{ __html: html}} />
      </Layout>
    </>
  );
}

Template.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export default Template;
