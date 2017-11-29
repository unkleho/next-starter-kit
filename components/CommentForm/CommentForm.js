import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import styles from './CommentForm.css';

class CommentForm extends Component {

  static propTypes = {
    postId: PropTypes.number,
  }

  constructor() {
    super();

    this.state = {
      isFormSubmitted: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, content } = e.target.elements;
    const parentId = 0;

    this.props.submitComment({
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
    .catch((error) => {
      console.log(error);
    });

    // reset form
    // e.target.elements.content.value = '';
  }

  render() {
    return (
      <div className="comment-form">

        {!this.state.isFormSubmitted ? (
          <div>
            <p className="comment-form__intro">Your email address will not be published. Required fields are marked <span>*</span>.</p>

            <form onSubmit={this.handleSubmit}>
              <div className="comment-form__section">
                <label for="name">Name<span>*</span></label>
                <input
                  name="name"
                  type="text"
                  aria-required="true"
                  placeholder="Your name"
                />
              </div>

              <div className="comment-form__section">
                <label for="email">Email<span>*</span></label>
                <input
                  name="email"
                  type="email"
                  aria-required="true"
                  placeholder="Your email"
                />
              </div>

              <div className="comment-form__section">
                <label for="content">Comment<span>*</span></label>
                <textarea
                  placeholder="Write a comment"
                  name="content"
                  aria-required="true"
                  rows="4"
                ></textarea>
              </div>

              <button className="button" type="submit" aria-label="Comment Submit Button.">Submit</button>
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
    $authorEmail: String,
    $authorName: String!,
    $content: String!,
    $postId: Int!,
    $parentId: Int
  ) {
    createComment(
      authorEmail: $authorEmail,
      authorName: $authorName,
      content: $content,
      postId: $postId,
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
    submitComment: (args) => mutate({
      variables: args,
    }),
  }),
})(CommentForm);
