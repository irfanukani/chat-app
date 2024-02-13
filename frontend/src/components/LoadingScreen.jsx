import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingScreen({loading, setLoading}) {
  return (
    <section className="bg-gray-800 grid place-items-center h-screen text-white" onClick={() => setLoading(!loading)}>
        <button className="w-80 h-12 bg-gray-900 rounded hover:scale-110 transition">Start chatting 🚀</button>
    </section>
  );
}

LoadingScreen.propTypes = {
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
