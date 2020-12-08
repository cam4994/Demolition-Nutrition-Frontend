import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <div className="home">
        <h1>Live a healthier life. Track your nutrition and fitness with us.</h1>
        <h2>Together, we'll <span className="demolish">Demolish</span> your goals.</h2>
        <button><Nav.Link as={Link} to="/signup">Sign Up</Nav.Link></button>
    </div>
  )
}

export default Home
