import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

// import withData from '../../lib/withData';
import SimpleTile from '../SimpleTile';
import Button from '../Button';
import { mapPostToTile, debounce } from '../../lib';
import styles from './SearchModal.css';

class SearchModal extends Component {

  static propTypes = {
    posts: PropTypes.array,
    q: PropTypes.string,
  }

  constructor(props) {
    super(props);

    // this.fetch = debounce(this.fetch, 300);
    this.fetch(props.q);

    this.state = {
      q: props.q ? props.q : '',
    };
  }

  componentDidMount() {
    // console.log(this.props.q);
    this.fetch(this.props.q);
  }

  fetch = (value) => {
    this.props.searchPosts(value);
  }

  handleSearchBox = (event) => {
    const q = event.target.value;
    // this.fetch(q);

    this.setState({
      q,
    });
  }

  handleForm = () => {
    this.fetch(this.state.q);
    window.location.search = `?q=${q}`;
  }

  render() {
    const {
      posts,
      loading,
    } = this.props;

    const q = this.state.q;

    return (
      <div className="search-modal">
        <h1>Search</h1>

        <div>
          <form
            className="search-modal__form"
            action="/search"
            method="get"
            // onSubmit={this.handleForm}
          >
            <input
              className="search-modal__search-box"
              type="text"
              name="q"
              placeholder="Type here"
              value={q}
              onChange={this.handleSearchBox}
              // onKeyUp={this.handleSearchBox}
            />
            <input
              className="button"
              type="submit"
              value="submit"
              aria-label="Search Submit Button."
            />
          </form>
        </div>

        <div className="search-modal__results">

          {loading && (
            <div>Loading</div>
          )}

          {posts && posts.map((post, i) => {
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
        <style global jsx>{styles}</style>
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
  options: (props) => {
    return {
      variables: {
        search: props.q ? props.q : null,
      },
    };
  },
  props: ({ data, ownProps }) => {
    return {
      ...data,
      // posts: [],
      posts: ownProps.q && data && data.posts && data.posts.map((post) => mapPostToTile(post)),
      searchPosts(q) {
        // console.log(q);
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
