import { Avatar, TableContainer, TableBody, TableRow, Typography, Paper, TableCell, Table } from "@mui/material";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

export default function FlightList({ flightsData }) {
    
    dayjs.extend(advancedFormat);
    dayjs.extend(utc);
    dayjs.extend(duration)
    
    const flights = flightsData?.itineraries;

    const formatDate = (dateString) => {
        return dayjs.utc(dateString).format('ddd, MMM DD h:mm A');
    }

    function formatDuration(minutes) {
        const time = dayjs.duration(minutes, "minutes");
        return `${time.hours()}h ${time.minutes()}m`;
    }

    return (
            <>
            {flights && flights.length > 0 && flights.map((flight, index) => {

                return <TableContainer component={Paper} sx={{ marginBottom: 4, marginTop: 4 }} key={index}>
                <Table>
                    <TableBody sx={{ width: '100%' }}>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography fontWeight="bold">{flight.legs[0].origin.city} to {flight.legs[0].destination.city}</Typography>
                            </TableCell>
                            <TableCell  align="center">
                                <Typography fontWeight="bold">{flight.price.formatted}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <Avatar sx={{ margin: '0 auto' }} variant="square" alt="carrier_logo" src={flight.legs[0].carriers.marketing[0].logoUrl} loading="lazy" />
                                <Typography>{flight.legs[0].carriers.marketing[0].name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{formatDate(flight.legs[0].departure)} - {formatDate(flight.legs[0].arrival)}</Typography>
                                <Typography>{formatDuration(flight.legs[0].durationInMinutes)}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{flight.legs[0].stopCount === 0 ? 'Nonstop' : `${flight.legs[0].stopCount} stop`}</Typography>
                            </TableCell>
                        </TableRow>
                        {flight?.legs[1] && <><TableRow>
                            <TableCell colSpan={3}>
                                <Typography fontWeight="bold">{flight.legs[1].origin.city} to {flight.legs[1].destination.city}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <Avatar sx={{ margin: '0 auto' }} variant="square" alt="carrier_logo" src={flight.legs[1].carriers.marketing[0].logoUrl} loading="lazy" />
                                <Typography>{flight.legs[1].carriers.marketing[0].name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{formatDate(flight.legs[1].departure)} - {formatDate(flight.legs[1].arrival)}</Typography>
                                <Typography>{formatDuration(flight.legs[1].durationInMinutes)}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography>{flight.legs[1].stopCount === 0 ? 'Nonstop' : `${flight.legs[1].stopCount} stop`}</Typography>
                            </TableCell>
                    </TableRow></>}
                    </TableBody>
                </Table>
                </TableContainer>
            })}
        </>
    )
}