import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, fetchComment } from "../Redux/Action/CommentsAction";

const Rendercomments = ({ comment,prodId }) => {
  const dispatch = useDispatch()
  const commentDlt=(id)=>{
    dispatch(deleteComment(id))
    dispatch(fetchComment(prodId))
  } 

  useEffect(() => {
    dispatch(fetchComment(prodId))
  }, [])
  return (
    <div>
      <li key={comment.id}>
        <p>
          <span>{comment.user.first_name}</span> <button className="deleteComment" onClick={()=>commentDlt(comment.id)}>Delete</button> <br></br>
          <span className="coomentDate">
        {comment.date}
        </span>
        </p>
       

        <p>{comment.comments}</p>
      </li>
    </div>
  );
};

export default Rendercomments;
