import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';

function Delete() {
  const navigate = useNavigate();

  const [d, setD] = useState(null);
  const [delfirst, setdelfirst] = useState({ Name: '', Location: '' });
  const getback = () => {
    navigate('/');
  };
  const User = (e) => {
    e.preventDefault();
    setdelfirst({ ...delfirst, Name: e.target.value });
  };

  const UserPass = (e) => {
    e.preventDefault();
    setdelfirst({ ...delfirst, Location: e.target.value });
  };
  const del = async () => {
    try {
      console.log('start of delete');
      const resp = await fetch('http://localhost:8325/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delfirst),
      });
      let da = await resp.json();
      console.log(da);
      await setD(da);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="Delete">
      <Navbar />
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-outline-warning rounded-md p-3"
          onClick={getback}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col justify-center h-screen w-screen items-center gap-10">
        <div className="flex flex-col justify-center h-full items-center gap-14 all">
          {/* <div> */}
          <div className="m-6">
            <h2 className="text-red-900 deltitle">Delete The User</h2>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Name
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={User}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="User's Location"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={UserPass}
            />
            <span class="input-group-text" id="basic-addon2">
              Location
            </span>
          </div>

          <div class="mb-3 m-3">
            <button type="button" className="btn btn-danger w-60" onClick={del}>
              DELETE
            </button>
          </div>
          <div>
            {d !== 'deleted!' && typeof d !== 'undefined' && d !== null && (
              <div className="alert alert-danger" role="alert">
                <h3>{`Sorry! ${d}`}</h3>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Delete;
