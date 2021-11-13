import React from "react";
import Select from "react-select";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Label } from "../Label/Label";

import s from "./SelectCustom.module.scss";

interface Props {
  hideLabel?: boolean;
  onChange: any;
  Styles?: any;
  onBlur: any;
  options: any;
  value: any;
  name: string;
  placeholder: string;
  settings: {
    classes?: any;
    touched: any;
    errors: any;
  };
}

export type ISelect<V> = {
  value: V;
  label: string;
};

export const SelectCustom = (props: Props) => {
  const DefaultStyles = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: 15,
      height: 50,
      border: "1px solid #9895a7",
      paddingLeft: 5,
      marginBottom: 5,
    }),

    option: (styles: any, { isSelected }: any) => ({
      ...styles,
      background: isSelected ? "#F7F6FB" : null,
      color: "#1E174D",
      height: 45,
      fontWeight: 500,
      padding: "14px 12px",
    }),
    menu: (styles: any) => ({
      ...styles,
      borderRadius: 15,
      border: null,
      boxShadow: "0px 1px 10px rgba(30, 23, 77, 0.05);",
      zIndex: "45",
      overflow: "hidden",
    }),
    menuList: (styles: any) => ({
      ...styles,
      paddingBottom: 0,
      paddingTop: 0,
    }),
  };

  const { settings, ...selectProps } = props;
  const { touched, errors } = settings;
  return (
    <>
      {props.hideLabel || <Label active={true} value={props.placeholder} />}
      <Select
        {...selectProps}
        styles={props.Styles || DefaultStyles}
        name="gender"
      />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name][0]?.value} />
      )}
    </>
  );
};
