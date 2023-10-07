import {Box} from "@mui/material";
import {TimetableHeader} from "./TimetableHeader";
import {TimetableBody} from "./TimetableBody";
import {Legend} from "../legend/Legend";
import {TimetableDetails} from "./TimetableDetails";
import {EventType} from "./Event";
import {DateTime} from "luxon";
import axios from "axios";

interface TimetableProps {
	timetable: TimetableDetails;
}

export async function readTimetable(path: string): Promise<TimetableDetails> {
	const data = await axios.get(path).then(response => response.data);

	return {
		name: data["name"],
		days: Object.entries(data["days"]).map(entry => {
			return {
				name: entry[0],
				// @ts-ignore
				events: entry[1].map(event => {
					return {
						name: event["name"],
						teacher: event["teacher"],
						type: event["type"] as EventType,
						room: event["room"],
						start: DateTime.fromISO(event["start"]),
						end: DateTime.fromISO(event["end"]),
						frequency: event["frequency"]
					};
				})
			};
		}),
		path: path
	};
}

export const Timetable = (props: TimetableProps) => {
	const timetable: TimetableDetails = props.timetable;

	return (
		<Box>
			<TimetableHeader/>
			<TimetableBody timetable={timetable}/>
			<Legend/>
		</Box>
	);
};