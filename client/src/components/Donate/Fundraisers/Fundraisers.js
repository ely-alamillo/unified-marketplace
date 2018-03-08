import React from 'react';
import StripePay from '../StripePay/StripePay';

const Fundraisers = props => {
  console.log('fundraisers: ', props);
  return (
    <div>
      {props.fundraisers === null ? (
        <h1>Loading Fundraisers...</h1>
      ) : (
        props.fundraisers.map(fundraiser => {
          return (
            <div className="card mb-3" style={{ width: '18 rem' }}>
              {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
              <div className="card-body">
                <h5 className="card-title">{fundraiser.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {fundraiser.owner}
                </h6>
                <p className="card-text">Some description of the fundraiser.</p>
                {/* <StripePay onToken={props.onToken} self={props.self} /> */}
                <button
                  className="btn btn-primary"
                  value={JSON.stringify(fundraiser)}
                  onClick={props.addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Fundraisers;
