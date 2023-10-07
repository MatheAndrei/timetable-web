import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {readTimetable, Timetable} from "../components/timetable/Timetable";
import {TimetableDetails} from "../components/timetable/TimetableDetails";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const TimetablePage = () => {
	const {state} = useLocation();
	const timetable_path: string = state.timetable_path;

	const [loading, setLoading] = useState<boolean>(true);
	const [timetable, setTimetable] = useState<TimetableDetails>({name: "", days: [], path: ""});

	useEffect(() => {
		readTimetable(timetable_path)
			.then(timetable => {
				setTimetable(timetable);
				setLoading(false);
			})
			.catch(error => console.log(error));
	}, []);

	return (
		<>
			{loading && (
				<Box sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}>
					<CircularProgress size={"4em"}/>
				</Box>
			)}
			{!loading && (
				<Container maxWidth={"xl"} sx={{mt: "3rem", mb: "3rem"}}>
					<Typography variant={"h4"} textAlign={"center"}>Timetable: {timetable.name}</Typography>
					<br/>
					<Timetable timetable={timetable}/>
				</Container>
			)}
		</>
	);
};