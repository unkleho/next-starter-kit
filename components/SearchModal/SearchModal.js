import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

// import withData from '../../lib/withData';
import SimpleTile from '../SimpleTile';
import { mapPostToTile, debounce } from '../../lib';
import styles from './SearchModal.css';

class SearchModal extends Component {

  static propTypes = {
    posts: PropTypes.array,
  }

  constructor() {
    super();

    this.fetch = debounce(this.fetch, 300);

    this.state = {
      q: '',
    };
  }

  fetch = (value) => {
    this.props.searchPosts(value);
  }

  handleSearchBox = (event) => {
    const q = event.target.value;
    this.fetch(q);

    this.setState({
      q,
    });
  }

  render() {
    const {
      posts,
    } = this.props;

    const {
      q,
    } = this.state;

    return (
      <div className="search-modal">
        <h1>Search</h1>
        <input
          type="text"
          name="search"
          placeholder="Start typing..."
          onKeyUp={this.handleSearchBox}
        />

        <div>
          {q && posts.map((post, i) => {
            return (
              <SimpleTile
                subtitle={post.date}
                title={post.title}
                url={`/blog/${post.slug}`}
                imageUrl={post.imageUrl}
                imageAltText={post.imageAltText}
                content={post.content}
                key={`tile-${i}`}
              />
            );
          })}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }

}

const query = gql`
  query Post($search: String) {
    posts(search: $search) {
      id
      title
      slug
      excerpt
      date
      featuredMedia {
        altText
        sizes {
          full {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default graphql(query, {
  options: () => {
    return {
      variables: {
        search: null,
      },
    };
  },
  props: ({ data }) => {
    return {
      ...data,
      posts: data && data.posts && data.posts.map((post) => mapPostToTile(post)),
      searchPosts(q) {
        console.log(q);
        return data.fetchMore({
          variables: {
            search: q,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              posts: [...fetchMoreResult.posts],
            };
          },
        });
      },
    };
  },
})(SearchModal);
