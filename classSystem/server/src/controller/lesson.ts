import { Request, Response } from "express";
import { ILessonDocument, Lesson } from "../models";
import {FilterQuery} from 'mongoose';
export const list = async (req: Request, res: Response) => {
  let { category } = req.query;
  let offset: any = req.query.offset;
  let limit: any = req.query.limit;
  offset = isNaN(offset) ? 0 : parseInt(offset); //偏移量
  limit = isNaN(limit) ? 5 : parseInt(limit); //每页条数
  let query: FilterQuery<ILessonDocument> = {};
  if (category && category != "all") query.category = category as string;
  let total = await Lesson.count(query);
  let list = await Lesson.find(query)
    .sort({ order: 1 })
    .skip(offset)
    .limit(limit);
  list = list.map((item:ILessonDocument)=>item.toJSON());  
  setTimeout(function () {
    res.json({ code: 0, data: { list, hasMore: total > offset + limit } });
  }, 1000);
};
export const get = async (req: Request, res: Response) => {
  let id = req.params.id;
  let lesson = await Lesson.findById(id);
  res.json({ success: true, data: lesson });
};