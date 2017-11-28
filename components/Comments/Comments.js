import { Component } from 'react';
import PropTypes from 'prop-types';

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

export default Comments;
