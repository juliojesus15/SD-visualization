import { useContext } from "react";

import { StudentContext } from "../context/StudentContext";

import { SelectSemester } from "./SelectSemester";
import { ThemeButton } from "./ThemeButton";

import { times } from "../constant/filter";

export const ControllerBar = () => {
  const { semesterFrom, updateSemesterFrom, semesterTo, updateSemesterTo } = useContext(StudentContext);

  const limitedOptions = times.filter( ( semester ) => semester.name > semesterFrom );

  return (
    <header className="flex p-2 justify-between items-center border-b border-gray-300 dark:border-gray-600 h-10">
      <section className="flex gap-10">
        <div className="flex gap-2">
          <label className="font-roboto font-medium text-xs text-gray-600 dark:text-gray-100 my-auto"> Periodo inicial: </label>
          <SelectSemester defaultValue={ semesterFrom } onSelect={ updateSemesterFrom } options={ times } />
        </div> 
        <div className="flex gap-2">
          <label className="font-roboto font-medium text-xs text-gray-600 dark:text-gray-100 my-auto"> Periodo final: </label>
          <SelectSemester defaultValue={ semesterTo } onSelect={ updateSemesterTo } options={ limitedOptions } />
        </div>        
      </section>      
      <ThemeButton />      
    </header>
  )
}