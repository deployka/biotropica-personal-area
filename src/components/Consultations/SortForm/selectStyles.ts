import { Styles } from '../../../shared/Form/Select/SelectCustom';

export const selectStyles = {
  container: (styles: Styles) => ({
    ...styles,
    width: '100%',
    height: '100%',
  }),
  control: (styles: Styles) => ({
    ...styles,
    borderRadius: 50,
    height: '100%',
    border: '1px solid #9895a7',
    paddingLeft: 5,
  }),

  option: (styles: Styles, { isSelected }: Styles) => ({
    ...styles,
    background: isSelected ? '#F7F6FB' : null,
    color: '#1E174D',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    padding: '14px 12px',
  }),
  menu: (styles: Styles) => ({
    ...styles,
    borderRadius: 5,
    border: null,
    boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
    zIndex: '45',
    overflow: 'hidden',
  }),
  menuList: (styles: Styles) => ({
    ...styles,
    paddingBottom: 0,
    paddingTop: 0,
  }),
};
