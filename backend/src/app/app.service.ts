import { Req, Res, Injectable, BadRequestException, UploadedFile, Inject, HttpException } from '@nestjs/common';
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { parsePhoneNumberFromString, isSupportedCountry } from 'libphonenumber-js';
import { extname, parse } from 'path';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import  { v4 as uuid} from "uuid"
import { AttachmentModel } from 'src/database/models/attachment.model';
import { ModelClass } from 'objection';
import { writeFileSync, readFileSync, readFile, unlinkSync, createReadStream } from 'fs';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(`Unsupported file type ${extname(file.originalname)}`, false);
  }
  callback(null, true);
};

export const ToExstName = (filename) => {
  return (`.${filename.split(".").pop()}`)
}
export const SkipEmpty = Transform(
  (value: string) => {
    const parsed = value;
    if (parsed === "") return parsed;
    if (!(parsed.length >= 8)) return false;
  },
  { toClassOnly: true },
)

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const documentFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|DOC|pdf|PDF|xlsx|XLSX|csv|CSV)$/)) {
    callback(`Unsupported file type ${extname(file.originalname)}`, false)
  }
  callback(null, true);
};

export class PhoneNumberRegex {
  static reg = /^\+964\d{1,12}$/
}

export class linkAddressRegex {
  static reg = /((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)/
}

export class AddFileDto {
    @IsInt()
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    files: Array<Express.Multer.File>
}
export interface FileParamDto {
  originalname: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

const validCountries: Array<string> = ['IQ'];
export const ToPhone = Transform(
  (value: any) => {
    if (typeof value !== 'string') return false;

    const parsed = parsePhoneNumberFromString(value);
    if (!parsed) return false;
    if (!isSupportedCountry(parsed.country)) return false;

    return parsed.number;
  },
  { toClassOnly: true },
);
export const ToRate = Transform(
  (value: string|number) => {
    const parsed = Number(value);
    if (parsed === NaN) return false;
    if (!(parsed >= 0) && !(parsed < 11)) return false;
    return parsed;
  },
  { toClassOnly: true },
);

@Injectable()
export class AppService {
  async getHello(): Promise<ResponseData> {
    return {
      success: true,
      message: 'successfully requested hello world',
      data: 'Hello World!'
    };
  }
}

@Injectable()
export class FileUploadService {
  constructor(
    @Inject("AttachmentModel") private attachmentModel: ModelClass<AttachmentModel>
  ) {}

  async addFile(file: FileParamDto,  folder: string): Promise<ResponseData> {
    const {buffer, originalname,size, mimetype} = file
    const key = uuid() + "." + originalname.split(".").pop()
    const params = {
      Body: buffer,
      location: `uploads/${key}`
    }
    await writeFileSync("uploads/" + key, buffer)
    const insertedAttach = await this.attachmentModel.query().insert({
      name: originalname,
      description: "",
      url: params.location,
      key: key,
      contentType: mimetype,
      size: size,
    })
    return {
      success: true,
      message: "file uploaded to s3 bucket successfully",
      data: insertedAttach
    }
  }
  async getFile(key): Promise<ResponseData> {
    const attachment = await this.attachmentModel.query().findOne('key', key)
    try {

      const file = attachment.url
      return {
        success: true,
        message: 'found file',
        data: file,
      }
    } catch(err) {
      return {
        success: false,
        message: "file couldnt be found!",
        data: err,
      }
    }
  }
  async removeFile(id: number): Promise<ResponseData> {
    const currentAttach = await this.attachmentModel.query()
    .findById(id)
    unlinkSync('uploads/'+currentAttach.key)
    const deletedAttach = await this.attachmentModel.query()
    .findById(id)
    .delete()
    if (deletedAttach) {
      return {
        success: true,
        message: "file removed successfully",
        data: {}
      }
    } else {
      return {
        success: false,
        message: "file was not uploaded!",
        data: {}
      }
    }
  }
}
