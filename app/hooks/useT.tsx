import { useEffect } from "react";
import { useTranslation as _useTranslation } from "react-i18next";

export const useTranslation = () => {
  const all = _useTranslation();
  useEffect(() => {}, []);
};
