var path = require('path');
exports.createPages = async function({ actions, graphql }) {
  const { createPage } = actions;
  const { data, error } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html,
            frontmatter {
              title,
              date(formatString: "YYYY.MM.DD"),
              url,
            }
          }
        }
      }
    }
  `);
  if ( error ) throw error;

  data.allMarkdownRemark.edges.forEach( ({node}) => {
    const { html, frontmatter: { title, date, url } } = node;
    const page = {
      path: url || `/${title.replace(/\s/gi, '-')}`,
      context: {
        html,
        title,
        date,
      },
      component: path.resolve(__dirname, './src/components/post.js'),
    };
    createPage(page);
  })
}