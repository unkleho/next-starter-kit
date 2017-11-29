import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import SectionTitle from '../SectionTitle';
import { formatDate } from '../../lib';
import styles from './Comments.css';

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.number.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const authorEmail = 'kaho.cheung@sl.nsw.gov.au';
    const authorName = 'Kaho';
    const content = e.target.elements.content.value;
    const postId = this.props.postId;
    const parentId = 0;

    this.props.submitComment({
      authorEmail,
      authorName,
      content,
      postId,
      parentId,
    });

    // reset form
    e.target.elements.content.value = '';
  }

  render() {
    const {
      comments,
    } = this.props;

    return (
      <div className="comments">
        <SectionTitle>Comments</SectionTitle>

        <div className="comments__list">
          {comments.map((comment) => {
            return (
              <article key={`comment-${comment.id}`}>
                <header>
                  <div className="comments__author">{comment.authorName}</div>
                  <div className="comments__date">{formatDate(comment.date)}</div>
                </header>

                <div className="comments__content">
                  <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="comments__form">
          <SectionTitle>We love feedback</SectionTitle>
          <p className="comments__form__intro">Your email address will not be published. Required fields are marked <span>*</span>.</p>

          <form onSubmit={this.handleSubmit}>
            <div className="comments__form__section">
              <label for="name">Name<span>*</span></label>
              <input
                name="name"
                type="text"
                aria-required="true"
                placeholder="Your name"
              />
            </div>

            <div className="comments__form__section">
              <label for="email">Email<span>*</span></label>
              <input
                name="email"
                type="email"
                aria-required="true"
                placeholder="Your email"
              />
            </div>

            <div className="comments__form__section">
              <label for="content">Comment<span>*</span></label>
              <textarea
                placeholder="Write a comment"
                name="content"
                aria-required="true"
                rows="4"
              ></textarea>
            </div>

            <button className="button" type="submit">Submit</button>
          </form>
        </div>

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
})(Comments);
