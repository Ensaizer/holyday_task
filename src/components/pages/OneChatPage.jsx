import React from 'react';
import Row from 'react-bootstrap/Row';
import PostForm from '../ui/PostForm';
import PostsPart from '../ui/PostsPart';
import {
  SET_USERS_FROM_SERVER,
  ADD_MESSAGE_FROM_SERVER,
  ADD_MESSAGE_FROM_CLIENT,
  TYPING_MESSAGE_FROM_SERVER,
  STOP_TYPING_MESSAGE_FROM_SERVER,
  DELETE_MESSAGE_FROM_SERVER,
  DELETE_MESSAGE_FROM_CLIENT,
} from '../../ws/actions';

export default function OneChatPage({ messages, user: loggedUser }) {
  const socketRef = React.useRef(null);
  // const [postsState, setPostsState] = React.useState(posts);
  //   const [users, setUsers] = React.useState([]);
  const [allMessages, setAllMessages] = React.useState(messages || []);
  // console.log(allPosts);
  const postSubmitHandler = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;
    const data = Object.fromEntries(new FormData(e.target));
    e.target.reset();
    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: ADD_MESSAGE_FROM_CLIENT, payload: data }));
  };
  // const [userTyping, setUserTyping] = useState(null);

  React.useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000');

    const socket = socketRef.current;

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      switch (type) {
        // case SET_USERS_FROM_SERVER:
        //   console.log(payload);
        //   setUsers(payload);
        //   break;
        case ADD_MESSAGE_FROM_SERVER:
          setAllMessages((prev) => [...prev, payload]);
          break;
        case DELETE_MESSAGE_FROM_SERVER: {
          setAllMessages((prev) => prev.filter((el) => el.id !== payload));
          break;
        }
        default:
          break;
      }
    };
  }, []);
  const deletePostHandler = (id) => {
    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: DELETE_MESSAGE_FROM_CLIENT, payload: id }));
  };
  // const handleMessage = (input) => {
  //   const socket = socketRef.current;
  //   socket.send(JSON.stringify({ type: ADD_MESSAGE_FROM_CLIENT, payload: input }));
  // };
  // const { deletePostHandler } = usePost(postsState);

  if (!loggedUser) {
    return <h2 className="text-center">Доступно только авторизованным пользователям</h2>;
  }
  return (
    <>
      <Row style={{ height: '80vh', maxHeight: '80vh', overflow: 'auto' }}>
        {/* Блок с пользователями в онлайне */}
        {/* <OnlineUsers users={users.filter((el) => el.id !== loggedUser.id)} /> */}
        {/* Блок с постами */}
        <PostsPart
          allMessages={allMessages}
          deletePostHandler={deletePostHandler}
          user={loggedUser}
        />
      </Row>
      <Row>
        {/* Блок с формой для создания поста */}
        <PostForm postSubmitHandler={postSubmitHandler} />
      </Row>
    </>
  );
}
