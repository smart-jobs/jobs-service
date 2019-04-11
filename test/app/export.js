'use strict';

const _ = require('lodash');
const xlsx = require('xlsx');

function doTest() {
  let rs = [];
  rs.push({
    corp: '单位1',
    jobs: [
      { name: '职位1-1', count: 1 },
      { name: '职位1-2', count: 2 },
      { name: '职位1-3', count: 3 }
    ]
  });
  rs.push({
    corp: '单位2',
    jobs: [
      { name: '职位2-1', count: 21 },
      { name: '职位2-2', count: 22 },
      { name: '职位2-3', count: 23 }
    ]
  });
  rs.push({
    corp: '单位3',
    jobs: [
      { name: '职位3-1', count: 31 },
      { name: '职位3-2', count: 32 },
      { name: '职位3-3', count: 33 }
    ]
  });

  rs = rs
    .map(r =>
      r.jobs.map((job, index) => ({
        corp: index === 0 ? r.corp : '',
        jobname: job.name,
        count: job.count
      }))
    )
    .reduce((p, c) => p.concat(c), []);

  const file = 'd:/temp/test.xlsx';

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(rs);
  // console.log(ws['!cols']);
  // console.log(ws['!rows']);
  // console.log(ws['!merges']);
  // console.log(ws);
  const range = {
    s: { c: 0, r: 1 },
    e: { c: 0, r: 3 }
  };
  console.log(range);
  ws['!merges'] = [ range ];
  ws.A2.alignment = { horizontal: 'center', vertical: 'center' };
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, file);
  console.log('操作完成.');
}

doTest();
