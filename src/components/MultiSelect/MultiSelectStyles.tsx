export default {

  // eslint-disable-next-line
  control: (styles: any) => ({
    ...styles,
    borderRadius: 4,
    maxWidth: 350,
    minHeight: 40,
    border: '1px solid #F7F6FB',
    padding: '0 0 0 12px',
  }),

  // eslint-disable-next-line
  option: (styles: any, { isSelected }: any) => ({
    ...styles,
    background: isSelected ? '#F7F6FB' : null,
    color: '#1E174D',
    height: 45,
    fontWeight: 500,
    padding: '14px 12px',
  }),

  // eslint-disable-next-line
  menu: (styles: any) => ({
    ...styles,
    maxWidth: 350,
    overflow: 'hidden',
    borderRadius: 4,
    border: null,
    boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
    zIndex: '45',
  }),

  // eslint-disable-next-line
  menuList: (styles: any) => ({
    ...styles,
    paddingBottom: 0,
    paddingTop: 0,
  }),
};
