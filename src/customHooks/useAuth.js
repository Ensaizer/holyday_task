import axios from 'axios';

export default function useAuth() {
  const signUpHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (!data.name || !data.email || !data.password) return;
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('age', data.age);
    formData.append('city', data.city);
    formData.append('filename', e.target.filename.files[0]);

    axios
      .post('/api/account/signup', formData)
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.email || !data.password) return;
    axios
      .post('/api/account/login', data)
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    axios('/api/account/logout')
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return { signUpHandler, signInHandler, logoutHandler };
}
