export type Event = {
  id: string,
	date: Date, 
	title: string,
	description: string,
	createAt: Date | null,
	canceledAt: Date | null
};

export default class ConstCalendar {
  static readonly days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  static readonly daysFull: string[] = ["Sunday", "Monday", "Tuenday", "Wednesday", "Thursday", "Friday", "Saturday"];
  static readonly months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
};
