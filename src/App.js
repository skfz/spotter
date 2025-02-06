import { Container, Typography, Button, Box, Select, MenuItem, Grid2 } from "@mui/material";
import { useState } from "react";
import PersonsModal from "./Components/PersonsModal";
import AirportSearch from "./Components/AirportSearch";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import FlightList from "./Components/FlightList";

function App() {

    const [tripType, setTripType] = useState('round_trip');
    const [seating, setSeating] = useState('economy');
    const [persons, setPersons] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [flightsData, setFlightsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFlightSearch = async() => {
        
        setLoading(true);
        
        const from_date = dayjs(fromDate).format('YYYY-MM-DD');
        const to_date = (tripType === 'round_trip') ? dayjs(toDate).format('YYYY-MM-DD') : '';
        const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${origin.skyId}&destinationSkyId=${destination.skyId}
        &originEntityId=${origin.entityId}&destinationEntityId=${destination.entityId}&date=${from_date}&returnDate=${to_date}&cabinClass=${seating}&adults=${persons.adults}
        &childrens=${persons.children}&infants=${persons.infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4467bc502fmsh10af65d6033c2f2p10c22ejsnba125264a1fb',
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.data) {
                setFlightsData(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container sx={{ backgroundColor: "#fff", marginTop: "50px", textAlign: "center" }}>
            <Typography variant="h2" gutterBottom>Flights</Typography>
            <Box sx={{ border: 1, borderColor: "text.disabled", borderRadius: 1, boxShadow: 2, padding: "20px" }}>
                <Grid2 container spacing={4}>
                    <Grid2 size={{md: 2, xs: 12}}>
                        <Select
                            sx={{ width: '100%' }}
                            id="sp-trip-type"
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}>
                                <MenuItem value="round_trip">Round Trip</MenuItem>
                                <MenuItem value="one_way">One Way</MenuItem>
                        </Select>
                    </Grid2>
                    <Grid2 size={{md: 2, xs: 12}}>
                        <PersonsModal persons={persons} setPersons={setPersons} />
                    </Grid2>
                    <Grid2 size={{md: 2, xs: 12}}>
                        <Select
                            sx={{ width: '100%' }}
                            id="sp-seating"
                            value={seating}
                            onChange={(e) => setSeating(e.target.value)}>
                                <MenuItem value="economy">Economy</MenuItem>
                                <MenuItem value="premium_economy">Premium Economy</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                                <MenuItem value="first">First</MenuItem>
                        </Select>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={4} sx={{ marginTop: 8}}>
                    <Grid2 size={{md:3, xs: 12}}>
                        <AirportSearch location={origin} setLocation={setOrigin} label="Origin" />
                    </Grid2>
                    <Grid2 size={{md:3, xs: 12}}>
                        <AirportSearch location={destination} setLocation={setDestination} label="Destination" />
                    </Grid2>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid2 size={{md:3, xs: 12}}>
                            <DatePicker minDate={dayjs()} label="Depart Date" value={fromDate} onChange={(newDate) => {
                                setFromDate(newDate);
                                if (newDate.isAfter(dayjs(toDate))) {
                                    setToDate(newDate)
                                }
                            }} 
                                slotProps={{
                                    textField: {
                                    helperText: 'MM-DD-YYYY',
                                    },
                                }} />
                        </Grid2>
                        <Grid2 size={{md:3, xs: 12}}>
                            <DatePicker disabled={tripType === 'one_way'} minDate={fromDate} label="Return Date" value={toDate} onChange={(newDate) => setToDate(newDate)} 
                                slotProps={{
                                    textField: {
                                    helperText: 'MM-DD-YYYY',
                                    },
                                }} />
                        </Grid2>
                    </LocalizationProvider>
                    
                </Grid2>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <Button loading={loading} variant="contained" disabled={origin === null || destination == null} size="large" onClick={handleFlightSearch}>Submit</Button>
                </Box>
                
            </Box>
            <FlightList flightsData={flightsData} />
        </Container>
    )
}

export default App;
