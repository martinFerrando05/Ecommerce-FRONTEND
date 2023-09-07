import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

const Counter = ({ count, increment, decrement }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const State = (state) => ({
  count: state.count,
});

const Dispatch = {
  increment,
  decrement,
};

export default connect(State, Dispatch)(Counter);
