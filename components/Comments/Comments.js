import { Component } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../lib';

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array,
  };

  render() {
    const {
      comments,
    } = this.props;

    return (
      <div className="comments">{comments.map((comment) => {
        return (
          <article key={`comment-${comment.id}`}>
            <header>
              <div className="comments__author">{comment.authorName}</div>
              <div className="comments__date">{formatDate(comment.date)}</div>
            </header>
            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
          </article>
        );
      })}</div>
    );
  }

}

export default Comments;
