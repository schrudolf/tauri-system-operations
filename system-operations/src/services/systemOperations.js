import { Command } from "@tauri-apps/api/shell";

const systemOperation = async (operation, language) => {
  if (operation === language.operationNames.restart) {
    const command = new Command("cmd.exe", ["/c", "shutdown /r"]);
    await command.spawn();
  } else if (operation === language.operationNames.turningOff) {
    const command = new Command("cmd.exe", ["/c", "shutdown /s"]);
    await command.spawn();
  } else if (operation === language.operationNames.sleeping) {
    const command = new Command("cmd.exe", [
      "/c",
      "rundll32.exe powrprof.dll,SetSuspendState 0,1,0",
    ]);
    await command.spawn();
  } else {
    return;
  }
};

export default systemOperation;
