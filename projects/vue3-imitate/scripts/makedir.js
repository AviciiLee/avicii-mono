import fs from "fs";

function makeDir() {
  const sourcePath =
    "/Users/lixing/Desktop/学习计划/架构课代码/vue-core/packages";

  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      if (fs.statSync(sourcePath + "/" + file).isDirectory) {
        fs.mkdirSync("../packages/" + file + "/src/", { recursive: true });
      }
    });
  });
}

makeDir();
