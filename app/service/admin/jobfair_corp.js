'use strict';

const assert = require('assert');
const _ = require('lodash');
const util = require('util');
const fs = require('fs');
const path = require('path');
const os = require('os');
const xlsx = require('xlsx');
const moment = require('moment');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { JobfairCorpStatus } = require('../../util/constants');
const { jobfair_corp: meta } = require('./.meta');

class JobfairCorpService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.JobfairCorp;
  }

  // 审核申请
  async review({ id }, { status, booth, remark }) {
    // console.log(params);
    assert(id, 'id不能为空');
    assert(!isNullOrUndefined(status), 'status不能为空');
    assert(
      status === JobfairCorpStatus.NORMAL ||
        status === JobfairCorpStatus.REJECT,
      'status无效'
    );
    assert(
      status !== JobfairCorpStatus.NORMAL || !isNullOrUndefined(booth),
      'booth无效'
    );

    // 查询数据
    const entity = await this.model.findById(id).exec();
    if (isNullOrUndefined(entity)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }
    if (
      entity.status !== JobfairCorpStatus.PENDING &&
      entity.status !== JobfairCorpStatus.REJECT
    ) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '数据状态无效');
    }

    // TODO: 保存数据
    entity.status = status;
    entity.booth = booth;
    entity.remark = remark;
    await entity.save();

    return entity;
  }

  async export({ fair_id, status }) {
    // 检查数据
    assert(_.isString(fair_id), 'fairid不能为空');

    // TODO: 读取公文信息和发文信息
    let rs = await this.model
      .find(trimData({ fair_id, status }), null, {
        limit: 500,
        sort: { 'meta.createdAt': -1 }
      })
      .exec();
    if (!rs) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '信息不存在');
    }

    // TODO: 现将结果按照jobs字段展开实现扁平化，在根据字段名进行映射
    rs = rs
      .map(r =>
        r.jobs.map((job, index) => ({
          corpname: index === 0 ? r.corpname : '',
          booth: index === 0 ? r.booth : '',
          jobname: job.name,
          count: job.count,
          requirement: job.requirement
        }))
      )
      .reduce((p, c) => p.concat(c), []);

    // 通过meta映射格式信息
    const header = meta.reduce((p, c) => {
      p[c.name] = c.label;
      return p;
    }, {});
    const cols = meta.map(p => ({ wch: p.width }));

    const name = moment().format('YYYYMMDDHHmmss') + '.xlsx';
    const mkdtemp = util.promisify(fs.mkdtemp);
    const dir = await mkdtemp(path.join(os.tmpdir(), 'export-'));
    const file = path.join(dir, name);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([ header, ...rs ], {
      header: Object.keys(header),
      skipHeader: true
    });
    ws['!cols'] = cols;
    xlsx.utils.book_append_sheet(wb, ws);
    xlsx.writeFile(wb, file);
    return { dir, name };
  }
}

module.exports = JobfairCorpService;
