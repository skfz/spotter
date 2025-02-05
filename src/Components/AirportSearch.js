import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AirportSearch ({ location, setLocation, label }) {
    
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

        if (inputValue.length < 3) {
            return;
        }

        const fetchData = async() => {
            const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${inputValue}&locale=en-US`;
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
                if (result.data && result.data.length > 0) {
                    setOptions(result.data.map((item) => ({
                        title: item.presentation.suggestionTitle,
                        skyId: item.skyId,
                        entityId: item.entityId
                    })));
                }
            } catch (error) {
                console.error(error);
            }
        }

        const timer = setTimeout(fetchData, 200);

        return () => clearTimeout(timer);

    }, [inputValue])

    return <Autocomplete
            sx={{ width: '24%' }}
            options={options}
            isOptionEqualToValue={(option, value) => option.skyId === value.skyId}
            value={location}
            onChange={(event, newValue) => setLocation(newValue)}
            onInputChange={(event, newValue) => setInputValue(newValue)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                />      
            )}
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1" fontWeight="bold">{option.title}</Typography>
                </Box>
            )}
        />

    
}