import {Box, SxProps, Typography} from "@mui/material";
import {TimetableCell} from "./TimetableCell";
import {
	cellMargin,
	cellPadding,
	dayCellSize,
	headerBGColor,
	headerFGColor,
	hourCellSize,
	eventCellSize
} from "./TimetableConstants";

const timetableHeaderStyle: SxProps = {
	display: "flex",
	flexFlow: "row nowrap"
};

const timetableHeaderCellStyle: SxProps = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	backgroundColor: headerBGColor,
	color: headerFGColor,
	margin: cellMargin,
	padding: cellPadding,
	textAlign: "center"
};

const timetableHeaderDayCellStyle: SxProps = {
	...timetableHeaderCellStyle,
	width: dayCellSize
};
const timetableHeaderHourCellStyle: SxProps = {
	...timetableHeaderCellStyle,
	width: hourCellSize
};
const timetableHeaderEventCellStyle: SxProps = {
	...timetableHeaderCellStyle,
	width: eventCellSize
};

export const TimetableHeader = () => {
	return (
		<Box sx={timetableHeaderStyle}>
			<TimetableCell sx={timetableHeaderDayCellStyle}>
				<Typography>Day</Typography>
			</TimetableCell>
			<TimetableCell sx={timetableHeaderHourCellStyle}>
				<Typography>Hour</Typography>
			</TimetableCell>
			<TimetableCell sx={timetableHeaderEventCellStyle}>
				<Typography>Events</Typography>
			</TimetableCell>
		</Box>
	);
};