import style from "./about.module.scss";

import { useState } from "react";
import Iframe from 'react-iframe'

import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";

function About() {
    let [inputValue, setInputValue] = useState("");

  return (
    <div className={style.about}>
        <p className={style.topic}>Who we are</p>
        <p className={style.description}>
            We are online shop of books where you can find thousands books for any taste.
            Just type the title of the book in search bar on the catalog page or header, find any book you like, put this one to the cart and make the order.
        </p>
        <p className={style.topic}>Our objective</p>
        <p className={style.description}>
            The main task of our platform is to make the world of books accessible for everyone who want to.
            Nowadays life of many people is spent at a fast pace. Big cities demand a lot of our energy and we have not got enough time just to go to the library or some bookshop.
            However we always have everywhere our smartphones or other gadgets.
            So if you really want to broaden your outlook or get acquainted with world masterpieces of literature, to get distracted or relax during some exciting history you have got the right place!
        </p>
        <div className={style.benefit}>
            <div>
                <i className="fa-solid fa-brain"></i>
                <p className={style.title}>Getting smarter every day</p>
                <p className={style.benefitDescription}>The more a person reads the more he becomes erudite and interesting to others</p>
            </div>
            <div>
                <i className="fa-solid fa-location-dot"></i>
                <p className={style.title}>Availability</p>
                <p className={style.benefitDescription}>Our online shop is always in you pocket</p>
            </div>
            <div>
                <i className="fa-solid fa-feather-pointed"></i>
                <p className={style.title}>Find your favorite author</p>
                <p className={style.benefitDescription}>There are a lot of writers who can really inspire you</p>
            </div>
        </div>
        <div className={style.shopContact}>
            <p className={style.heading}>Our Contacts</p>
            <div className={style.shopContacts}>
                <div>
                    <p>Office contacts:</p>
                    <p>Address:<br />
                        Mitik St, Cambridge Bay, NU X0C 0C1, Canada
                    </p>
                    <p>Tel: 123-456-7890</p>
                    <p>Email: bookhunter-office@gmail.com</p>
                </div>
                <div>
                    <p>Customer service:</p>
                    <p>Tel: 123-456-4308</p>
                    <p>Email: bookhunter-customer@gmail.com</p>
                    <p>Our Networks:
                        <a href="https://www.facebook.com/" target="_blank"><FaFacebookF /></a>
                        <a href="https://twitter.com/explore" target="_blank"><FaTwitter /></a>
                        <a href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>
                        <a href="https://www.pinterest.com/" target="_blank"><FaPinterest /></a>
                    </p>
                </div>
            </div>
            <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355.5559054507873!2d-105.0556661706994!3d69.1168494771844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa1f15baa7f928099!2zNjnCsDA3JzAwLjciTiAxMDXCsDAzJzE4LjQiVw!5e0!3m2!1sen!2sru!4v1655061524597!5m2!1sen!2sru"
            className={style.map}/>
        </div>
        <div className={style.malling}>
            <p>
                Subscribe to know about our last events
            </p>
            <form onSubmit={(event) => !inputValue && event.preventDefault()}>
                <input type="email" placeholder="Type your email" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
                <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Subscribe</span>
                </button>
            </form>
        </div>
    </div>
  );
}

export default About;