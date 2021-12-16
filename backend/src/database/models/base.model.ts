import { Inject, Injectable } from '@nestjs/common';
import moment = require('moment');
import { Model, QueryBuilder } from 'objection';

export class BaseModel extends Model {
  $beforeUpdate() {
    const ss = new Date(moment().toString())
    this.createdAt = new Date(ss.toString()) //new Date(moment(moment(),'Asia/Baghdad').format().toString());
    this.updatedAt = new Date(moment(moment(),'Asia/Baghdad').format().toString());
  }
  $beforePatch() {
    const ss = new Date(moment().toString())
    this.createdAt = new Date(ss.toString()) //new Date(moment(moment(),'Asia/Baghdad').format().toString());
    this.updatedAt = new Date(moment(moment(),'Asia/Baghdad').format().toString());
  }
  $beforeInsert() {
    const ss = new Date(moment().toString())
    this.createdAt = new Date(ss.toString()) //new Date(moment(moment(),'Asia/Baghdad').format().toString());
    this.updatedAt = new Date(moment(moment(),'Asia/Baghdad').format().toString());
  }
  // $beforeCreate() {
  //   this.createdAt = Date();
  //   this.updatedAt = Date();
  // }


  readonly id: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

}
