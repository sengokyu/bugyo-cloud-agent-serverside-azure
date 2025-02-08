import * as esbuild from "esbuild";
import * as path from "path";

const funcs = ["BugyoCloudAgent"];

for (const func of funcs) {
  await esbuild.build({
    bundle: true,
    minify: true,
    entryPoints: [path.join("src", "functions", func + ".ts")],
    platform: "node",
    outdir: "dist",
    sourcemap: true,
    target: "node20",
    // Is this provided in Azure environment ?
    external: ["@azure/functions-core"],
  });
}
