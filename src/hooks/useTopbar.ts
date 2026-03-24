import { useContext } from "react";
import { TopbarContext } from "../context/TopbarContext";

export const useTopbar = () => useContext(TopbarContext);