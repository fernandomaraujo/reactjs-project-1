import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  // Hook
  // Desestruturação do array
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  // Operação condicional ternário
  // Se tem valor, filtra os posts, caso não retorna posts normal
  const filteredPosts = !!searchValue ? 
    
    allPosts.filter(post => {

      return post.title.toLowerCase()
        .includes(searchValue.toLocaleLowerCase());

  })
  : posts;

  const handleLoadPosts = useCallback(async(page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {

    handleLoadPosts(0, postsPerPage);
    
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
  
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);

  }

  const handleChange = (e) => {
    const {value} = e.target;

    setSearchValue(value);
  }

  return(

    // O que está sendo exibido 
    
    <section className="container">

      <div className="search-container">

        {/* Avaliação de Curto-Circuito*/}
        {!!searchValue && (
          <>
          <h1>Search value: {searchValue}</h1>
          </>
        )}

        <TextInput 
          searchValue={searchValue}
          handleChange={handleChange}
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

        {/*Se não estiver numa busca, exibir botão */}
        {!searchValue && (
          <Button 
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts} 
          />
        )}
          
      </div>

    </section>
  
  );

}