import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice'
import {leaveComment} from '../helpers/comment';

const Comment = ({ url, commentAdded }) => {
  const [feedBack, setFeedBack] = useState('');
  const userState = useSelector(selectUser);

  const submit = async () => {
    await leaveComment(
      url,
      feedBack,
      userState.user.token
    );

    commentAdded();
  }

  return (
    <>
      {
        userState.user.isLoggedIn
        ? (
          <div className="comment-box">
          <h4>Leave a Comment</h4>
          <br />
          <div className="comment-personal-info">
            <textarea 
              value={feedBack}
              onChange={(e) => setFeedBack(e.target.value)}
            />
          </div>
    
          <div className="comment-personal-info">
            <button
              className="comment-button"
              onClick={submit}>
              Submit
            </button>
          </div>
        </div>  
        )
        : (
          <></>
        )
      }
    </>
  );
}

export default Comment;