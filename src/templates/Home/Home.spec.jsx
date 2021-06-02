import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const { render, screen, waitForElementToBeRemoved } = require("@testing-library/react");
import { Home } from '.';


const handlers = [

  rest.get('*jsonplaceholder.typicode.com*',
    async(req, res, ctx) => {

      console.log('A chamada foi interceptada');

      return res(

        ctx.json([
          {
            userId: 1,
            id: 1,
            title: "title1",
            body: "body1",
            url: 'img1.jpg'
          },
          {
            userId: 2,
            id: 2,
            title: "title2",
            body: "body2",
            url: 'img2.jpg'
          },
          {
            userId: 3,
            id: 3,
            title: "title3",
            body: "body3",
            url: 'img3.jpg'
          },
        ]), // Fim do ctx.json();
        
      );

    } 
  ) // Fim da função rest.get();

];

const server = setupServer(...handlers);

describe('<Home />', () => {

  // Antes de tudo, fazendo o servidor escutar algo
  beforeAll(() => {
    server.listen();
  });

  // Depois de cada um dos testes
  afterEach(() => server.resetHandlers());

  // Fechando conexão
  afterAll(() => {
    server.close();
  });

  
  it('should render search, posts and load more', async () => {
    
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts.');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i} );
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i} );
    expect(button).toBeInTheDocument();

  });

  it('should search for posts', async () => {
    
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts.');

    expect.assertions(7);

    await waitForElementToBeRemoved(noMorePosts);

    // Se os posts estão sendo exibidos
    const search = screen.getByPlaceholderText(/type your search/i);
    
    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title2 2' }))
      .toBeInTheDocument();

    // Se unicamente o title1 está sendo exibido
    userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title2 2' }))
      .not.toBeInTheDocument();

    // Se o que está sendo digitado, está sendo exibido
    expect(screen.getByRole('heading', { name: 'Search value: title1' }));
    
    // Se search está limpo e os post voltarão a serem exibidos
    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title2 2' }))
      .toBeInTheDocument();

    // Se algo pesquisado não existindo, é retornado a mensagem sobre não ter posts
    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Não existem posts.'))
      .toBeInTheDocument();

  });

  it('should load more posts', async () => {
    
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts.');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i} );
    
    // Botão clicado, deve carregar mais posts
    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title3 3' }))
      .toBeInTheDocument();

    // Se não tem mais posts, se o botão está desativado
    expect(button).toBeDisabled();

  });
  /**
   * Ao final, mudar valor de 2 para 10 no arquivo: index.jsx
   * const [postsPerPage] = useState(2);
   * 
   * Depois, alterar para 3 na linha 73:
   * expect.assertions(2);
   * 
   * E alterar pra 3 na linha 81:
   * expect(images).toHaveLength(2);
   */

});


