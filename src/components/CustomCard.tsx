import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import { CustomCardProps } from "../@types/props"

//to make CustomCardProps properties optional, you can use React.FC<Partial<CustomCardProps>>

const CustomCard: React.FC<CustomCardProps> = ({name, description, setShow, handlePush}) => {
    return(
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => setShow?.()} variant="outlined">Edit</Button>
                <Button onClick={handlePush} color="error" variant="contained">Delete</Button>
            </CardActions>
        </Card>
    )
}

export default CustomCard