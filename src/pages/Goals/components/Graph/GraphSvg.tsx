import React from 'react';

import s from './Graph.module.scss';

interface Props {}

export const GraphSvg = (props: Props) => {
  return (
    <svg viewBox="5 0 813 479" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="url(#graph_gradient)"
        d="M691.5 230.5 C744 225.5 785.5 246.5 821 246.5 V482 H2.00006 V217.662 C77.4234 215.187 101.275 159.378 159.091 159.378 C216.906 159.378 233 187.5 280 217.5 C333 246.5 384.674 225.706 396.5 219.5 C447 193 435.5 197.5 464.5 177 C488.5 158 508 158.5 516 158.5 C530.5 159 547.237 158.968 565.831 206.622 C584.425 254.276 622.976 249.592 635 246.5 C652.5 242 677.06 231.875 691.5 230.5Z"
        stroke="url(#stroke_gradient)"
        stroke-width="3"
      />
      <g>
        <circle
          cx="744"
          cy="234"
          r="5"
          fill="#fff"
          stroke="#6F61D0"
          stroke-width="4"
        />
        <circle
          cx="744"
          cy="234"
          r="12"
          opacity=" 0.16"
          fill="transparent"
          stroke="#6F61D0"
          stroke-width="2"
        />
        <line x1="744" y1="245" x2="744" y2="100%" stroke="#fff" />
      </g>
      <defs>
        <linearGradient
          id="graph_gradient"
          gradientTransform="rotate(-90 .0 1)"
        >
          <stop offset="0%" stop-color="#FFF" />
          <stop offset="82%" stop-color="#c5c0e5" />
        </linearGradient>
        <linearGradient id="stroke_gradient" x1="0%" y1="0%" x2="0%" y2="70%">
          <stop offset="0%" stop-color="#6F61D0" />
          <stop offset="70%" stop-color="#C77EDF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
