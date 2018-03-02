import React, { Component } from 'react';

const Profile = props => {
  return (
    <div>
      <h2>Personal Information</h2>
      <label className="mb-0 text-muted text-muted">First Name</label>
      <input
        className="form-control mb-3"
        type="text"
        value={props.firstname}
        style={{ marginRight: '5px' }}
        placeholder="First Name"
        onChange={event =>
          props.self.setState({ firstname: event.target.value })
        }
      />
      <label className="mb-0 text-muted">Last Name</label>
      <input
        className="form-control mb-3"
        type="text"
        value={props.lastname}
        style={{ marginRight: '5px' }}
        placeholder="Doe"
        onChange={event =>
          props.self.setState({ lastname: event.target.value })
        }
      />
      <label className="mb-0 text-muted">Postal Code</label>
      <input
        className="form-control mb-3"
        type="text"
        value={props.postCode}
        style={{ marginRight: '5px' }}
        placeholder="90210"
        onChange={event =>
          props.self.setState({ postCode: event.target.value })
        }
      />
      <label className="mb-0 text-muted">City</label>
      <input
        className="form-control mb-3"
        type="text"
        value={props.city}
        style={{ marginRight: '5px' }}
        placeholder="Beverly Hills"
        onChange={event => props.self.setState({ city: event.target.value })}
      />
      <label className="mb-0 text-muted">Country</label>
      {/* <input
        className="form-control mb-3"
        type="text"
        value={props.country}
        style={{ marginRight: '5px' }}
        placeholder="US"
        onChange={event => props.self.setState({ country: event.target.value })}
      /> */}
      <select
        className="form-control"
        onChange={event => {
          console.log('event', event.target.value);
          props.self.setState({ country: event.target.value });
        }}
      >
        <option>United States</option>
      </select>
      <small className="form-text text-muted">
        We only accept US based fundraising.
      </small>
    </div>
  );
};
export default Profile;
