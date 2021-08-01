import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';
import './Purchase.css';

const Purchase = (props) => {
    const { name, quantity, category } = props.quantity;
    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(false);
    const buttonText = useRef("Buy Now");

    const openBox = () => setOpen(true);
    const closeBox = () => setOpen(false);
    const buttontatus = () => {
        setDisable(true);
        buttonText.current = "Order has placed";
        //document.getElementById('buy').innerHTML = <span>"Order Has Placed"</span>;
    }

    return <div className="purchaseItem">
        <Link to="/" >Go to Homepage</Link>
        <br />
        <h2>Order Review</h2>
        <img src={props.imageURL} alt={`Noimage available for ${name}`} />
        <div>Name : {name}</div>
        <div>Price : Rs {props.amount}</div>
        <div>Quantity : {quantity}</div>
        <div>Category : {category}</div>
        <Button id='buy' onClick={()=>{openBox(); buttontatus();}} disabled={disable}>{buttonText.current}</Button>
        <Dialog open={open} onClose={closeBox} >
            <DialogTitle>Order has been Placed</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={props.imageURL} alt={`Noimage available for ${name}`} />
                    <span>Name : {name}<br/></span>
                    <span>Price : {props.amount}<br/></span>
                    <span>Quantity : {quantity}<br/></span>
                    <span>Category : {category}<br/></span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to='/'>
                    <Button>Go to Homepage</Button>
                </Link>
            </DialogActions>
        </Dialog>
    </div>
}

export default Purchase;