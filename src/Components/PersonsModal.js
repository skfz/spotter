import { Box, Popover, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";

export default function PersonsModal({ persons, setPersons }) {

    const [anchorEl, setAnchorEl] = useState(false);
    
    const open = Boolean(anchorEl);
    const id = open ? 'sp-popover' : undefined;

    const CounterButton = styled(Button) (({ theme, disabled=false }) => ({
        backgroundColor: disabled ? theme.palette.grey[200] : theme.palette.primary.light,
        color: disabled ? theme.palette.grey[800] : theme.palette.info.dark,
    }))

    const BoxOuter = styled(Box) (() => ({
        display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'
    }))

    const BoxInner = styled(Box) (() => ({
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' 
    }))

    const updateCount = (type, count) => {
        setPersons((prev) => ({
            ...prev,
            [type]: prev[type] + count
        }));
    }

    return <>
        <Button size="large" sx={{ width: '100%', padding: '14px' }} aria-describedby={id} variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)} >Persons</Button>
        <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}>
            <Box sx={{ display: 'flex', flexDirection:'column', padding: '10px', gap: 2 }}>
                {Object.keys(persons).map((type, index) => {
                    const min = type === 'adults' ? 1 : 0;
                    let label = type.replace(/ /g,"_");
                    label = label.charAt(0).toUpperCase() + label.slice(1);
                    return <BoxOuter key={`${type}_${index}`}>
                        <Box sx={{ width: '50%' }}>
                            <Typography>{label}</Typography>
                        </Box>
                        <BoxInner>
                            <CounterButton disabled={persons[type] === min} onClick={() => updateCount(type, -1)}>-</CounterButton>
                            <Typography sx={{ padding: 1 }}>{persons[type]}</Typography>
                            <CounterButton onClick={() => updateCount(type, 1)}>+</CounterButton>
                        </BoxInner>
                    </BoxOuter>
                })}
            </Box>
        </Popover>
    </>
}