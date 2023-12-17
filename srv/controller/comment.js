const Comment = require('../model/comment');

exports.getComments = async (req, res, next) => {
  // const { postUrl } = req.params;
  const { postUrl } = req.body;
  try { 
    const comments = await Comment.fetch(postUrl);
    return res
      .status(200)
      .json({
        comments,
        isSuccessful: true
      });
  } catch(err) {
    console.log(err);
    return res
      .status(200)
      .json({
        isSuccessful: false,
        message: 'an error occured'
      });
  }
};

exports.addComment = async (req, res, next) => {
  const { postUrl, message } = req.body;
  const { username } = req;

  const comment = new Comment(username, postUrl);
  try {
    await comment.add(message);
    return res
      .status(200)
      .json({
        isSuccessful: true
      });
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        isSuccessful: false,
        message: 'an error occured'
      });
  }
};

exports.deleteComment = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Comment.delete(id);
    return res
      .status(200)
      .json({
        isSuccessful: true
      });
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        isSuccessful: false,
        message: 'an error occured'
      })
  }
};

