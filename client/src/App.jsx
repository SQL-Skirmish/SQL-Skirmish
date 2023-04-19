import Editors from "./Editors";
function App() {
  return (
    <main>
      <Editors player={1} />
      <section></section>
      <Editors player={2} />
    </main>
  );
}

export default App;
