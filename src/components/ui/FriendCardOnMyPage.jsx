import React from 'react';

export default function FriendCardOnMyPage({
  friend,
  deleteUserHandler,
  addUserHandler,
  openChatHandler,
}) {
  return (
    <li href="#" className="list-group-item text-left">
      <img className="img-thumbnail" src={`./avatars/${friend.avatar}`} />
      <label className="name">
        {friend.name}
        <br />
      </label>
      <label className="pull-right">
        <button
          className="btn btn-success btn-xs glyphicon glyphicon-ok"
          onClick={() => addUserHandler(friend.id)}
          title="View"
        ></button>
        <button
          onClick={() => deleteUserHandler(friend.id)}
          className="btn btn-danger  btn-xs glyphicon glyphicon-trash"
          title="Delete"
        ></button>
        <button
          className="btn btn-info  btn-xs glyphicon glyphicon glyphicon-comment"
          onClick={() => openChatHandler(friend.id)}
          title="Send message"
        ></button>
      </label>
      <div className="break"></div>
    </li>
  );
}
