import { ReactNode } from "react";

export type ContactInfoItem = {
  icon: ReactNode;
  title: string;
  description: string;
  subDescription?: string;
};
