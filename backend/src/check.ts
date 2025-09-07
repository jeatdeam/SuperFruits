import { exec } from "child_process";
import os from "os";

function checkPorts() {
    const platform = os.platform();

    let cmd = "";

    if (platform === "win32") {
        // Windows
        cmd = "netstat -ano";
    } else if (platform === "darwin" || platform === "linux") {
        // MacOS y Linux
        cmd = "lsof -i -P -n";
    }

    const portsToCheck = [3000, 4000, 5000, 5173, 8080];
    exec(cmd, (err, stdout) => {
        if (err) return console.error(err);

        portsToCheck.forEach(port => {
            if (stdout.includes(`:${port}`)) {
                console.log(`🟡 El puerto ${port} está en uso`);
            } else {
                console.log(`🟢 El puerto ${port} está libre`);
            }
        });
    });

}

checkPorts();
