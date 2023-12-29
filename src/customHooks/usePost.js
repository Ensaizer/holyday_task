import React from 'react';
import axios from 'axios';

export default function usePost(posts) {
  const [allPosts, setAllPosts] = React.useState(posts || []);

  const postSubmitHandler = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;
    const data = Object.fromEntries(new FormData(e.target));
    e.target.reset();
    axios
      .post('/api/post', data)
      .then((res) => {
        setAllPosts([res.data, ...allPosts]);
      })
      .catch((err) => console.log(err.response.data));
  };

  const deletePostHandler = (id) => {
    axios
      .delete(`/api/post/${id}`)
      .then(() => {
        setAllPosts(allPosts.filter((post) => post.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };

  return {
    allPosts,
    // deletePostHandler,
  };
}
