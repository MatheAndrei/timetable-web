import {Box} from "@mui/material";
import {weekDays} from "./TimetableConstants";
import {TimetableDay} from "./TimetableDay";
import {TimetableDetails} from "./TimetableDetails";

interface TimetableBodyProps {
	timetable: TimetableDetails;
}

export const TimetableBody = (props: TimetableBodyProps) => {
	const timetable: TimetableDetails = props.timetable;

	return (
		<Box>
			{weekDays.map(day => (
				<TimetableDay key={`${day}`} name={day} day={timetable.days.find(elem => elem.name == day)}/>
			))}
		</Box>
	);
};