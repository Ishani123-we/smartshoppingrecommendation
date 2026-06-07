import { useState } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  const [currentCat, setCurrentCat] = useState('');

  const fetchRecommendations = async (category) => {
    try {
    
const response = await fetch(`http://127.0.0.1:8000/api/recommend/${category}`);
      const data = await response.json();
      setProducts(data.items);
      setCurrentCat(data.selected_category);
    } catch (error) {
      console.error("Failed to connect to backend API:", error);
    }
  };
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '50px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50' }}>Smart Shopping Recommendation Engine</h1>
      <p style={{ color: '#7f8c8d' }}>Click a category :</p>

      {/* Category Selection Buttons */}
      <div style={{ margin: '30px 0' }}>
        <button onClick={() => fetchRecommendations('Electronics')} style={buttonStyle('#472071')}>💻 Electronics</button>
        <button onClick={() => fetchRecommendations('Clothes')} style={buttonStyle('#77c426')}>👕 Clothes</button>
        <button onClick={() => fetchRecommendations('Books')} style={buttonStyle('#942b75')}>📚 Books</button>
      </div>

      {/* Recommended Products Display Area */}
      {currentCat && (
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#34495e', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Recommended {currentCat}
          </h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {products.map((item) => (
              <li key={item.id} style={{ padding: '15px 0', borderBottom: '1px solid #f1f1f1', display: 'flex', justifyContent: 'between', fontSize: '18px' }}>
                <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                <span style={{ color: '#27ae60', marginLeft: 'auto' }}>{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
const buttonStyle = (color) => ({
  margin: '0 10px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: color,
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

export default App;
