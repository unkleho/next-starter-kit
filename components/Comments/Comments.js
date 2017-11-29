import { Component } from 'react';
import PropTypes from 'prop-types';
// import { gql, graphql } from 'react-apollo';

import SectionTitle from '../SectionTitle';
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import styles from './Comments.css';

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.number.isRequired,
  };

  // constructor() {
  //   super();
  //
  //   this.state = {
  //     isFormSubmitted: false,
  //   };
  // }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //
  //   const authorEmail = 'kaho.cheung@sl.nsw.gov.au';
  //   const authorName = 'Kaho';
  //   const content = e.target.elements.content.value;
  //   const postId = this.props.postId;
  //   const parentId = 0;
  //
  //   this.props.submitComment({
  //     authorEmail,
  //     authorName,
  //     content,
  //     postId,
  //     parentId,
  //   })
  //   .then(() => {
  //     this.setState({
  //       isFormSubmitted: true,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  //
  //   // reset form
  //   // e.target.elements.content.value = '';
  // }

  render() {
    const {
      comments,
      postId,
    } = this.props;

    return (
      <div className="comments">
        <SectionTitle>Comments</SectionTitle>

        <div className="comments__list">
          {comments
            .filter((comment) => {
              return comment.parentId === 0;
            })
            .map((comment) => {

              // Work out child comments by looking up all comments
              // TODO: Find more efficient way
              const childComments = comments.filter(c => {
                return comment.id === c.parentId;
              });

              return (
                <Comment
                  key={`comment-${comment.id}`}
                  id={comment.id}
                  authorName={comment.authorName}
                  date={comment.date}
                  content={comment.content}
                  childComments={childComments}
                />
              );
            })
          }
        </div>

        <div className="comments__form">
          <SectionTitle>We love feedback</SectionTitle>

          <CommentForm postId={postId} />
          {/* {!this.state.isFormSubmitted ? (
            <div>
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

                <button className="button" type="submit" aria-label="Comment Submit Button.">Submit</button>
              </form>
            </div>
          ) : (
            <div>
              <p>Thanks for your feedback, your comment is awaiting approval.</p>
            </div>
          )} */}

        </div>

        <style jsx>{styles}</style>
    </div>
    );
  }

}

export default Comments;

// const query = gql`
//   mutation createComment(
//     $authorEmail: String,
//     $authorName: String!,
//     $content: String!,
//     $postId: Int!,
//     $parentId: Int
//   ) {
//     createComment(
//       authorEmail: $authorEmail,
//       authorName: $authorName,
//       content: $content,
//       postId: $postId,
//       parentId: $parentId
//     ) {
//       id
//       content
//       authorName
//       parentId
//     }
//   }
// `;
//
// export default graphql(query, {
//   props: ({ mutate }) => ({
//     submitComment: (args) => mutate({
//       variables: args,
//     }),
//   }),
// })(Comments);
