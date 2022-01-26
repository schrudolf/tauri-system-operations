import React from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Command } from "@tauri-apps/api/shell";
import {
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Link,
  NativeSelect,
} from "@mui/material";
export default function AppIndex() {
  const [operation, setOperation] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [activeInterval, setActiveInterval] = React.useState();

  async function executeOperation() {
    if (operation === "Restart") {
      const command = new Command("cmd.exe", ["/c", "shutdown /r"]);
      await command.spawn();
    } else if (operation === "Turning off") {
      const command = new Command("cmd.exe", ["/c", "shutdown /s"]);
      await command.spawn();
    } else if (operation === "Sleeping mode") {
      const command = new Command("cmd.exe", [
        "/c",
        "rundll32.exe powrprof.dll,SetSuspendState 0,1,0",
      ]);
      await command.spawn();
    } else {
      return;
    }
  }

  const handleChange = (event) => {
    setOperation(event.target.value);
  };
  function stopTimer(myInterval) {
    const [responseMessage, operation_type, operation_start, remaining_time] =
      document.querySelectorAll(
        "#response, #operation_type, #operation_start, #remaining_time"
      );
    responseMessage.innerHTML = "";
    operation_type.innerHTML = "";
    operation_start.innerHTML = "";
    remaining_time.innerHTML = "";
    setActive(false);
    if (typeof myInterval !== "undefined") {
      clearInterval(myInterval);
    }
    clearInterval(activeInterval);
  }
  async function startTimer() {
    const defaultDate = Math.floor(value.getTime() / 1000);
    const dateNow = Math.floor(new Date().getTime() / 1000);
    const [responseMessage, operation_type, operation_start, remaining_time] =
      document.querySelectorAll(
        "#response, #operation_type, #operation_start, #remaining_time"
      );
    if (operation === "") {
      responseMessage.innerHTML = "Please select an operation before start";
      return;
    }
    if (defaultDate < dateNow) {
      responseMessage.innerHTML = "Please choose a Date before start";
      return;
    }
    responseMessage.innerHTML = "";
    setActive(true);
    const targetDate = value.toLocaleString();
    operation_type.innerHTML = "System will " + operation;
    operation_start.innerHTML = "When? " + targetDate;
    const myInterval = setInterval(() => {
      let currentDate = Math.floor(new Date().getTime() / 1000);
      let convertedTargetDate = Math.floor(value.getTime() / 1000);
      if (currentDate === convertedTargetDate) {
        stopTimer(myInterval);
        executeOperation();
        clearInterval(myInterval);
      } else {
        remaining_time.innerHTML =
          "Remaining seconds: " +
          (convertedTargetDate - currentDate).toString();
      }
    }, 1000);
    setActiveInterval(myInterval);
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
            <MenuItem value={"Sleeping mode"}>Sleeping mode</MenuItem>
          </Select>
          <DateTimePicker
            disablePast
            minTime={value}
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
        <p style={{ margin: 3 }} id="operation_type"></p>
        <p style={{ margin: 3 }} id="operation_start"></p>
        <p style={{ margin: 3 }} id="remaining_time"></p>
        <p>
          Created by:
          <Link target={"_blank"} href="https://github.com/schrudolf">
            {" "}
            schRudolf
          </Link>
        </p>
        <FormControl sx={{marginTop: 3}}>
          <InputLabel variant="standard" >
            Language
          </InputLabel>
          <NativeSelect defaultValue={"English"}> 
            <option value={"English"}>English</option>
            <option value={"Magyar"}>Magyar</option>
          </NativeSelect>
        </FormControl>
      </Grid>
    </Container>
  );
}
