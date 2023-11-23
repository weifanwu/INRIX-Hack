import React, {useState, useEffect} from 'react';
import UserPost from './components/UsePost';

function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("/members")
    .then(res => res.json())
    .then(data => {
      setData(data);
      console.log(data);
    })
  }, [])

const handleSubmit = (e) => {
  e.preventDefault();
}

  return (
    <div>
      {data.members?.map((member, i) => {
        return <p key={i}>{member}</p>;
      })}

      <form onSubmit={handleSubmit} method='post'>
        <input type="text" id='startPlace' />
        <br></br>
        <input type="text" id='endPlace' />
        <br></br>
        <input type='submit' value='submit' />
      </form>

      <UserPost />
    </div>

  );
}

export default App;
