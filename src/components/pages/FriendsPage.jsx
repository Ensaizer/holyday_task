import React from 'react';
import FriendCardOnMyPage from '../ui/FriendCardOnMyPage';

export default function FriendsPage({ userFriends }) {
  const [friends, setFriends] = React.useState(userFriends);
  const deleteUserHandler = async (id) => {
    const response = await fetch(`/api/friends/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setFriends((prev) => prev.filter((f) => f.id !== id));
    }
  };
  const openChatHandler = async (id) => {
    const response = await fetch(`/api/messages/${id}`, { method: 'GET' });
    if (response.ok) {
      console.log('Добавлено');
    }
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="jumbotron list-content">
        <ul className="list-group">
          {friends.map((friend) => (
            <FriendCardOnMyPage
              key={friend.id}
              friend={friend}
              deleteUserHandler={deleteUserHandler}
              openChatHandler={openChatHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
