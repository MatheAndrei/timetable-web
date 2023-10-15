import {Accordion, AccordionDetails, AccordionSummary, Box, Snackbar, SxProps, Typography} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {labColor, lectureColor, seminarColor} from "../timetable/TimetableConstants";

const accordingStyle: SxProps = {
	display: "flex",
	flexDirection: "column-reverse",
}

export const Legend = () => {
	return (
		<Snackbar
			open={true}
			anchorOrigin={{vertical: "bottom", horizontal: "right"}}
		>
			<Accordion sx={accordingStyle} disableGutters={true}>
				<AccordionSummary expandIcon={<ExpandLessIcon/>}>
					<Typography variant={"body1"}>Legend</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{display: "flex", gap: ".5em"}}>
						<Box sx={{width: "1.5em", height: "1.5em", backgroundColor: lectureColor}}/>
						<Typography variant={"subtitle2"} lineHeight={"1.8em"}>- LECTURE</Typography>
					</Box>
					<Box sx={{display: "flex", gap: ".5em"}}>
						<Box sx={{width: "1.5em", height: "1.5em", backgroundColor: seminarColor}}/>
						<Typography variant={"subtitle2"} lineHeight={"1.8em"}>- SEMINAR</Typography>
					</Box>
					<Box sx={{display: "flex", gap: ".5em"}}>
						<Box sx={{width: "1.5em", height: "1.5em", backgroundColor: labColor}}/>
						<Typography variant={"subtitle2"} lineHeight={"1.8em"}>- LAB</Typography>
					</Box>

					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L002 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L320 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L321 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L336 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L404 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>L439 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>C310 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>A2 - FSEGA</Typography>
					<Typography variant={"subtitle2"} lineHeight={"1.8em"}>2/I - Cladirea centrala (Str. Mihail Kogalniceanu 1)</Typography>
				</AccordionDetails>
			</Accordion>
		</Snackbar>
	);
};