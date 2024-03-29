import React, { ReactElement } from 'react';

type Props = {
  id: 'sent' | 'read';
};

export function ChatSvgSelector({ id }: Props): ReactElement {
  switch (id) {
    case 'sent':
      return (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.61925 0L9.11822 0.486775L3.71865 7.89105L0 4.23358L0.830331 3.42354L3.71865 5.19343L8.61925 0Z"
            fill="#6F61D0"
          />
        </svg>
      );
    case 'read':
      return (
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.501 0.108955L14 0.59573L8.60042 8L6.41166 5.83835L7.33857 4.56645L8.60042 5.30239L13.501 0.108955ZM9.11925 0L9.61822 0.486775L4.21865 7.89105L0.5 4.23358L1.33033 3.42354L4.21865 5.19343L9.11925 0Z"
            fill="#6F61D0"
          />
        </svg>
      );
  }
}
