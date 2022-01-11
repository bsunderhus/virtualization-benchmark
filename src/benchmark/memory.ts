import { exec } from "child_process";

const command = "ps ax -o rss,%cpu,vsz,pid,command | grep ";

const parseLine = (line: string) => {
  const normalized = line.trim().replace(/\s\s+/g, " ").split(" ");
  return { pid: normalized[3], memory: normalized[0], cpu: normalized[1] };
};

const pidCommand = "ps ax | grep ";

async function execAsync(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        reject(error);
      } else if (stderr) {
        console.log(`stderr: ${stderr}`);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function processMap(processName: string) {
  const processes: Record<string, boolean> = {};

  if (process.platform === "win32") {
    return process as unknown as Record<string, boolean>;
  }

  const stdout = (await execAsync(command + processName)) as string;
  let lines = stdout.split("\n");
  for (let l = 1; l < lines.length; l++) {
    if (lines[l].indexOf("grep") >= 0) {
      continue;
    }
    let pid = parseLine(lines[l]).pid;
    pid && (processes[pid] = true);
  }
  return processes;
}

async function totalMemory(processName: string) {
  let total = 0;

  if (process.platform === "win32") {
    return total;
  }

  const stdout = (await execAsync(command + processName)) as string;
  let lines = stdout.split("\n");
  for (let l = 1; l < lines.length; l++) {
    let parsed = parseLine(lines[l]);
    const memKb = Number.parseInt(parsed.memory);
    if (!Number.isNaN(memKb)) {
      total += memKb;
    }
  }
  console.log(`total ${total}`);
  return total;
}

async function processMemory(
  oldProcesses: Record<string, boolean>,
  processName: string
) {
  if (process.platform === "win32") {
    return { pid: "unsupported", memory: 0, cpu: 0 };
  }

  const newProcesses = await processMap(processName);
  const difProcesses: Record<string, boolean> = {};
  let tabProcess = "???";
  Object.keys(newProcesses).map((newProcess) => {
    if (newProcess && !oldProcesses[newProcess]) {
      difProcesses[newProcess] = true;
      tabProcess = newProcess;
    }
  });
  let total = 0;
  let cpu: string | number = 0;

  // if (Object.keys(difProcesses).length > 1) {
  //   console.log("difProcesses", difProcesses);
  //   throw "Found multiple processes " + Object.keys(difProcesses).length;
  // }

  const stdout = (await execAsync(command + processName)) as string;
  let lines = stdout.split("\n");
  for (let l = 1; l < lines.length; l++) {
    let parsed = parseLine(lines[l]);
    if (parsed.pid === tabProcess) {
      const memKb = Number.parseInt(parsed.memory);
      if (!Number.isNaN(memKb)) {
        total += memKb;
      }
      cpu = parsed.cpu;
    }
  }
  return { pid: tabProcess, memory: total, cpu };
}

export { totalMemory, processMap, processMemory };
