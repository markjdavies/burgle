import React from 'react';
import PropTypes from 'prop-types';
import './Hourglass.css';
/*
    A butchered version of Lenka's Hourglass Loader http://codepen.io/madetoday/pen/MYxYeo/
*/

function Hourglass(props) {
    const duration = `${props.durationSeconds}s`;
    const HourglassSvg = () => (
        <svg
            className="timerAnimation"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" >

            {/*  background  */}
            <svg>
                <circle cx="150" cy="150" r="130" style={{ stroke: '#ECC4BD', strokeWidth: '18', fill: 'transparent' }} />
                <circle cx="150" cy="150" r="115" style={{ fill: '#43292E' }} />
                <path style={{
                    stroke: '#43292E',
                    strokeDasharray: '820',
                    strokeDashoffset: '820',
                    strokeWidth: '18',
                    fill: 'transparent'
                }}
                    d="M150,150 m0,-130 a 130,130 0 0,1 0,260 a 130,130 0 0,1 0,-260">
                    <animate attributeName="stroke-dashoffset" dur={duration} to="0" repeatCount="0" fill="freeze" />
                </path>
            </svg>

            {/*  image  */}
            <svg>
                <path id="hourglass"
                    d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z"
                    style={{ stroke: 'white', strokeWidth: '5', fill: 'white' }} />

                <path id="frame" d="M100,97 L200, 97 M100,203 L200,203 M110,97 L110,142 M110,158 L110,200 M190,97 L190,142 M190,158 L190,200 M110,150 L110,150 M190,150 L190,150"
                    style={{ stroke: '#ECC4BD', strokeWidth: '6', strokeLinecap: 'round' }} />

            </svg>

            {/*  sand  */}
            <svg>
                {/*  upper part  */}
                <polygon id="upper" points="120,125 180,125 150,147" style={{ fill: '#43292E' }}>
                    <animate
                        attributeName="points"
                        dur={duration}
                        keyTimes="0; 1"
                        values="120,125 180,125 150,147; 150,150 150,150 150,150"
                        repeatCount="0"
                        fill="freeze" />
                </polygon>

                {/*  falling sand  */}
                <path
                    id="line"
                    strokeLinecap="round"
                    strokeDasharray="1,4"
                    strokeDashoffset="200.00"
                    stroke="#43292E"
                    strokeWidth="2"
                    d="M150,150 L150,198">
                    {/*  running sand  */}
                    <animate attributeName="stroke-dashoffset" dur="6s" to="1.00" repeatCount="indefinite" />
                    {/*  emptied upper  */}
                    <animate
                        attributeName="d"
                        dur={duration} to="M150,195 L150,195"
                        values="M150,150 L150,198; M150,150 L150,198; M150,198 L150,198; M150,195 L150,195"
                        keyTimes="0; 0.98; 0.99; 1"
                        repeatCount="0"
                        fill="freeze" />
                    {/*  last drop  */}
                    <animate
                        attributeName="stroke"
                        dur={duration}
                        keyTimes="0; 0.95; 0.99; 1"
                        values="#43292E;#43292E;transparent;transparent"
                        to="transparent"
                        repeatCount="0"
                        fill="freeze" />
                </path>

                {/*  lower part  */}
                <g id="lower">
                    <path d="M150,180 L180,190 A28,10 0 1,1 120,190 L150,180 Z" style={{ stroke: 'transparent', strokeWidth: '5', fill: '#43292E' }}>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0; 0.99; 1" values="0 15; 0 0; 0 0" dur={duration} repeatCount="0" fill="freeze" />
                    </path>

                </g>

                {/*  lower overlay - hourglass  */}
                <path d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z" style={{ stroke: 'white', strokeWidth: '5', fill: 'transparent' }}>

                </path>

                {/*  lower overlay - frame  */}
                <path id="frame" d="M100,97 L200, 97 M100,203 L200,203" style={{ stroke: '#ECC4BD', strokeWidth: '6', strokeLinecap: 'round' }}>

                </path>
            </svg>

        </svg>
    );
    return (
        <div className="timerAnimation">
            <HourglassSvg />
        </div>
    );
}

Hourglass.propTypes = {
    durationSeconds: PropTypes.number,
};

export default Hourglass;