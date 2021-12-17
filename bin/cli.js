#! /usr/bin/env node
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,c){void 0===c&&(c=r),Object.defineProperty(e,c,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,c){void 0===c&&(c=r),e[c]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const path_1=__importDefault(require("path")),create_project_1=require("./scripts/create-project"),fse=__importStar(require("fs-extra")),cp=__importStar(require("child_process")),input_line_1=__importDefault(require("./scripts/input-line")),sepStr="\n::::::::::::::::::::::::::::::\n",pkg=require("../package.json");process.stdout.write(sepStr),process.stdout.write(`\n${pkg.name} v${pkg.version}\n`);const dir=path_1.default.join(process.cwd(),process.argv[2]||"./");process.stdout.write(`  dirname: ${dir}\n`),process.stdout.write("\nselect project type\n- [c]  : cancel to start\n- [hp] : homepage (react + etc.)\n- [cli]: command line interface application \n- [web]: web application (express + next + etc.)\n- [dt] : desktop application (electron + next + etc.)\n- [wd] : web and desktop application (express + electron + next + etc.)\n");const changeDir=()=>{fse.existsSync(dir)||(process.stdout.write(`create dir : ${dir}\n`),fse.mkdirSync(dir,{recursive:!0})),cp.spawnSync("cd",[dir],{shell:!0,stdio:"inherit",cwd:process.cwd()})},succeededProcess=()=>{process.stdout.write(`\n${pkg.name} succeeded.\n`),null!=process.argv[2]&&process.cwd()!==dir&&(process.stdout.write("\nstart with change directory"),process.stdout.write(`\n  cd ${process.argv[2]}\n`))};(0,input_line_1.default)({message:"please input (default c) > "}).then((async e=>{try{switch(e){case"hp":process.stdout.write("\ncreate homepage...\n"),changeDir(),await(0,create_project_1.create_homepage)(dir),succeededProcess();break;case"cli":process.stdout.write("\ncreate command line interface application...\n"),changeDir(),await(0,create_project_1.create_cli)(dir),succeededProcess();break;case"web":process.stdout.write("\ncreate web application...\n"),changeDir(),await(0,create_project_1.create_web)(dir),succeededProcess();break;case"dt":process.stdout.write("\ncreate desktop application...\n"),changeDir(),await(0,create_project_1.create_desktop)(dir),succeededProcess();break;case"wd":process.stdout.write("\ncreate web and desktop application...\n"),changeDir(),await(0,create_project_1.create_web_desktop)(dir),succeededProcess();break;default:process.stdout.write("\ncancel\n")}}catch(e){process.stderr.write(String(e)),process.stdout.write(`\n${pkg.name} failed.\n`)}process.stdout.write(`${sepStr}\n`)})).catch((e=>{process.stderr.write(e),process.stdout.write(`\n${pkg.name} failed.\n`),process.stdout.write(`${sepStr}\n`)}));