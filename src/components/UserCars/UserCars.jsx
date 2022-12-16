import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UserCars = ({car}) => {

  const deleteCar = async () => {
    // const responce = await axios.post('http://localhost:5000/api/car/delete', {
    //     car: car.id,
    // })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={car.name}
        subheader={car.time}
      />
      <CardMedia
        component="img"
        height="194"
        image={car.image}
        alt={car.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {car.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="gelete from favorites" onClick={deleteCar}>
          <DeleteIcon color="primary"  />
        </IconButton>     
      </CardActions>
    </Card>
  );
}

export default UserCars