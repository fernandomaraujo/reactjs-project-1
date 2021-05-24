const { render, screen } = require("@testing-library/react");
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard {...props} />);

    // Se existe imagem com titulo específico
    expect(screen.getByAltText(/asTitle/i)).toHaveAttribute(
      "src",
      "img/img.png"
    );

    expect(
      screen.getByRole("heading", { name: "asTitle 1" })
    ).toBeInTheDocument();

    expect(screen.getByText("asBody")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
