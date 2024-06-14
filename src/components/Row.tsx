const Row = ({
  guess,
  isFinal,
  solution,
}: {
  guess: any[];
  isFinal: boolean;
  solution: string;
}) => {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";
    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " almost";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }
  return <div className="row">{tiles}</div>;
};

export default Row;
