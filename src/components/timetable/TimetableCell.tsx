import React, {forwardRef} from "react";
import {Box, SxProps} from "@mui/material";

interface TimetableCellProps {
	sx?: SxProps;
	children?: any;
}

export const TimetableCell = forwardRef((props: TimetableCellProps, ref) => {
	const children: any = props.children;
	const sx: SxProps = props.sx != undefined ? props.sx : {};

	return (
		<Box sx={sx} ref={ref}>
			{children}
		</Box>
	);
});