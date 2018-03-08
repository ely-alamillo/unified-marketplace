import React from 'react';

const Fundraisers = props => {
  return (
    <div>
      {props.fundraisers === null ? (
        <h1>Loading data...</h1>
      ) : (
        props.fundraisers.map(fundraiser => {
          return (
            <div
              className="card"
              style={{ width: '18 rem' }}
              key={fundraiser.name}
            >
              {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
              <div className="card-body">
                <h5 className="card-title">{fundraiser.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {fundraiser.owner}
                </h6>
                <p className="card-text">Some description of the fundraiser.</p>
                <a href="/cashout" className="btn btn-primary disabled">
                  Cash out
                </a>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Fundraisers;
