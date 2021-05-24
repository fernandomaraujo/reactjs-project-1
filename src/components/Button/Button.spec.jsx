const { render, screen} = require("@testing-library/react");
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {

  it('should render the button with the text "LoadMore"', () => {

    render(<Button text="Load more"/>);

    // Pegando o botão. Expressão regulares
    const button = screen.getByRole('button', { name: /load more/i});
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {

    // Criando uma função mock com o Jest
    const fn = jest.fn();

    render(<Button text="Load more" onClick={fn} />);

    // Pegando o botão. Expressão regulares
    const button = screen.getByRole('button', { name: /load more/i});
    
    // "Clicando" no botão pelo código. Disparando o evento
    userEvent.click(button);

    // Checando se a função foi chamada uma vez
    expect(fn).toHaveBeenCalledTimes(1);

  });

  it('should be disabled when disabled is true', () => {

    render(<Button text="Load more" disabled={true} />);

    // Pegando o botão. Expressão regulares
    const button = screen.getByRole('button', { name: /load more/i});
    
    // Experando que o botão esteja desativado
    expect(button).toBeDisabled();

  });

  it('should be enabled when disabled is false', () => {

    render(<Button text="Load more" disabled={false} />);

    // Pegando o botão. Expressão regulares
    const button = screen.getByRole('button', { name: /load more/i});
    
    // Experando que o botão esteja ativado
    expect(button).toBeEnabled();

  });  

});