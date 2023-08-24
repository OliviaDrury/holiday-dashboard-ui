import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Chart() {
    const [bookingTimes, setBookingTimes] = useState([]);

    useEffect(() => {
        fetch('/whenBookingsAreMade')
            .then(response => response.json())
            .then(bookingData => {
                // Convert the object data into an array of objects
                const formattedData = Object.keys(bookingData).map(key => ({
                    timeOfDay: key,
                    value: bookingData[key]
                }));
                setBookingTimes(formattedData);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>When Bookings Are Made</Typography>
            <ResponsiveContainer>
                {bookingTimes.length === 0 ? (
                    <Typography component="h4" variant="h6" color="secondary" gutterBottom>No booking data available</Typography>
                ) : (
                    <PieChart width={800} height={300}>
                        <Pie
                            data={bookingTimes}
                            innerRadius={0}
                            outerRadius={80}
                            labelLine={true}
                            label={({ timeOfDay }) => timeOfDay} 
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="timeOfDay"
                        >
                            {bookingTimes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                )}
            </ResponsiveContainer>
        </React.Fragment>
    );
}
