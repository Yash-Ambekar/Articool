import Moment from "react-moment";

const momentDate = (props) => {
    
    const date =props.date;
    // const newDate =new Date (date.seconds*1000);

    return ( 
        <Moment format={props.format}>{date}</Moment>
     );
}
 
export default momentDate;