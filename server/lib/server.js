import { ModuleAPI } from './api/moduleAPI';
import path from 'path';
import express from 'express';
let app = express();

app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/api/modules', ModuleAPI.sendModulesState);

app.listen(8080);
console.log("app is listening on port 8080");