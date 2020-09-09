import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled(Link)`
  display: block;
  padding: 2rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 2px 0 rgba(46,62,72,.12), 0 2px 4px 0 rgba(46,62,72,.12);
  margin-bottom: 2rem;
`;

const Date = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

const Excerpt = styled.p`
  margin-bottom: 0;
`;

const PostCard = ({title, date, url, excerpt}) => (
  <Wrapper to={url}>
    <h2>{title}</h2>
    <Date>{date}</Date>
    <Excerpt>{excerpt}</Excerpt>
  </Wrapper>
);

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default PostCard;
