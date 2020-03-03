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
            }
          }
        }
      }
    }
  `);
  if ( error ) throw error;

  data.allMarkdownRemark.edges.forEach( ({node}) => {
    const page = {
      path: `/${node.frontmatter.title.replace(/\s/gi, '-')}`,
      context: {
        html: node.html,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      },
      component: path.resolve(__dirname, './src/components/post.js'),
    };
    console.log(page);
    createPage(page);
  })
}