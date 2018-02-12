import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import styles from './CommentForm.css';

class CommentForm extends Component {
  static propTypes = {
    postId: PropTypes.number,
  };

  constructor() {
    super();

    this.state = {
      isFormSubmitted: false,
      showWarning: false,
      showSubmitError: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, content } = e.target.elements;

    // Check all fields are not empty
    if (email.value && name.value && content.value) {
      const parentId = 0;

      this.props
        .submitComment({
          authorEmail: email.value,
          authorName: name.value,
          content: content.value,
          postId: this.props.postId,
          parentId,
        })
        .then(() => {
          this.setState({
            isFormSubmitted: true,
          });
        })
        .catch(() => {
          this.setState({
            showSubmitError: true,
          });
        });
    } else {
      this.setState({
        showWarning: true,
      });
    }

    // reset form
    // e.target.elements.content.value = '';
  };

  render() {
    return (
      <div className="comment-form">
        {!this.state.isFormSubmitted ? (
          <div>
            <p className="comment-form__intro">
              Your email address will not be published. Required fields are
              marked <span>*</span>.
            </p>

            <form onSubmit={this.handleSubmit}>
              <div className="comment-form__section">
                <label htmlFor="name">
                  Name<span>*</span>
                </label>
                <input
                  name="name"
                  aria-label="name"
                  type="text"
                  aria-required="true"
                  placeholder="Your name"
                />
              </div>

              <div className="comment-form__section">
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <input
                  name="email"
                  aria-label="email"
                  type="email"
                  aria-required="true"
                  placeholder="Your email"
                />
              </div>

              <div className="comment-form__section">
                <label htmlFor="content">
                  Comment<span>*</span>
                </label>
                <textarea
                  placeholder="Write a comment"
                  name="content"
                  aria-label="content"
                  aria-required="true"
                  rows="6"
                />
              </div>

              {/* TODO: Try input type submit */}
              <button
                className="button"
                type="submit"
                aria-label="Comment Submit Button."
              >
                Submit
              </button>

              {this.state.showWarning && (
                <div className="warning">Please fill in all fields.</div>
              )}

              {this.state.showSubmitError && (
                <div className="warning">
                  There seems to be a problem, please refresh the page and try
                  again.
                </div>
              )}
            </form>
          </div>
        ) : (
          <div>
            <p>Thanks for your feedback, your comment is awaiting approval.</p>
          </div>
        )}

        <style jsx>{styles}</style>
      </div>
    );
  }
}

const query = gql`
  mutation createComment(
    $authorEmail: String
    $authorName: String!
    $content: String!
    $postId: Int!
    $parentId: Int
  ) {
    createComment(
      authorEmail: $authorEmail
      authorName: $authorName
      content: $content
      postId: $postId
      parentId: $parentId
    ) {
      id
      content
      authorName
      parentId
    }
  }
`;

export default graphql(query, {
  props: ({ mutate }) => ({
    submitComment: (args) =>
      mutate({
        variables: args,
      }),
  }),
})(CommentForm);
