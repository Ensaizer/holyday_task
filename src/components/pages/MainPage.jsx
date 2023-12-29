import React from 'react';
import FriendCardOnMyPage from '../ui/FriendCardOnMyPage';
// import BoxCard from '../ui/BoxCard';
// import MyModal from '../ui/MyModal';
// import Modal from 'react-modal';

export default function MainPage({ users, user }) {
  // const [isModal, setIsModal] = React.useState(false);
  // const [modal, setModal] = React.useState(null);
  // const [modalIsOpen, setModalIsOpen] = React.useState(false);
  // const [lootBoxesState, setLootBoxesState] = React.useState(lootBoxes);
  // const [userBalance, setUserBalance] = React.useState(user ? user.balance : null);
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };
  // const modalContent = (
  //   <div>
  //     <h2>УРА ВЫ ПОТРАТИЛИ ДЕНЬГИ</h2>

  //     <button onClick={closeModal}>Закрыть</button>
  //   </div>
  // );
  // const openClickHandler = async (id) => {
  //   const response = await fetch(`/api/lootboxes/${id}`, { method: 'PATCH' });
  //   if (response.status === 200) {
  //     const updateLootBox = await response.json();
  //     setLootBoxesState((prev) =>
  //       prev.map((lootbox) => (lootbox.id === id ? updateLootBox : lootbox)),
  //     );
  //     setModal(updateLootBox);
  //     setIsModal((prev) => !prev);
  //     openModal();
  //   } else if (response.status === 500) {
  //     const message = await response.json();
  //     console.log(message);
  //   }
  // };
  const addUserHandler = (id) => {
    const response = fetch(`/api/friends/${id}`, { method: 'POST' });
    if (response.ok) {
      console.log('Добавлено');
    }
  };
  return (
    <>
      {
        <div>
          {users.map((user) => (
            <FriendCardOnMyPage key={user.id} friend={user} addUserHandler={addUserHandler} />
          ))}
        </div>
      }
    </>
  );
}
