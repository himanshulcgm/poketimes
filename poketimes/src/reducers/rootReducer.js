const initState = {
  posts: [
    {
    id: "1",
    title: "one",
    body: "one one one one one one"
  },
    {
    id: "2",
    title: "two",
    body: "two two two two two two"
  },
    {
    id: "3",
    title: "three",
    body: "three three three three three three"
  }
]
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_POST": {
      const post = state.posts.filter(post => post.id !== action.id);
      return {
        ...state,
        posts: post
      }
    }  
    default: return state;
  }
}

export default rootReducer