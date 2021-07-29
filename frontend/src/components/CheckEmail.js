import React from 'react';
import { Link } from 'react-router-dom';

const CheckEmail = () => {
    return (
        <div className="container">
            <div className="row">
                <div className='col-md-12 checkemailCol '>
                    <div className="checkemailDIv">
                        <h3 className="text-center">Please Check your email to verify</h3>
                        <div className="d-flex justify-content-center">
                            <Link className="btn checkemailLoginBtn " to='/login'>login</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;