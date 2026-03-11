import { Link } from "react-router-dom";
import { Menu } from "../typings/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    menu: Menu
}
    
const MenuCard = ({menu}: Props) => {
    return(
        <Link
            key={menu.id}
            to='' 
            style= {{textDecoration: 'none', fontWeight: 'bold',fontSize: '2rem'}}  
        >
            <Card sx={{width: 350}}>
                <CardMedia
                    sx= {{height: 140, width: 40, textDecoration: 'none', variant: 'h4'}}

                />
                <CardContent>
                    <Typography sx={{fontWeight: 'bold', fontSize: '2rem'}}>{menu.name}</Typography>
                    <Typography>{menu.description}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default MenuCard;
