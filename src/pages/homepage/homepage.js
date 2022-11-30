import React, {useState, useEffect} from "react";
import Moment from "react-moment";
import toast, { Toaster } from 'react-hot-toast';
import moment from "moment";
import { Link } from "react-router-dom";
import style from './homepage.module.css'

export default function (props) {

    useEffect(() => {
        document.body.classList.add(style.home);
    
        return function cleanup() {
          document.body.classList.remove(style.home);
        };
      }, []);

    const [yourName, nameChange] = useState('XXXX')
    const [yourDate, dateChange] = useState('DD')
    const [yourMonth, monthChange] = useState('MM')
    const [yourYear, yearChange] = useState('YYYY')
    const [isValid, validChange] = useState(false)

    const currentDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');

    const nameHandler = (e) => {
       const theName = e.target.value;
       return nameChange(theName)
    }

    const dateHandler =(e) => {
        const theDate = e.target.value
        return dateChange(theDate)
    }

    const monthHandler = (e) => {
        const theMonth = e.target.value
        return monthChange(theMonth)
    }

    const yearHandler = (e) => {
        const theYear = e.target.value
        return yearChange(theYear)
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
      if (+yourDate > 31 || +yourMonth > 12) {
        return toast.error('Please enter valid date')
      }
      else {
       const validDate = moment(currentDate).isSame(`${yourYear}/${yourMonth}/${yourDate}`)
        if (validDate === true) {
            localStorage.setItem('name', yourName)
            return validChange(true)
        }
        else {
            return toast('Please come back during your birthday!', {
                icon: '🎁',
              });
        }
      }
    }

    return (
        <>
        <Toaster/>
        <div className={style.container}>
        <h3>Plese write your name</h3>
            <input onChange={nameHandler} type='text' placeholder='Your Name' id='month'></input>
        </div>
        <div className={style.container}>
        <h3>Your birth date with current year ex. 18-11-2022</h3>
        <input onChange={dateHandler} type='text' placeholder='DD' id='date'></input>
        <input onChange={monthHandler} type='text' placeholder='MM' id='month'></input>
        <input onChange={yearHandler} type='text' placeholder='YYYY' id='year'></input>
        </div>
        <div className={style.container}>
        <button className={style.btn} onClick={submitHandler}>Check</button>
        <h2>HELLO {yourName.toUpperCase()} WE WISH YOU HAPPY BIRTHDAY ON {yourDate}-{yourMonth}-{yourYear} </h2>
        {!isValid? '' : <Link to='/app'><button>Go to SpinWheel!</button></Link>}
        </div>
        </>
    )
}