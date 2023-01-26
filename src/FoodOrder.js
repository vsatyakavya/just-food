import React ,{Fragment, useState} from 'react';
import "./FoodOrder.css";
import {useContext} from 'react';
import { foodItemsContext } from './App';
import ErrorFunctionalBoundary from "./ErrorFunctionalBoundary";

const FoodOrder = (props) => {
 const selectedFood = props?.food;
 const [quantity, setQuantity] = useState(1);
 const [totalAmount, setTotalAmount] = useState(selectedFood.price);
 const [isOrdered, setIsOrdered] = useState(false);
 const menuItems = useContext(foodItemsContext);
 const [isErrorCatched, setIsErrorCatched] = useState(false);
const handleQuantityChange = (event) => {
 try{
      setQuantity(event.target.value);
    setTotalAmount(selectedFood.price * event.target.value);
    console.table(selectedFood) //it displays object data in table format in console

  }
  catch{
    setIsErrorCatched(true);
  }


}

const handleClick = ()=>{
    setIsOrdered(true);
    menuItems.map((item) => {
      if(item.id === selectedFood.id){
        item.quantity = item.quantity - quantity;
      }
    });
  }
 return(
     <Fragment>
       {!isErrorCatched && (
         <Fragment>
         <h4 className='selFoodTitle'>{selectedFood.name}</h4>
         <img className='selFoodImg' alt="foodpics" src={require(`./images/${selectedFood.image}`)} />
         <ul className='ulFoodDetails'>
         <li>
          <p className="selFoodDesc">{selectedFood.desc}</p>
        </li>
        <li>
          <p className="selFoodPrice">{totalAmount}$</p>
        </li>
        <li className="selQuantity">
          <label>Quantity</label>
          <input
            type="number"
            defaultValue={1}
            className="quantity"
            min="1"
            max="10"
            onChange={handleQuantityChange}
          />
        </li>
        <li className="liDetails">
          <input
            type="text"
            className="inputFields"
            id="name"
            name="name"
            placeholder="Your Name"
          />
        </li>
        <li>
          <input
            type="text"
            className="inputFields"
            id="mobile"
            name="mobile"
            placeholder="Your mobile number"
          />
        </li>
        <li>
            <button className="btn btnOrder" onClick={handleClick}>
              Place the Order
            </button>
            <button className="btn btnReturnMenu" onClick={props.returnToMenu}>
              Return to Menu
            </button>            
        </li>
        {isOrdered && (
          <li className="liMessage">
            <label>
              Order Submitted! You will receive an SMS to once ready for pickup.
            </label>
          </li>
        )}
      </ul>
      </Fragment>
       )}
       {/* add parantheses to handleQuantityChange in line 57, to see the check back message */}
       {isErrorCatched && <ErrorFunctionalBoundary />}

     </Fragment>
 )}

export default FoodOrder