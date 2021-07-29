import { FETCH_COMMENTS, ADD_COMMENT } from "../Type";


export const CommentReducer = (
  state = {
    // comments: JSON.parse(localStorage.getItem("newComments") || "[]"),
    comments:[]
  },
  action
) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    // case ADD_COMMENT:
    //   const newComments = [...state.comments, action.payload];
    //   localStorage.setItem("newComments", JSON.stringify(newComments));

    //   return {
    //     comments: newComments,
    //   };

    // } ;

    default:
      return state;
  }
};
