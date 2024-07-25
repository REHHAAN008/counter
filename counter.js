import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds, addSeconds } from "date-fns";
// Prompt the user for input
const res = await inquirer.prompt([{
        name: 'User_Input',
        type: "number",
        message: "PLEASE ENTER THE AMOUNT OF SECONDS",
        validate: (input) => {
            if (isNaN(input)) {
                return "PLEASE ENTER A VALID NUMBER";
            }
            else if (input > 60) {
                return "SECONDS MUST BE LESS THAN 60";
            }
            else {
                return true;
            }
        }
    }]);
let input = res.User_Input;
function startTime(val) {
    // Set the target time by adding the user input to the current time
    const targetTime = addSeconds(new Date(), val);
    // Set up an interval to check the time every second
    const interval = setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(targetTime, currTime);
        // If the difference is zero or less, the timer has expired
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer has expired"));
            clearInterval(interval);
            process.exit();
        }
        else {
            const min = Math.floor(timeDiff / 60);
            const sec = timeDiff % 60;
            console.log(chalk.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }
    }, 1000);
}
// Start the timer with the user input
startTime(input);
