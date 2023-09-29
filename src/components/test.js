import React from "react";
   class TimeFormatter extends React.Component{
    formatSec(second){
        let date = new Date(null);
        let date2 = new Date();
        console.log(date2.toISOString())
        date.setSeconds(second);
        return date.toISOString().substr(11,5);
    }
    render(){
        const second = 123244;
        let formated = this.formatSec(second);
        console.log(formated)
        return <p>{formated}</p>
    }
   }
    
  export default TimeFormatter