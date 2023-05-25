import React from "react";
import sunny from '../assets/icons/sunny.svg';
import {useState} from 'react'

const Total: React.FC =  () => {
    const [totalPage, setTotalPage] = useState('cities')
    return(
        <>
            <div className={(totalPage === 'Cities') ? 'total total-padding0' : 'total'}>
                <div className="total_forecast">
                    <div className="total_city">
                        <h2>Madrid</h2>
                        Chanse of rain: 0%
                    </div>
                    <div className="total_temperature">31 &#176;</div>
                </div>
                <img src={sunny} alt="status"/>
            </div>
        </>
    )
}

export default Total