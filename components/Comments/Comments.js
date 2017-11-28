import { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import { formatDate } from '../../lib';
import styles from './Comments.css';

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array,
  };

  render() {
    const {
      comments,
    } = this.props;

    return (
      <div className="comments">
        {comments.map((comment) => {
          return (
            <article key={`comment-${comment.id}`}>
              <header>
                <div className="comments__author">{comment.authorName}</div>
              </header>

              <div className="comments__content">
                <div className="comments__date">{formatDate(comment.date)}</div>
                <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
              </div>
            </article>
          );
        })}

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
    submitComment: (
      authorEmail,
      authorName,
      content,
      postId,
      parentId
    ) => mutate({
      variables: {
        authorEmail,
        authorName,
        content,
        postId,
        parentId
      },
      // updateQueries: {
      //   comments: ()
      // },
    })
  })
})(Comments);
