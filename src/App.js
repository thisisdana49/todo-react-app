import React from 'react';
import { Paper, List, Container } from '@material-ui/core';

import Todo from './Todo';
import AddTodo from './AddTodo';
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data })
      );
      
    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-type": "application/json" },
    // };

    // fetch("http://localhost:8080/todo", requestOptions)
    // .then((response) => response.json())
    // .then(
    //   (response) => {
    //     this.setState({
    //       items: response.data,
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       error,
    //     })
    //   }
    // )
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
    // const thisItems = this.state.items;
    // item.id = "ID-" + thisItems.length;
    // item.done = false;
    // thisItems.push(item);
    // this.setState({ items: thisItems });
    // console.log("items : ", this.state.items);
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
    // const thisItems = this.state.items;
    // console.log("Before Update Items : ", this.state.items);
    // const newItems = thisItems.filter(e => e.id !== item.id);
    // this.setState({ items: newItems }, () => {
    //   //디버깅 콜백
    //   console.log("Update Items : ", this.state.items);
    // })
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => 
      this.setState({ items: response.data })
    );
  }

  render() {
    let todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, index) => (
            <Todo 
              item={item} 
              key={index} 
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    )

    return (
      <div className='App'>
        <Container maxWidth='md'>
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );    
  }
}

export default App;
