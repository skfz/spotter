import { Container, Typography, Button, Autocomplete, Box, Select, MenuItem, FormGroup } from "@mui/material";
import { useState } from "react";
import PersonsModal from "./Components/PersonsModal";

function App() {

    const [tripType, setTripType] = useState('Round Trip');
    const [seating, setSeating] = useState('Economy');
    const [persons, setPersons] = useState({
        adults: 1,
        children: 0,
        infants_in_seat: 0,
        infants_on_lap: 0
    })

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: "#fff", marginTop: "50px", textAlign: "center", padding: "20px" }}>
            <Typography variant="h2" gutterBottom>App</Typography>
            <Box sx={{ border: 1, borderColor: "text.disabled", borderRadius: 1, boxShadow: 2, padding: "20px" }}>
                <FormGroup>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Select
                            id="sp-trip-type"
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}>
                                <MenuItem value="Round Trip">Round Trip</MenuItem>
                                <MenuItem value="One Way">One Way</MenuItem>
                        </Select>
                        <PersonsModal persons={persons} setPersons={setPersons} />
                        <Select
                            id="sp-seating"
                            value={seating}
                            onChange={(e) => setSeating(e.target.value)}>
                                <MenuItem value="Economy">Economy</MenuItem>
                                <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="First">First</MenuItem>
                        </Select>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    )
}

export default App;
