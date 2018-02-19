import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import ShareBox from '../components/ShareBox';
import Button from '../components/Button';
import Comments from '../components/Comments';
import { formatDate } from '../lib';
import Four04 from './_error';
import styles from './post.css';
import galleryStyles from '../styles/gallery.css';

class Post extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    excerpt: PropTypes.string,
    featuredMedia: PropTypes.object,
    author: PropTypes.object,
    url: PropTypes.object,
    date: PropTypes.string,
    loading: PropTypes.bool,
    comments: PropTypes.array,
  };

  componentDidMount() {
    this.addModals();
  }

  componentWillUnmount() {
    this.removeModal();
  }

  addModals = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'postModal';
    div.className = 'post__modal';
    div.innerHTML =
      '<span class="post__modal_close"><a>&times;</a></span><img id="postModalImg" src=""/>';

    const modal = document.getElementById('postModal');
    const modalImg = document.getElementById('postModalImg');
    const span = document.getElementsByClassName('post__modal_close')[0];

    span.onclick = function closeModal() {
      modal.style.display = 'none';
    };

    const imgDivs = document.getElementsByClassName('gallery-icon');
    for (let i = 0, len = imgDivs.length; i < len; i++) {
      const bigImgUrl = imgDivs[i].childNodes[1].href;
      const a = imgDivs[i].childNodes[1];
      // eslint-disable-next-line
      a.href = 'javascript:void(0)';
      a.setAttribute('aria-label', 'click to expand image');
      a.onclick = function openModal() {
        modalImg.src = bigImgUrl;
        modalImg.onclick = function closeModal() {
          modal.style.display = 'none';
        };
        modal.style.display = 'block';
      };
    }
  };

  removeModal = () => {
    const modalToKill = document.getElementById('postModal');
    if (modalToKill) {
      modalToKill.parentNode.removeChild(modalToKill);
    }
  };

  render() {
    const {
      id,
      title,
      content,
      excerpt,
      featuredMedia,
      author,
      url,
      date,
      loading,
      comments,
      experiments,
      posts,
    } = this.props;

    const featuredImageUrl = featuredMedia && featuredMedia.sourceUrl;
    const featuredImageDescription = featuredMedia && featuredMedia.description;
    const authorName = author && author.name;
    const experimentUrl = experiments && experiments[0] && experiments[0].url;
    const githubUrl = experiments && experiments[0] && experiments[0].githubUrl;
    const dateString = formatDate(date);

    if (posts && posts.length === 0) {
      return <Four04 />;
    }

    return (
      <App
        isLoading={loading}
        pathname={url.pathname}
        title={title}
        metaDescription={excerpt}
        metaImageUrl={featuredImageUrl}
        metaImageAlt={featuredImageDescription}
      >
        <article className="post container container--md">
          <div>
            <div className="post__featured-image-holder">
              <img
                className="post__featured-image"
                src={featuredImageUrl}
                alt={featuredImageDescription}
              />
              <div className="post__date">{dateString}</div>
            </div>

            <header className="post__header">
              <h1 className="post__title">{title}</h1>
              <div className="post__author">
                By <a href={`/search?q=${authorName}`}>{authorName}</a>
              </div>

              <div className="post__cta">
                {experimentUrl && (
                  <Button href={experimentUrl} target="_blank">
                    LAUNCH EXPERIMENT
                  </Button>
                )}
                {githubUrl && (
                  <Button href={githubUrl} target="_blank">
                    CODE
                  </Button>
                )}
              </div>
            </header>

            <div
              className="post__content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <ShareBox
              title={title}
              text={excerpt}
              pathname={`/blog/${url.query.slug}`}
            />

            <br />
            <br />
            <br />

            <Comments postId={id} comments={comments} />
          </div>
        </article>
        {/* prettier-ignore */}
        <style jsx global>{styles}</style>
        {/* prettier-ignore */}
        <style jsx global>{galleryStyles}</style>
      </App>
    );
  }
}

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      id
      title
      content
      excerpt
      featuredMedia {
        sourceUrl
        description
      }
      author {
        name
      }
      date
      comments {
        id
        content
        authorName
        date
        parentId
      }
      experiments {
        url
        githubUrl
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(
  graphql(postQuery, {
    options: ({ url: { query: { slug } } }) => {
      return {
        variables: {
          slug,
        },
      };
    },
    props: ({ data }) => {
      const post = data.posts && data.posts[0];

      return {
        ...data,
        ...post,
      };
    },
  })(Post),
);
