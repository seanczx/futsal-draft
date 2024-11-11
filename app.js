function App() {
  const [players, setPlayers] = React.useState('');
  const [availablePlayers, setAvailablePlayers] = React.useState([]);
  const [teams, setTeams] = React.useState({
    'Team 1': [],
    'Team 2': [],
    'Team 3': []
  });
  const [currentPick, setCurrentPick] = React.useState(1);
  const [isDraftStarted, setIsDraftStarted] = React.useState(false);

  const getCurrentTeam = (pickNumber) => {
    const round = Math.floor((pickNumber - 1) / 3);
    const isReverseRound = round % 2 === 1;
    const position = (pickNumber - 1) % 3;
    
    if (isReverseRound) {
      return `Team ${3 - position}`;
    }
    return `Team ${position + 1}`;
  };

  const startDraft = () => {
    const playerList = players.split('\n').filter(player => player.trim() !== '');
    if (playerList.length !== 21) {
      alert('Please enter exactly 21 players (one per line)');
      return;
    }
    setAvailablePlayers(playerList);
    setIsDraftStarted(true);
  };

  const selectPlayer = (player) => {
    const currentTeam = getCurrentTeam(currentPick);
    setTeams(prev => ({
      ...prev,
      [currentTeam]: [...prev[currentTeam], player]
    }));
    setAvailablePlayers(prev => prev.filter(p => p !== player));
    setCurrentPick(prev => prev + 1);
  };

  if (!isDraftStarted) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Futsal Draft System</h1>
        <div className="mb-4">
          <label className="block mb-2">
            Enter 21 players (one per line):
            <textarea
              className="w-full h-48 p-2 border rounded"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              placeholder="Player 1&#10;Player 2&#10;Player 3..."
            />
          </label>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={startDraft}
        >
          Start Draft
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Futsal Draft System</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Pick: {currentPick}</h2>
        <p className="text-lg text-blue-600 font-semibold">
          {getCurrentTeam(currentPick)}'s Turn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Available Players</h2>
          <div className="space-y-2">
            {availablePlayers.map((player) => (
              <button
                key={player}
                className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => selectPlayer(player)}
              >
                {player}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(teams).map(([teamName, teamPlayers]) => (
            <div key={teamName} className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">{teamName}</h2>
              <ul className="space-y-1">
                {teamPlayers.map((player, index) => (
                  <li key={index} className="px-3 py-1 bg-gray-50 rounded">
                    {player}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
