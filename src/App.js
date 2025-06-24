import './App.css';

// Dynamically import all images starting with 'jackal' in the current directory
const importAll = (r) => r.keys().map(r);
const jackalImages = importAll(require.context('./', false, /jackal.*\.jpg$/));

function App() {
  
  const allImages = [...jackalImages];

  return (
    <div className="App">
      <header className="App-header">
        <h1>A Gallery Representing the Jackals</h1>
        <div className="gallery">
          {allImages.map((img, index) => (
            <img key={index} src={img} alt={`Gallery image ${index + 1}`} className="gallery-image" />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
