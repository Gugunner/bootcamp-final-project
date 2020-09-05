import React from 'react';

const Iframe = ({ source }) => {
    if (!source) {
        return <div>Loading...</div>;
    }
    const src = source;
    return (
        <div>
            <div>
                <iframe width="90%" height="800px" src={src}></iframe>
            </div>
        </div>
    );
};

export default Iframe;