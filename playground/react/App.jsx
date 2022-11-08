import { useState } from 'react';
import { Calendar, Button } from 'test-aaa-ui-kit';

import 'test-aaa-ui-kit/dist/index.css';

function App() {
  const [count, setCount] = useState(0);
  const [data1, setData] = useState(1111);
  return (
    <div className="App">
      <Calendar></Calendar>
      <Button></Button>
    </div>
  );
}

export default App;
