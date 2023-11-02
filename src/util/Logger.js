import { watchFile, statSync, writeFile } from "fs";

const LOG_LIMIT = 1024; // KB

const Logger = {
  out: (messages = []) => {
    if (messages.length) {
      console.log(new Date());
      messages.forEach((message) => {
        console.log(message);
      });
    }
  },
  error: (messages = []) => {
    if (messages.length) {
      console.error(new Date());
      messages.forEach((message) => {
        console.error(message);
      });
    }
  },
  /**
   * This will maintain log file to less than 1024 KB
   */
  sweeper: () => {
    watchFile("logs/error.log", (curr, prev) => {
      let fileStats = statSync("logs/error.log");
      let size = fileStats.size / 1024;

      if (size > LOG_LIMIT) {
        writeFile("logs/error.log", "", (err) => {
          if (err) throw err;
        });
      }
    });

    watchFile("logs/out.log", (curr, prev) => {
      let fileStats = statSync("logs/out.log");
      let size = fileStats.size / 1024;

      if (size > LOG_LIMIT) {
        writeFile("logs/out.log", "", (err) => {
          if (err) throw err;
        });
      }
    });
  },
};

export default Logger;
