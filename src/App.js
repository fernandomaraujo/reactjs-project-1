import './App.css';

import { Component } from 'react';

class App extends Component {
  
  state = {

    posts: [

      {
        id: 1,
        title: 'O último desejo',
        body: 'Primeiro livro da saga The Witcher'
      },
      {
        id: 2,
        title: 'A espada do destino',
        body: 'Segundo livro da saga The Witcher'
      },
      {
        id: 3,
        title: 'O sangue dos elfos',
        body: 'Terceiro livro da saga The Witcher'
      },

    ]
  };
  
  render() {

    const { posts } = this.state;

    return (
      <div className="App">

        {posts.map(post => (

          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
          
        ))}
      </div>
    );
  }

}

export default App;
