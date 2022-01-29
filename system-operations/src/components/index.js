import React from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { hu, en } from "../lang/index";
import systemOperation from "../services/systemOperations";
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
} from "@mui/material";
export default function AppIndex() {
  const [operation, setOperation] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [activeInterval, setActiveInterval] = React.useState();
  const [language, setLanguage] = React.useState(en);

  const handleChange = (event) => {
    setOperation(event.target.value);
  };
  const changeLanguage = (event) => {
    const [responseMessage, operation_type, operation_start, remaining_time] =
      document.querySelectorAll(
        "#response, #operation_type, #operation_start, #remaining_time"
      );
    responseMessage.innerHTML = "";
    operation_type.innerHTML = "";
    operation_start.innerHTML = "";
    remaining_time.innerHTML = "";
    setOperation("");
    if (event.target.value === "en") {
      setLanguage(en);
    } else if (event.target.value === "hu") {
      setLanguage(hu);
    }
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
      responseMessage.innerHTML = language.response.selectOperation;
      return;
    }
    if (defaultDate < dateNow) {
      responseMessage.innerHTML = language.response.selectDate;
      return;
    }
    responseMessage.innerHTML = "";
    setActive(true);
    const targetDate = value.toLocaleString();
    operation_type.innerHTML = language.response.targetOperation + operation;
    operation_start.innerHTML = language.response.targetDate + targetDate;
    const myInterval = setInterval(() => {
      let currentDate = Math.floor(new Date().getTime() / 1000);
      let convertedTargetDate = Math.floor(value.getTime() / 1000);
      if (currentDate === convertedTargetDate) {
        stopTimer(myInterval);
        systemOperation(operation, language);
        clearInterval(myInterval);
      } else {
        remaining_time.innerHTML =
          language.response.remainingSeconds +
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
          <InputLabel id="label_id">{language.operationLabelName}</InputLabel>
          <Select
            labelId="label_id"
            value={operation}
            label={language.operationLabelName}
            onChange={handleChange}
          >
            <MenuItem value={language.operationNames.restart}>
              {language.operationNames.restart}
            </MenuItem>
            <MenuItem value={language.operationNames.turningOff}>
              {language.operationNames.turningOff}
            </MenuItem>
            <MenuItem value={language.operationNames.sleeping}>
              {language.operationNames.sleeping}
            </MenuItem>
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
              {language.buttons.stop}
            </Button>
          ) : (
            <Button onClick={startTimer} m={5} variant="contained">
              {language.buttons.start}
            </Button>
          )}
        </FormControl>
        <p id="response"></p>
        <p style={{ margin: 3 }} id="operation_type"></p>
        <p style={{ margin: 3 }} id="operation_start"></p>
        <p style={{ margin: 3 }} id="remaining_time"></p>
        <p>
          {language.created.msg}
          <Link target={"_blank"} href="https://github.com/schrudolf">
            {" "}
            {language.created.name}
          </Link>
        </p>
        {!active && (
          <FormControl>
            <InputLabel variant="outlined">
              {language.languageSelector.inputLabel}
            </InputLabel>
            <Select
              onChange={changeLanguage}
              value={language.name}
              label={language.languageSelector.inputLabel}
            >
              <MenuItem value={"en"}>
                {language.languageSelector.languages.en}
              </MenuItem>
              <MenuItem value={"hu"}>
                {language.languageSelector.languages.hu}
              </MenuItem>
            </Select>
          </FormControl>
        )}
      </Grid>
    </Container>
  );
}
