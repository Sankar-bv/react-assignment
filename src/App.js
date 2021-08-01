import { useEffect, useState } from 'react';
import Jsondata from './input.json';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import Items from './Items/Items';
import Item from './Item/Item';
import Purchase from './Purchase/Purchase';

function App() {
  const response = Jsondata;
  const [itemdata, setItemData] = useState({});
  const [quantity, setQuantity] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [filteredResponse, setFilteredResponse] = useState([]);

  useEffect(() => {
    //setResponse(Jsondata);
    setFilteredResponse(Jsondata);
  }, [])

  const item = (data) => {
    console.log(data);
    setItemData(data);
    setFilteredResponse(response);
  }

  const iterate = () => {
    if (filteredResponse.length > 0)
      return filteredResponse.map((user, i) => {
        return <Items key={i} user={user} item={item} />
      })
    else
      return <div className='noItem'>No Items Available</div>
  }

  const addedQuantity = (data) => {
    setQuantity(data);
  }

  const amount = (data) => {
    setTotalAmount(data);
  }

  const search = (event) => {
    var input = event.target.value;
    setFilteredResponse(response.filter(user => {
      return user.name.toLowerCase().includes(input.toLowerCase());
    }));
    console.log(filteredResponse);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() =>
          <div className="App">
            <input style={{ margin: '20px 0px 20px 0px' }} type="text" placeholder="Item" onChange={search}></input>
            <br />
            {iterate()}
            </div>} />
        <Route exact path="/:id" render={() =>
          <div>
            <Item itemdata={itemdata} response={filteredResponse} addedQuantity={addedQuantity} amount={amount} />
          </div>
        } />
        <Route path={`/${itemdata.link}/purchase`} render={() =>
          <Purchase quantity={quantity} amount={totalAmount} imageURL={itemdata.imageURL} />
        } />
      </Switch>
    </Router>

  );
}

export default App;
