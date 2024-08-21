import jsforce from "jsforce";
import auditForce from "auditforce";

import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


async function test(){
    const conn = new jsforce.Connection({version: '61.0'});
    await conn.login(process.env.username, process.env.password);

    let query = `
    SELECT Id, CreatedDate, CreatedBy.Username, Action,Display,Section 
    FROM SetupAuditTrail  
    WHERE CreatedBy.Username != '' 
    ORDER BY CreatedDate Desc
    `

    let queryResult = await conn.query(query);
    let { records } = queryResult;

    let enhancedRecords = auditForce.enhanceRecords(records);

    fs.writeFileSync('enhancedRecords.json', JSON.stringify(enhancedRecords, null, 2));

}

test();