import Card from './Card.jsx';

export default function CardStack({ cards }) {
  console.log(cards);
  return (
    <section className="card-grid">
      {cards.map((card) => {
        return <Card key={card.id} card={card}  />;
      })}
    </section>
  );
}
