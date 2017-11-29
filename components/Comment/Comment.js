import { Component } from 'react';
import PropTypes from 'prop-types';

// import Comment from './Comment';
import styles from './Comment.css';
import { formatDate } from '../../lib';

class Comment extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
    date: PropTypes.string,
    content: PropTypes.string.isRequired,
    childComments: PropTypes.array,
  }

  render() {
    const {
      // id,
      authorName,
      date,
      content,
      childComments,
    } = this.props;

    return (
      <article className="comment">

        <header>
          <div className="comment__author">{authorName}</div>
          <div className="comment__date">{formatDate(date)}</div>
        </header>

        <div className="comment__content">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>

          {/* <button>Reply</button> */}

          {childComments && childComments.map((childComment) => {
            return (
              <Comment
                key={`comment-${childComment.id}`}
                id={childComment.id}
                authorName={childComment.authorName}
                date={childComment.date}
                content={childComment.content}
              />
            );
          })}
        </div>

        <style jsx>{styles}</style>

      </article>
    );
  }

}

export default Comment;
