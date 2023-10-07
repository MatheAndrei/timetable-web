import React, {useLayoutEffect, useRef, useState} from "react";
import {Box, SxProps, Typography} from "@mui/material";
import {TimetableCell} from "./TimetableCell";
import {
	bodyBGColor,
	bodyFGColor,
	cellMargin,
	cellPadding,
	dayCellSize,
	dayEnd,
	dayHours,
	dayStart,
	eventCellSize,
	headerBGColor,
	headerFGColor,
	hourCellSize,
	labColor,
	lectureColor,
	seminarColor,
	slotColor
} from "./TimetableConstants";
import {Day} from "./Day";
import {Event, EventType} from "./Event";
import {Interval} from "luxon";

interface TimetableDayProps {
	name: string;
	day?: Day;
}

const timetableDayStyle: SxProps = {
	display: "flex",
	flexFlow: "row nowrap"
};

const timetableHoursStyle: SxProps = {
	display: "flex",
	flexFlow: "column nowrap",
	width: `calc(${hourCellSize} + ${cellPadding} / 2)`,
	margin: cellMargin,
	gap: `calc(${cellMargin} * 2)`
};

const timetableEventsStyle: SxProps = {
	position: "relative",
	width: eventCellSize,
	backgroundColor: bodyBGColor,
	margin: cellMargin,
};

const timetableDayCellStyle: SxProps = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	width: dayCellSize,
	backgroundColor: headerBGColor,
	color: headerFGColor,
	margin: cellMargin,
	padding: cellPadding,
	textAlign: "center"
};

const timetableHourCellStyle: SxProps = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	backgroundColor: headerBGColor,
	color: headerFGColor,
	padding: cellPadding,
	textAlign: "center"
};

const timetableEventCellStyle: SxProps = {
	position: "absolute",
	width: eventCellSize,
	color: bodyFGColor,
	padding: cellPadding,
	overflow: "auto",
	scrollbarWidth: "none",

	"&:hover": {
		opacity: .85
	},
	"&::-webkit-scrollbar": {
		background: "transparent",
		width: 0
	}
};

const timetableLectureCellStyle: SxProps = {
	...timetableEventCellStyle,
	backgroundColor: lectureColor
};

const timetableSeminarCellStyle: SxProps = {
	...timetableEventCellStyle,
	backgroundColor: seminarColor
};

const timetableLabCellStyle: SxProps = {
	...timetableEventCellStyle,
	backgroundColor: labColor
};

const timetableSlotCellStyle: SxProps = {
	backgroundColor: slotColor,
	width: eventCellSize
};

function getEventPositions(event: Event, hourHeight: number): [number, number] {
	// get start position
	let startPosition: number = 0;
	const deltaHoursStart: number = Interval.fromDateTimes(dayStart, event.start).length("hours");
	startPosition += Math.floor(deltaHoursStart) * (hourHeight + parseInt(cellMargin.slice(0, -2)) * 2);
	startPosition += (deltaHoursStart % 1) * hourHeight;

	// get end position
	let endPosition: number = 0;
	const deltaHoursEnd: number = Interval.fromDateTimes(dayStart, event.end).length("hours");
	endPosition += Math.floor(deltaHoursEnd) * (hourHeight + parseInt(cellMargin.slice(0, -2)) * 2);
	endPosition += (deltaHoursEnd % 1) !== 0 ? (deltaHoursEnd % 1) * hourHeight : -parseInt(cellMargin.slice(0, -2)) * 2;

	return [startPosition, endPosition];
}

function getEventStyle(event: Event, hourHeight: number): SxProps {
	const [startPosition, endPosition] = getEventPositions(event, hourHeight);

	let baseStyle: SxProps;
	switch (event.type) {
		case EventType.LECTURE:
			baseStyle = timetableLectureCellStyle;
			break;
		case EventType.SEMINAR:
			baseStyle = timetableSeminarCellStyle;
			break
		case EventType.LAB:
			baseStyle = timetableLabCellStyle;
			break;
		default:
			baseStyle = timetableSlotCellStyle;
	}

	return {
		...baseStyle,
		top: startPosition,
		height: endPosition - startPosition
	}
}

export const TimetableDay = (props: TimetableDayProps) => {
	const name: string = props.name;
	const day: Day | undefined = props.day;
	const events: Event[] = day !== undefined ? day.events : [];

	// get height of an hour cell
	const cellRef = useRef(null);
	const [hourHeight, setHourHeight] = useState<number>(0);

	const updateHourHeight = (ref: React.MutableRefObject<null>) => {
		if (ref.current === null)
			return;
		// @ts-ignore
		setHourHeight(ref.current.offsetHeight);
	};

	window.addEventListener("resize", () => updateHourHeight(cellRef));

	useLayoutEffect(() => {
		updateHourHeight(cellRef);
	}, []);

	return (
		<Box sx={timetableDayStyle}>
			{/* DAY */}
			<TimetableCell sx={timetableDayCellStyle}>
				<Typography>{name}</Typography>
			</TimetableCell>

			{/* HOURS */}
			<Box sx={timetableHoursStyle}>
				{dayHours.map(hour => (
					<TimetableCell key={`${name}-${hour}`} sx={timetableHourCellStyle} ref={+hour === +dayStart ? cellRef : null}>
						<Typography>
							{hour.toFormat("HH:mm")} - {hour.plus({hour: 1}).toFormat("HH:mm")}
						</Typography>
					</TimetableCell>
				))}
			</Box>

			{/* EVENTS */}
			<Box sx={timetableEventsStyle}>
				{/* SLOTS */}
				{dayHours.map(hour => (
					<TimetableCell
						key={`slot-${hour}`}
						sx={{
							...timetableSlotCellStyle,
							height: hourHeight,
							marginBottom: +hour !== +dayEnd.minus({hour: 1}) ? "2px" : 0
						}}
					/>
				))}

				{events.map((event, idx) => (
					<TimetableCell
						key={`${day?.name}-${event.name}-${event.type}`}
						sx={{
							...getEventStyle(event, hourHeight),
							zIndex: idx + 1
						}}
					>
						<Typography>{event.name} {event.frequency !== "" ? `- (${event.frequency})` : ""}</Typography>
						<Typography variant={"body2"}>{event.teacher}</Typography>
						<Typography variant={"body2"}>{event.room}</Typography>
					</TimetableCell>
				))}
			</Box>
		</Box>
	);
};