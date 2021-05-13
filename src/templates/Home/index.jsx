import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };
  
  async componentDidMount() {
    
    await this.loadPosts();
  }

  loadPosts = async() => {

    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({ 
      posts: postsAndPhotos.slice(page,postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });

  }

  handleChange = (e) => {
    const {value} = e.target;

    this.setState({ searchValue: value });
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    {/* Operação condicional ternário */}
    {/* Se tem valor, filtra os posts, caso não retorna posts normal*/}
    const filteredPosts = !!searchValue ? 
    
    allPosts.filter(post => {

      return post.title.toLowerCase()
        .includes(searchValue.toLocaleLowerCase());

    })
    : posts;

    {/* O que está sendo exibido */}
    return (
      <section className="container">

        <div className="search-container">

          {/* Avaliação de Curto-Circuito */}
          {!!searchValue && (
            <>
            <h1>Search value: {searchValue}</h1>
            </>
          )}

          <TextInput 
            searchValue={searchValue}
            handleChange={this.handleChange}
          />

        </div>

        {/* Se tiver posts filtrados, exibe */}
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {/* Caso contrário */}
        {filteredPosts.length === 0 && (
          <p className="without-posts">Não existem posts.</p>
        )}

        <div className="button-container">

          {/* Se não estiver numa busca, exibir botão */}
          {!searchValue && (
            <Button 
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts} 
            />
          )}
          
        </div>

      </section>
    );
  }

}