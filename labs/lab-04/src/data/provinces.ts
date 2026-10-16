// Lab 4 — Task 4.1: province data (at least eight entries)
export type Province = {
  id: string;
  name: string;
  capital: string;
  region: string;
};

export const PROVINCES: Province[] = [
  { id: "1", name: "Morobe", capital: "Lae", region: "Momase" },
  { id: "2", name: "Madang", capital: "Madang", region: "Momase" },
  { id: "3", name: "Eastern Highlands", capital: "Goroka", region: "Highlands" },
  { id: "4", name: "Western Highlands", capital: "Mount Hagen", region: "Highlands" },
  { id: "5", name: "National Capital District", capital: "Port Moresby", region: "Southern" },
  { id: "6", name: "East New Britain", capital: "Kokopo", region: "Islands" },
  { id: "7", name: "East Sepik", capital: "Wewak", region: "Momase" },
  { id: "8", name: "Milne Bay", capital: "Alotau", region: "Southern" },
  { id: "9", name: "Enga", capital: "Wabag", region: "Highlands" },
  { id: "10", name: "New Ireland", capital: "Kavieng", region: "Islands" },
];
