import React from "react";

import s from "./Consultations.module.scss";

import { SpecialistsList } from "./../components/SpecialistsList/SpecialistsList";
import { SearchForm } from "../components/SearchForm/SearchForm";

import { SpecialistInfo } from "../components/SpecialistsList/Specialist";

interface Props {}

export const Consultations = (props: Props) => {
  const specialists: SpecialistInfo[] = [
    {
      photoLink:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      name: "Самарин Иван Дмитриевич",
      expierence: "6 лет",
      specialiaztion: "Full-stack Developer",
      price: 5000,
    },
    {
      photoLink:
        "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80",
      name: "Барулин Михаил Алексеевич",
      expierence: "2 года",
      specialiaztion: "Front-end Developer",
      price: 1200,
    },
  ];

  return (
    <div className={s.consultations}>
      <SearchForm />
      <SpecialistsList specialists={specialists} />
    </div>
  );
};
