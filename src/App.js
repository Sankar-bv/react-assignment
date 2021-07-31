import { useEffect, useState } from 'react';
import Jsondata from './json input.json';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import Items from './Items';
import Item from './Item';
import Purchase from './Purchase';

function App() {
  const [response, setResponse] = useState([]);
  const [itemdata, setItemData] = useState({});
  const [quantity, setQuantity] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [searchField, setSearchField] = useState();

  useEffect(() => {
    setResponse(Jsondata);
    setFilteredResponse(Jsondata);
    //setResponseChange(Jsondata);
    //console.log(Jsondata);
  }, [])

  const item = (data) => {
    console.log(data);
    setItemData(data);
    setFilteredResponse(response);
  }

  const iterate = () => {
    if (filteredResponse.length > 0)
      return filteredResponse.map((user, i) => {
        return <Items key={i} user={user} data={item} />
      })
    else
      return <div>No Items Available</div>
  }

  const addedQuantity = (data) => {
    setQuantity(data);
  }

  const amount = (data) => {
    setTotalAmount(data);
  }

  const search = (event) => {
    var input = event.target.value;
    // responseChange = response.filter(user => {
    //   // if(user.name.includes(input))
    //     return user.name.includes(input);
    // })
    setFilteredResponse(response.filter(user => {
      return user.name.toLowerCase().includes(input.toLowerCase());
    }));
    console.log(filteredResponse);
    //   for (var i=0; i < myArray.length; i++) {
    //     if (myArray[i].name === nameKey) {
    //       console.log(nameKey);
    //         return myArray[i];
    //     }
    // }
  }

  const load = () => {
    setFilteredResponse(response);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() =>
          <div className="App">
            <input style={{ margin: '20px 0px 20px 0px' }} type="text" placeholder="Item" onChange={search}></input>
            <br />
            {iterate()}
            {/* <div>{JSON.stringify(response)}</div> */}
            {/* <div>{JSON.stringify(itemdata)}</div> */}
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
    // <div className="App">
    //   {iterate}
    //   <div>{JSON.stringify(response)}</div>
    //   <div>{JSON.stringify(itemdata)}</div>
    //</div>
  );
}

export default App;
