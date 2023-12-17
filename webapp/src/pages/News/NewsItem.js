import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Comment from '../../components/Comment';
import { getComments } from '../../helpers/comment';

const NewsItem = () => {
  const { state } = useLocation();
  const { item } = state;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAndSetComments();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const getAndSetComments = async () => {
    console.log('RIRAAAAAAAA');
    const res = await getComments(item.url);
    setComments(res);
  }

  useEffect(() => {
    if (item.content !== null || item.content !== undefined) {
    }
  }, [state]);


  return (
    <div className="news-post-container">
      <h1 className="news-post-title">
        {item.title} <span className="news-published-at">{item.publishedAt}</span>
      </h1>
      <img className="news-post-image" src={item.urlToImage} />

      <p className="news-post-desc">
        {item.description}
      </p>
      <p className="news-post-content">
        {item.content}
      </p>


      <Comment 
        url={item.url}
        commentAdded={getAndSetComments}
      />

  {
      !!Object.keys(comments).length
      && comments
      .map((comment) => (
      <div className="comments-wrapper">
        <div className="comment-box-container">

          <div className="news-comment-personal-info">
            <label className="comment-label"></label>
            <p className="comment-text">@{comment.username}</p>

            <label className="comment-label"></label>
            <p className="comment-text">{comment.date} - {comment.time}</p>
          </div>

          <div className="feedback-box">
          <label className="comment-label"><b>Feedback:</b></label>

            <p className="comment-text">{comment.message}</p>
          </div>
        </div>
      </div>
        
      ))
  }

    </div>
  );
}

export default NewsItem;
