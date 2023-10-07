import {CssBaseline} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home";
import {TimetablePage} from "./pages/TimetablePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/timetable",
        element: <TimetablePage/>
    }
]);

function App() {
    return (
        <>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
