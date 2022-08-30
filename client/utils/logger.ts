class Logger {
  log = (message: string) => {
    console.log(message);
  };
}

export const logger = new Logger();
