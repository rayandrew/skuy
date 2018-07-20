import {
  SET_COUNTER,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from 'constants/counter';

export const getCounter = () => async (dispatch) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      accept: 'application/json',
    });
    const data = await response.json();
    dispatch(set(data.length));
  } catch (err) {
    dispatch(set(NaN));
  }
};

export const set = (value) => ({
  type: SET_COUNTER,
  payload: value,
});

export const increment = () => ({
  type: INCREMENT_COUNTER,
});

export const decrement = () => ({
  type: DECREMENT_COUNTER,
});

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    return;
  }

  dispatch(increment());
};

export const incrementAsync = (delay = 1000) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};
