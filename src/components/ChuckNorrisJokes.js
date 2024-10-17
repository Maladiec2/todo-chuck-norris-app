import React, { useEffect, useState } from 'react';

const ChuckNorrisJokes = () => {
  const [joke, setJoke] = useState('');
  const [timestamp, setTimestamp] = useState(''); // State for the timestamp

  const fetchJoke = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev');
    const data = await response.json();
    setJoke(data.value);
    setTimestamp(new Date().toLocaleString()); // Set the timestamp when the joke is fetched
  };

  useEffect(() => {
    fetchJoke(); // Fetch the first joke when the component mounts

    const intervalId = setInterval(() => {
      fetchJoke(); // Fetch a new joke every 15 seconds
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h2>Chuck Norris Joke</h2>
      <p>{joke}</p>
      <p>Fetched at: {timestamp}</p> {/* Display the timestamp */}
    </div>
  );
};

export default ChuckNorrisJokes;
