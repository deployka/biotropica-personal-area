import React from 'react';

interface Props {
  id: string;
}

export const ProfileSvgSelector = ({ id }: Props) => {
  switch (id) {
    case 'arrow-left':
      return (
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.74046 1.25954L1 6L5.74046 10.7405"
            stroke="#1E174D"
            stroke-width="1.81493"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case 'arrow-right':
      return (
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.25954 1.25954L6 6L1.25954 10.7405"
            stroke="#1E174D"
            stroke-width="1.81493"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case 'close':
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.263544 0.41217L0.333066 0.333439C0.634328 0.0321766 1.10837 0.00900269 1.43622 0.263917L1.51495 0.333439L7.20275 6.02124L12.8906 0.33344C13.1918 0.032178 13.6659 0.00900193 13.9937 0.263917L14.0724 0.333439C14.3737 0.634701 14.3969 1.10875 14.142 1.43659L14.0724 1.51532L8.38463 7.20312L14.0724 12.8909C14.3737 13.1922 14.3969 13.6662 14.142 13.9941L14.0724 14.0728C13.7712 14.3741 13.2971 14.3972 12.9693 14.1423L12.8906 14.0728L7.20275 8.38501L1.51495 14.0728C1.21369 14.3741 0.739641 14.3972 0.411796 14.1423L0.333066 14.0728C0.0318032 13.7715 0.00862923 13.2975 0.263544 12.9697L0.333066 12.8909L6.02087 7.20312L0.333066 1.51532C0.0318032 1.21406 0.00862912 0.740014 0.263544 0.41217L0.333066 0.333439L0.263544 0.41217Z"
            fill="#9E97BE"
          />
        </svg>
      );

    default:
      return <svg></svg>;
  }
};
