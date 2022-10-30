import { useState } from 'react';
import { Calendar } from 'test-aaa-ui-kit';
// import Dummy from './components/Dummy?qs-should-not-break-plugin-react'
// import Parent from './hmr/parent'
// import { CountProvider } from './context/CountProvider'
// import { ContextButton } from './context/ContextButton'

function App() {
  const [count, setCount] = useState(0);
  const [data1, setData] = useState(1111);
  return (
    <div className="App">
      <Calendar></Calendar>
    </div>
  );
}

export default App;
