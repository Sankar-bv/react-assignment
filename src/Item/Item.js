import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Item.css'

const Item = (props) => {
    const {id} = useParams();
    var editedresponse = [];
    const [totalAmount, setTotalAmount] = useState(null);

    const stock = () => {
        for (var i = 0; i < props.response.length; i++) {
            if (props.response[i].name.toLowerCase() === id) {
                editedresponse = props.response[i];
                console.log(editedresponse);
                if (props.response[i].available === 0)
                    return "Outofstock";
                else
                    return "Instock";
            }
        }
    }

    const stockValue = stock();

    const increment = () => {
        var element = document.getElementById('quantity');
        if(parseInt(element.value)<20)
            element.value = parseInt(element.value)+1;
    }

    const decrement = () => {
        var element = document.getElementById('quantity');
        if(parseInt(element.value)>1)
            element.value = parseInt(element.value)-1;
    }

    const buttonStatus = () => {
        if(stockValue === 'Outofstock')
            return true;
    }

    const buttonDisable = () => {
        if (document.getElementById('quantity').value > 20 || stockValue === 'Outofstock')
            document.getElementById('cart').setAttribute('disabled', 'disabled');
        else
            document.getElementById('cart').removeAttribute('disabled');
    }

    const errorMessage = () => {
        if (document.getElementById('quantity').value <= 20)
            document.querySelector("div.errormessage").style.display = "none";
        else
            document.querySelector("div.errormessage").style.display = "revert"
    }

    const quantity = () => {
        editedresponse.quantity = document.getElementById('quantity').value;
        console.log(editedresponse);
        props.addedQuantity(editedresponse);
    }

    const total = () => {
        console.log(document.getElementById('quantity').value);
        setTotalAmount(editedresponse.price*document.getElementById('quantity').value);
        console.log(totalAmount);
    }

    const defaultNumber = () => {
        let inputValue = document.getElementById('quantity').value;
        if (inputValue === '' || inputValue === '0') {
            document.getElementById('quantity').value = 1;
            setTotalAmount(editedresponse.price);
        }
    }

    const amount = () => {
        if(totalAmount == null) {
            props.amount(editedresponse.price);
            return editedresponse.price;  }
        else {
            props.amount(totalAmount);
            return totalAmount; }
    }

    return (
        <div className='item'>
            <Link to="/" >Go to Homepage</Link>
            <br/>
            <img src={props.itemdata.imageURL} alt='noImage' />
            <div>{props.itemdata.link}</div>
            <div>{stockValue}</div>
            <button onClick={()=>{decrement(); total();}}>-</button>
            {/* <span id='quantity'>1</span> */}
            <input style={{margin: '5px'}} id ='quantity' type="number" defaultValue="1" min="1" max="20" onChange={()=>{total(); errorMessage(); buttonDisable();}} onBlur={defaultNumber}></input>
            <button onClick={()=>{increment(); total();}}>+</button>
            <div className='errormessage'>Allowed quantity upto 20</div>
            <div>Price : Rs {editedresponse.price}</div>
            <div >Total Price : Rs {amount()}</div>
            <br/>
            <Link to={`/${props.itemdata.link}/purchase`}>
                <button id='cart' disabled={buttonStatus()} onClick={quantity}>Add To Cart</button>
            </Link>
        </div>
    )
}

export default Item;