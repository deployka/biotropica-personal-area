interface Props {
  id: string;
}

export const SidebarSvgSelector = ({ id }: Props) => {
  switch (id) {
    case 'home':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.63105 17.3093V14.7537C7.63104 14.1037 8.16097 13.5755 8.81755 13.5712H11.2226C11.8823 13.5712 12.4171 14.1006 12.4171 14.7537V14.7537V17.3173C12.417 17.8692 12.8619 18.3202 13.4192 18.3332H15.0226C16.621 18.3332 17.9167 17.0504 17.9167 15.468V15.468V8.19803C17.9082 7.57553 17.6129 6.99096 17.115 6.6107L11.6315 2.23759C10.6708 1.47614 9.30521 1.47614 8.34456 2.23759L2.88506 6.61863C2.38526 6.99736 2.08953 7.58289 2.08337 8.20597V15.468C2.08337 17.0504 3.3791 18.3332 4.97747 18.3332H6.58084C7.152 18.3332 7.61502 17.8748 7.61502 17.3093V17.3093"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'goals':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.14292 8.50146V14.2182"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0316 5.76562V14.2179"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.8572 11.5225V14.2183"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.9047 1.6665H6.0952C3.37298 1.6665 1.66663 3.59324 1.66663 6.3208V13.6789C1.66663 16.4064 3.36504 18.3332 6.0952 18.3332H13.9047C16.6349 18.3332 18.3333 16.4064 18.3333 13.6789V6.3208C18.3333 3.59324 16.6349 1.6665 13.9047 1.6665Z"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'tariffs':
      return (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" fill="#1E174D" />
          <path
            d="M13.9652 14.4736H6.74524"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.9652 10.2871H6.74524"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.50036 6.11035H6.74536"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1576 1C14.1576 1 6.48063 1.004 6.46863 1.004C3.70863 1.021 1.99963 2.837 1.99963 5.607V14.803C1.99963 17.587 3.72163 19.41 6.50563 19.41C6.50563 19.41 14.1816 19.407 14.1946 19.407C16.9546 19.39 18.6646 17.573 18.6646 14.803V5.607C18.6646 2.823 16.9416 1 14.1576 1Z"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'services':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.03748 12.3178L8.53175 9.07598L11.3769 11.3109L13.8178 8.16064"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="16.6629"
            cy="3.50027"
            rx="1.60183"
            ry="1.60183"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.4371 2.6001H6.38066C3.87113 2.6001 2.31506 4.37737 2.31506 6.8869V13.6222C2.31506 16.1318 3.84062 17.9014 6.38066 17.9014H13.5508C16.0603 17.9014 17.6164 16.1318 17.6164 13.6222V7.75647"
            stroke="#6F61D0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'logout':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
            stroke="#6F61D0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3334 14.1663L17.5 9.99967L13.3334 5.83301"
            stroke="#6F61D0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 10H7.5"
            stroke="#6F61D0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return <div></div>;
  }
};
