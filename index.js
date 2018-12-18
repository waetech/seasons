import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


// //functional component
// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         (position) => console.log(position),
//         (err) => console.log(err)

//     );

//     return(
//     <div>Latitude: </div>
//     );
// };

//class component
class App extends React.Component {
    constructor(props){
        super(props);
        //THIS IS THE ONLY TIME we do direct assignment 
        //to this.state
        this.state = {lat: null, errorMessage: ''};
    }

    state = { lat: null, errorMessage: ''};
//////lifecycle methods ////////////
//Good place to do data loading, invoked one time
    componentDidMount(){
        //update state use this.setState
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({errorMessage: err.message})
              //do not do this! direct assignment
              //this.state.lat = position.coords.latitude
            );
     }
//Called everytime a component is updated - example when user enters some input text
//Good place to do more data loading when state/props change
    componentDidUpdate(){
        console.log('My component was just updated - it rerendered!');
    }

    componentWillUnmount(){
        console.log('Good for clean up');
    }
    
//helper method
rendercontent(){
    if(this.state.errorMessage && !this.state.lat){
        return <div>Error: {this.state.errorMessage}</div>
    }
    if(!this.state.errorMessage && this.state.lat){
        return <SeasonDisplay lat={this.state.lat} />
    }
    return <Spinner message="Please accept location request" />;
}

//React says we have to define render!!
    render() {
        return (
            <div className="border red">
            {this.rendercontent()}
            </div>
        );
                    
    }
}




ReactDOM.render(<App/>, document.querySelector('#root'));
