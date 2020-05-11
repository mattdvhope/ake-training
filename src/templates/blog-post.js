import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.cosmicjsPosts
    const siteTitle = get(
      this.props,
      'data.cosmicjsSettings.metadata.site_title'
    )
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={location}>
        <style>
          {`
          .post-content {
            text-align: justify;
          }
          .post-hero {
            width: calc(100% + ${rhythm(8)});
            margin-left: ${rhythm(-4)};
            height: ${rhythm(18)};
          }
          @media (max-width: ${rhythm(32)}) {
            .post-hero {
              width: calc(100% + ${rhythm((3 / 4) * 2)});
              margin-left: ${rhythm(-3 / 4)};
              height: ${rhythm(13)};
            }
          }
        `}
        </style>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div
          style={{
            marginTop: rhythm(1.4),
          }}
        >
          <Link to="/">← กลับสู่หน้าแรก</Link>
        </div>
        <h1
          style={{
            marginTop: rhythm(1),
          }}
        >
          {post.title}
        </h1>
    {/* <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(0.6),
            marginTop: rhythm(-0.6),
          }}
        >
          {post.created}
        </p>  JSX Comment */}
    {/* <BackgroundImage
          Tag="div"
          className="post-hero"
          fluid={post.metadata.hero.local.childImageSharp.fluid}
          backgroundColor={`#007ACC`}
          style={{
            marginBottom: rhythm(0.6),
          }}
        />  */}    
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/i103Fph3Lr4?feature=youtu.be&fbclid=IwAR3Dt3Q3_dlyVdlBkXPlJMoMW9APlBi7eVO3XwD9VbMi4m8y4w_ASZE2TMY" frameBorder="0" allowFullScreen></iframe>
        </div>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio settings={author} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={`posts/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={`posts/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata {
        hero {
          local {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
