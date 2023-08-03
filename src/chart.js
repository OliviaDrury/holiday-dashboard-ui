import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Chart() {
    const [bookingTimes, setBookingTimes] = useState([]);

    useEffect(() => {
        fetch('/whenBookingsAreMade')
            .then(response => response.json())
            .then(bookingTimes => setBookingTimes(bookingTimes))
            .catch(error => console.error(error));
    }, []);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>When Bookings Are Made</Typography>
            <ResponsiveContainer>
                {bookingTimes.length === 0 ? (
                    <PieChart width={800} height={400}>
                        <Pie
                            data={bookingTimes}
                            cx={120}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {bookingTimes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Pie
                            data={bookingTimes}
                            cx={420}
                            cy={200}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {bookingTimes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                ) : (
                    <Typography component="h4" variant="h6" color="secondary" gutterBottom>No bookings available</Typography>
                )}
            </ResponsiveContainer>
        </React.Fragment>
    );
}
