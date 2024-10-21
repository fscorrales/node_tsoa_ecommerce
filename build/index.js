"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const base_config_1 = require("./src/config/base_config");
const database_1 = require("./src/config/database");
(0, database_1.connectDB)()
    .then(() => {
    app_1.server.listen(base_config_1.PORT, () => {
        console.log(`Server running on port ${base_config_1.PORT}`);
    });
})
    .catch((error) => {
    console.log(error.message);
});
