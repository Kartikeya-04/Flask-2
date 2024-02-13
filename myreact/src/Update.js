import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';

function Update() {
  const navigate = useNavigate();
  const [upfirst, setupfirst] = useState({
    Name: '',
    Location: '',
    NewName: '',
    NewLocation: '',
  });

  const [up, setup] = useState(null);
  const getback = () => {
    navigate('/');
  };
  const User = (e) => {
    e.preventDefault();
    setupfirst({ ...upfirst, Name: e.target.value });
  };

  const UserPass = (e) => {
    e.preventDefault();
    setupfirst({ ...upfirst, Location: e.target.value });
  };
  const NUser = (e) => {
    e.preventDefault();
    setupfirst({ ...upfirst, NewName: e.target.value });
  };

  const NUserPass = (e) => {
    e.preventDefault();
    setupfirst({ ...upfirst, NewLocation: e.target.value });
  };

  const updateData = async (e) => {
    try {
      e.preventDefault();
      console.log('start of update');
      const resp = await fetch('http://localhost:8325/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upfirst),
      });
      let da = await resp.json();
      console.log(da);
      await setup(da);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="Update">
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
      <div className="container flex flex-col justify-center h-screen w-screen items-center gap-8">
        <div className="row flex flex-col justify-center h-full items-center gap-20 all2">
          <form>
            <div>
              <h3 className="updatetitle">UPDATE DATA</h3>
            </div>
            {/* <div>
            
            </div> */}
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Old UserName
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={User}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your details with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Old Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={UserPass}
              />
            </div>
            <div className="mb-3 form-check"></div>

            {/* //update  */}

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                New UserName
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={NUser}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your details with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                New Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={NUserPass}
              />
            </div>

            {/* updated end  */}
            <div className=" flex justify-center items-center">
              <button
                type="submit"
                className="btn btn-secondary w-full"
                onClick={updateData}
              >
                UPDATE
              </button>

              <div>
                {up !== 'Updated!!!' &&
                  typeof up !== 'undefined' &&
                  up !== null && (
                    <div className="alert alert-danger" role="alert">
                      <h3>{`Sorry! ${up}`}</h3>
                    </div>
                  )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Update;
