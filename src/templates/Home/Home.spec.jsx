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

  afterAll

  it('should render search, posts and load more', async () => {
    
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts.');

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();

  });

});


