import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from './layout';
import SEO from './seo';

const COLOR = {
  PRIMARY: '#009fe7',
  LIGHTGRAY: '#f5f5f5',
  DARKGRAY: '#5c5c5c',
};

const Head = styled.div`
  margin-bottom: 4rem;
  h1 {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  padding-right: 10%;
  @media screen and ( max-width: 960px ) {
    padding-right: initial;
  }

  // ###
  h3 {
    margin-top: 4rem;
  }

  // ~~
  del {
    font-size: 0.9rem;
    font-style: italic;
    color: ${COLOR.DARKGRAY};
  }

  // (link)[url]
  a {
    color: ${COLOR.PRIMARY};
  }

  // >
  blockquote {
    margin: 2rem 0;
    padding: 1.5rem;
    border-left: 0.2rem solid ${COLOR.PRIMARY};
    background-color: ${COLOR.LIGHTGRAY};
  }

  // image
  figure[class='gatsby-resp-image-figure'] {
    margin-bottom: 2.45rem;
    figcaption {
      margin-top: 0.5rem;
      text-align: center;
      color: ${COLOR.DARKGRAY};
      font-style: italic;
    }
  }

  // code
  pre {
    margin-bottom: 2.45rem;
  }
`;

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
