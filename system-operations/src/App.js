import React from "react";
import AppIndex from "./components";
// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppIndex />
      </LocalizationProvider>
    </div>
  );
}

export default App;
