import "dotenv/config";
import "./Server.js";
import "./AppRouter.js";

import Logger from "./util/Logger.js";

// Run logs sweeper
Logger.sweeper();
