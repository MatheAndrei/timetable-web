import {useEffect, useState} from "react";
import {Box, CircularProgress, Container, List, ListItemButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {TimetableDetails} from "../components/timetable/TimetableDetails";
import {readTimetable} from "../components/timetable/Timetable";

const timetable_paths: string[] = [
	"./schedules/mathe.json",
	"./schedules/sonia.json"
];

export const Home = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [timetables, setTimetables] = useState<TimetableDetails[]>([]);

	useEffect(() => {
		const getTimetables = async (timetable_paths: string[]) => {
			const timetables: TimetableDetails[] = [];
			for (const path of timetable_paths) {
				const timetable: TimetableDetails = await readTimetable(path);
				timetables.push(timetable)
			}
			return timetables;
		};

		getTimetables(timetable_paths)
			.then(timetables => {
				setTimetables(timetables);
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
					<Typography variant={"h4"} textAlign={"center"}>Welcome!</Typography>
					<br/>
					<Typography variant={"h4"} textAlign={"center"}>Choose a timetable:</Typography>
					<List sx={{width: "30%", margin: "auto"}}>
						{timetables.map(timetable => (
							<ListItemButton
								key={`timetable-${timetable.name}`}
								component={Link}
								to={"/timetable"}
								state={{timetable_path: timetable.path}}
								sx={{
									justifyContent: "center",
									backgroundColor: "#001427",
									color: "#fff",
									marginBottom: "2px",
									"&:hover": {
										backgroundColor: "#052645"
									}
								}}
							>
								<Typography textAlign={"center"}>{timetable.name}</Typography>
							</ListItemButton>
						))}
					</List>
				</Container>
			)}
		</>
	);
};