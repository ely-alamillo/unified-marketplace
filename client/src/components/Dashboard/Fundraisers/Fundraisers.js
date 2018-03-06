import React, { Component } from 'react';

const Fundraisers = props => {
  return (
    <div>
      {props.fundraisers === null ? (
        <h1>Loading data...</h1>
      ) : (
        props.fundraisers.map(fundraiser => {
          return (
            <div>
              <h1>name: {fundraiser.name}</h1>
              <h3>owner: {fundraiser.owner}</h3>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Fundraisers;
