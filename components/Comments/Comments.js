import { Component } from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../SectionTitle';
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import styles from './Comments.css';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.number.isRequired,
  };

  render() {
    const { comments = [], postId } = this.props;

    return (
      <div className="comments">
        {comments.length > 0 && (
          <div>
            <SectionTitle>Comments</SectionTitle>

            <div className="comments__list">
              {comments &&
                comments
                  .filter((comment) => {
                    return comment.parentId === 0;
                  })
                  .map((comment) => {
                    // Work out child comments by looking up all comments
                    // TODO: Find more efficient way
                    const childComments = comments.filter((c) => {
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
                  })}
            </div>
          </div>
        )}

        <div className="comments__form">
          <SectionTitle>We love feedback</SectionTitle>

          <CommentForm postId={postId} />
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Comments;
