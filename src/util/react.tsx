import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export enum Icons {
  Dashboard = 0,
  Profile = 1,
}

const icons = [
  <MdDashboard color="white" size={14} />,
  <FaUser color="white" size={14} />,
];

export const GetGlobalIcon = (icon: Icons) => icons[icon];
