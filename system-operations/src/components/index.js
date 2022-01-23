import React from "react";

// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function AppIndex() {
  const [operation, setOperation] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [myIntervalName, setMyIntervalName] = React.useState();

  const handleChange = (event) => {
    setOperation(event.target.value);
  };
  function stopTimer() {
    const [responseMessage, operation_type, operation_start, remaining_time] = document.querySelectorAll("#response, #operation_type, #operation_start, #remaining_time");
    responseMessage.innerHTML = "";
    operation_type.innerHTML = "";
    operation_start.innerHTML = "";
    remaining_time.innerHTML = "";
    setActive(false);
    clearInterval(myIntervalName);
  }
  function startTimer() {
    const [responseMessage, operation_type, operation_start, remaining_time] = document.querySelectorAll("#response, #operation_type, #operation_start, #remaining_time");
    if (operation === "") {
      responseMessage.innerHTML = "Please select an operation before start";
      return;
    }
    responseMessage.innerHTML = "";
    setValue(new Date());
    setActive(true);
    const targetDate = value.toLocaleString();
    operation_type.innerHTML = "System will " + operation;
    operation_start.innerHTML = "When? " + targetDate;
    const myInterval = setInterval(() => {
      let currentDate = Math.floor(new Date().getTime() / 1000);
      let convertedTargetDate = Math.floor(value.getTime() / 1000);
      if (currentDate === convertedTargetDate) {
        console.log("true assssssssssss");
        stopTimer();
      }
      remaining_time.innerHTML = "Remaining seconds: " + (convertedTargetDate - currentDate).toString()
    }, 1000);
    setMyIntervalName(myInterval);
  }
  return (
    <Container maxWidth="md">
      <Grid
        item={true}
        m={"auto"}
        sm={6}
        xs={12}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <FormControl fullWidth>
          <InputLabel id="label_id">System operations</InputLabel>
          <Select
            labelId="label_id"
            value={operation}
            label="System operations"
            onChange={handleChange}
          >
            <MenuItem value={"Restart"}>Restart</MenuItem>
            <MenuItem value={"Turning off"}>Turning off</MenuItem>
            <MenuItem value={"Sleeping"}>Sleeping mode</MenuItem>
          </Select>
          <DateTimePicker
            ampm={false}
            renderInput={(props) => <TextField {...props} />}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          {active ? (
            <Button onClick={stopTimer} m={5} variant="contained" color="error">
              Stop
            </Button>
          ) : (
            <Button onClick={startTimer} m={5} variant="contained">
              Start
            </Button>
          )}
        </FormControl>
        <p id="response"></p>
        <p id="operation_type"></p>
        <p id="operation_start"></p>
        <p id="remaining_time"></p>
      </Grid>
    </Container>
  );
}
