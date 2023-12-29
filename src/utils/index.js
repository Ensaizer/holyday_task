/* eslint-disable import/prefer-default-export */
export const fadeInOut = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};
