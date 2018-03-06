import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Account = props => {
  return (
    <div className="form">
      <h2>Account Information</h2>
      <div className="form-group">
        <label className="mb-0 text-muted text-muted">Email</label>
        <input
          className="form-control mb-3"
          type="text"
          value={props.email}
          style={{ marginRight: '5px' }}
          placeholder="john@email.com"
          onChange={event => props.self.setState({ email: event.target.value })}
        />
        <label className="mb-0 text-muted text-muted">Password</label>
        <input
          className="form-control"
          type="password"
          value={props.password}
          style={{ marginRight: '5px' }}
          placeholder="********"
          onChange={event =>
            props.self.setState({ password: event.target.value })
          }
        />
        <small className="form-text text-muted">
          Must be 6 characters or longer.
        </small>
        <label className="mb-0 text-muted text-muted">Fundraiser Name</label>
        <input
          className="form-control"
          type="text"
          value={props.fundraiser}
          style={{ marginRight: '5px' }}
          onChange={event =>
            props.self.setState({ fundraiser: event.target.value })
          }
        />
      </div>
      <div>{props.error.message}</div>
    </div>
  );
};
export default Account;
