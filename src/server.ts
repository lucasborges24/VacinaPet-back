import chalk from "chalk";
import dotenv from "dotenv"
import app from "./app";

dotenv.config();

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(chalk.blueBright('Server running on PORT ' + PORT))
});