import "./App.css";

import { useEffect, useState } from "react";

import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";

const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;
const user = tele.initDataUnsafe?.user
const {hash, auth_date} = tele.initDataUnsafe ?? {hash: '', auth_date: null}

function App() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        tele.ready();
        console.log('annnnnnnnnnn user', user)
        console.log('annnnnnnnnnn', tele.colorScheme)
    });

    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }]);
        }
    };

    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
                )
            );
        }
    };

    const onCheckout = () => {
        tele.MainButton.text = "Pay :)";
        tele.MainButton.show();
    };
    // const linkToMarketPlace = () => {
    //   tele.openMiniApp({
    //     url: 'https://testnet.nemoverse.io',
    //     data: {
    //       user: 'test url'
    //     }
    //   })
    // }

    return (<>
        <h1 className="heading" > Order Food </h1> <div onClick={
            () => {
                tele.sendData(JSON.stringify({ data: 'test2' }))
            }
        }>
            <p>Info</p>
            <p>ID: {user.id}</p>
            <p>Last Name: {user.last_name}</p>
            <p>FirstName: {user.first_name}</p>
            <p>Username: {user.username}</p>
            <p>Hash: {hash}</p>
            <p>AuthDate: {auth_date}</p>
            {/* {hash}
            {authDate} */}
        </div>
        {/* <Cart
            cartItems={cartItems}
            onCheckout={onCheckout}
        /> */}
        <div className="cards__container" > {
            foods.map((food) => {
                return (<
                    Card food={food}
                    key={food.id}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
                );
            })
        } </div> </>
    );
}

export default App;