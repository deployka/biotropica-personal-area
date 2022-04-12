export default {

  control: (styles: any) => ({
    ...styles,
    borderRadius: 4,
    maxWidth: 350,
    height: 40,
    border: '1px solid #F7F6FB',
    paddingLeft: 12,
  }),

  valueContainer: (styles: any) => ({
    ...styles,
    padding: 0,
  }),

  singleValue: (styles: any) => ({
    ...styles,
    fontSize: 14,
    fontWeight: 500,
    color: '#1E174D',
  }),

  placeholder: (styles: any) => ({
    ...styles,
    fontSize: 14,
  }),

  option: (styles: any, { isSelected }: any) => ({
    ...styles,
    width: '100%',
    background: isSelected ? '#F7F6FB' : null,
    color: '#1E174D',
    height: 40,
    fontWeight: 500,
    padding: '14px 12px',
  }),

  menu: (styles: any) => ({
    ...styles,
    maxWidth: 350,
    overflow: 'hidden',
    borderRadius: 4,
    border: null,
    boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
    zIndex: '45',
  }),

  menuList: (styles: any) => ({
    ...styles,
    paddingBottom: 0,
    paddingTop: 0,
  }),
};
