interface Props {
  id: string;
}

export const QuestionnaireSvgSelector = ({ id }: Props) => {
  switch (id) {
    case 'arrow':
      return (
        <svg
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.25 7.27393L16.25 7.27393"
            stroke="#9895A7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.2998 13.2985L1.2498 7.27451L7.2998 1.24951"
            stroke="#9895A7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    default:
      return <div></div>;
  }
};
