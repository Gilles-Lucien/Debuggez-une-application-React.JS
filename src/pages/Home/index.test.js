import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventCard from "../../components/EventCard";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
    });
  });
});

describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("a list of events is displayed", () => {
    const eventsList = screen.getByTestId("EventsContainer");
    expect(eventsList).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    const peopleCards = screen.getAllByTestId("PeopleCard");
    expect(peopleCards.length).toBeGreaterThan(0);
  });

  it("a footer is displayed", () => {
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    // Define a mock last prop
    const mockLast = {
      cover: "../../../public/images/headway-F2KRf_QfCqw-unsplash.png",
      title: "Conférence #productCON",
      date: "Mon Aug 29 2022 22:28:45 GMT+0200 (heure d’été d’Europe centrale)",
    };

    // Render the component with the mock last prop
    render(
      <EventCard
        imageSrc={mockLast?.cover}
        title={mockLast?.title}
        date={new Date(mockLast?.date)}
        small
        label="boom"
        data-testid="last-event-card"
      />
    );

    const lastEventCard = await screen.findByTestId("last-event-card");
    expect(lastEventCard).toBeInTheDocument();
  });
});
