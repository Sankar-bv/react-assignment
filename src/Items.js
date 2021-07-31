import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Images from './Image.json'
import './Items.css';

const Items = (props) => {

    const imageURL = useRef(null);
    const link = useRef(null);

    const URL = () => {
        switch (props.user.name) {
            case 'Potato':
                imageURL.current = Images.Potato;
                link.current = "potato";
                break;
            case 'Banana':
                imageURL.current = Images.Banana;
                link.current = "banana";
                break;
            case 'Drumsticks':
                imageURL.current = Images.Drumsticks;
                link.current = "drumsticks";
                break;
            case 'Orange':
                imageURL.current = Images.Orange;
                link.current = "orange";
                break;
            default:
                break;
        }
        console.log(imageURL.current);
        return {imageURL : imageURL.current, link : link.current};
    }

    const click = () => {
        console.log(item);
        props.data(item);
    }

    const item = URL();

    const stock = () => {
        if(props.user.available === 0)
            return "Outofstock";
        else
            return "Instock";
    }

    return (
        <Link to={item.link} onClick={click}>
            <div id='box' className='grow'>
                <img style={{ height: '200px', width: '200px' }} src={item.imageURL} alt='noImage' />
                <div>{props.user.name}</div>
                <div>{stock()}</div>
            </div>
        </Link>
    )
}

export default Items;