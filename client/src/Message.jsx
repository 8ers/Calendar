import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext } from './Layout.jsx';

function Message(props) {
  const currentContext = useContext(CalendarContext);
  const [message, changeMessage] = useState('');

  // CLEAN UP RENDERING, visibly loads case 0 before rerendering
  function setMessage() {
    var message= '';
    var discounts = props.currentListing.discounts;
    var minStayLength = props.currentListing.minStayLength;

    if (discounts === undefined) {
      if (currentContext.targetState.target !== null) {
        message = `${minStayLength} night minimum stay`;
      } else {
        message = 'Enter your trip dates for accurate pricing and availability';
      }
    } else {
      switch(Object.keys(discounts).length) {
        case 1:
          if (discounts.week !== undefined) {
            message = `This host offers a ${discounts.week}% weekly discount.`;
          } else {
            message = `This host offers a ${discounts.month}% monthly discount.`;
          }
          break;
        case 2:
          message = `This host offers ${discounts.week}% off if you stay a week and a ${discounts.month}% monthly discount.`;
          break;
      };
    }
    return message;
  }

  useEffect(() => {
    var newMessage = setMessage();
    changeMessage(newMessage);
  }, [props.currentListing, currentContext.targetState.target]);

  return (
    <div id="message">
      {message}
    </div>
  );
}

export default Message;