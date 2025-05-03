import React, { Component } from 'react'

export default class ClassComponents extends Component {
    
    constructor(){
        super();
        this.state={
            count:0, name:'Shivam',age:20
        }
    }
    counter(){
        console.log("counter function");
        this.setState({age:this.state.age+1, name:'Shivam Garg'})
    }
  render() {
    return (
      <div>
        <h1>ClassComponents </h1>
        <table>
            <tr>
                <td>
                    {this.state.count}
                </td>
                <td>
                    {this.state.name}
                </td>
                <td>
                    {this.state.age}
                </td>
            </tr>
            <button onClick={()=>this.counter()}>Count</button>

        </table>
      </div>
    )
  }
}
