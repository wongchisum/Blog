/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 16:00:54
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-30 10:46:34
 *
 * 通过解析命令行参数，去创建对应的markdown文件
 *
 * 执行命令 pnpm create-post [title] [tags] 进行创建
 */
import { DateTime } from "luxon";
import path from "path";
import fs from "fs";

const createPost = (title: string, dir: string) => {
  const date = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"); // 获取当前时间

  const content = `---
title: '${title}'
date: '${date}'
---
  
  <!-- 在此处编写文章内容 -->`;
  const replaceReg = /[\s:]/g;
  // const fileName = `${date.replace(replaceReg, "-")}-${title.replace(
  //   replaceReg,
  //   "-"
  // )}.md`; // 生成文件名
  const fileName = `${title.replace(replaceReg, "-")}.md`; // 生成文件名
  const filePath = `${dir}/${fileName}`;
  fs.writeFile(filePath, content, "utf-8", (err) => {
    if (err) {
      console.error(`写入文件时发生错误：${err}`);
    } else {
      console.log(`Markdown 文件已创建：${fileName}`);
    }
  });
};

// 解析命令行参数
const [title = "untitled"] = process.argv.slice(2);

// 创建在posts目录下
const targetDir = path.join(process.cwd(), "posts");

createPost(title, targetDir);
