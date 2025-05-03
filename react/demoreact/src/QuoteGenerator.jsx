// Import React and Component class from the react package
import React, { Component } from 'react';

// Export the QuoteGenerator class so it can be used in other files
export default class QuoteGenerator extends Component {
  
  // Constructor is called when the component is first created
  constructor() {
    super(); // Calls the parent class (Component) constructor

    // Initialize state with default quote, image, and position values
    this.state = {
      quote: 'Click the button to get inspired!', // default quote text
      image: 'https://media.istockphoto.com/id/1681619429/photo/silhouette-of-positive-man-celebrating-on-mountain-top-with-arms-raised-up-silhouette-of-man.jpg?s=612x612&w=0&k=20&c=qPt67d0B535UZrtk7kP3N_T7uZ-Nl_DdxB-xZIIhLRw=', // default background image
      top: '50%', // initial vertical position (center)
      left: '50%', // initial horizontal position (center)
    };
  }

  // Array of quotes with corresponding images
  quotes = [
    {
      text: "Believe in yourself and all that you are.",
      image: "https://media.istockphoto.com/id/502426696/photo/beautiful-seascape.jpg?s=612x612&w=0&k=20&c=r0JGQkPUlAmKH2fxU0aZ05UcFUbKAplBrbkPuwhJYlQ="
    },
    {
      text: "Peace comes from within. Do not seek it without. – Buddha",
      image: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      text: "The best way to get started is to quit talking and begin doing.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRzdb0J4ofjFFCQ8VXBiajIzRG88vnoGWSo0V6QSORIHC_oew0u9PSLAvWGNdn9oCdeU&usqp=CAU"
    },
    {
      text: "Breathe in peace, breathe out stress.",
      image: "https://static.vecteezy.com/system/resources/thumbnails/046/122/628/small_2x/tranquil-beach-with-turquoise-waves-and-clouds-calm-seashore-with-blue-sky-and-clear-waters-concept-of-nature-relaxation-tropical-destination-vacation-space-for-text-mockup-for-design-vertical-photo.jpeg"
    },
    {
      text: "You are never too old to set another goal or to dream a new dream.",
      image: "https://thumb.photo-ac.com/0a/0a5a0eb5486347303593a3c8a8931fc2_t.jpeg"
    }
  ];

  // Function to generate a random quote and image
  generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * this.quotes.length); // pick a random quote
    const randomTop = 20 + Math.random() * 60;  // generate a top % between 20 and 80
    const randomLeft = 20 + Math.random() * 60; // generate a left % between 20 and 80

    // Update the state with new quote, image, and random position
    this.setState({
      quote: this.quotes[randomIndex].text,
      image: this.quotes[randomIndex].image,
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });
  };

  // render() function returns the JSX to display
  render() {
    return (
      <div 
        style={{ 
          ...styles.container, // apply container styles
          backgroundImage: `url(${this.state.image})` // set background image dynamically
        }}
      >
        <div
          style={{
            ...styles.overlay,       // base style
            top: this.state.top,     // dynamic top position
            left: this.state.left,   // dynamic left position
            transform: 'translate(-50%, -50%)' // center the div from its middle point
          }}
        >
          <h2>Random Motivation Quote Generator</h2>
          <p style={styles.quote}>{this.state.quote}</p> {/* Display quote */}
          <button style={styles.button} onClick={this.generateQuote}>
            Get New Quote
          </button>
        </div>
      </div>
    );
  }
}

// Styles object for inline styling
const styles = {
  container: {
    height: '100vh',                 // full viewport height
    width: '100vw',                  // full viewport width
    backgroundSize: 'cover',        // stretch image to cover full area
    backgroundRepeat: 'no-repeat',  // prevent repeating
    backgroundPosition: 'center center', // center the image
    position: 'relative',           // required for absolutely positioned children
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    overflow: 'hidden',             // hide any overflow
  },
  overlay: {
    position: 'absolute',           // allow manual placement using top/left
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
    maxWidth: '600px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent background
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    transition: 'top 0.6s ease, left 0.6s ease' // smooth animation on position change
  },
  quote: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    margin: '20px 0',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#00b894', // teal green
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};
