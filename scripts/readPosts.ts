import fs from 'fs/promises';
import path from 'path';

export interface MarkdownFile {
  name: string;
  content: string;
  date: string;
  id: string;
  tags:string[]
}

async function readMarkdownFiles(dir: string): Promise<MarkdownFile[]> {
    const files = await fs.readdir(dir, { withFileTypes: true });
  
    const markdownFiles: MarkdownFile[] = [];
  
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file.name);
  
        if (file.isFile() && path.extname(file.name) === '.md') {
          try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const fileName = path.basename(file.name, path.extname(file.name));
            const fileDate = getFileDateFromContent(fileContent);
            const tags = getTagsFromContent(fileContent);

            const markdownFile: MarkdownFile = {
              name: fileName,
              content: fileContent,
              date: fileDate,
              id: fileName,
              tags
            };
  
            markdownFiles.push(markdownFile);
          } catch (err) {
            console.error(`读取文件时发生错误：${err}`);
          }
        } else if (file.isDirectory()) {
          const subDirectoryFiles = await readMarkdownFiles(filePath);
          markdownFiles.push(...subDirectoryFiles);
        }
      })
    );
  
    return markdownFiles;
  }

  /**截取markdown内容，获取日期 */
  function getFileDateFromContent(content: string): string {
    const dateRegex = /date:\s*(.*)/;
    const match = content.match(dateRegex);
    return match ? match[1] : '';
  }

  function getTagsFromContent(content:string):string[] {
    const dateRegex = /tags:\s*(.*)/;
    const match = content.match(dateRegex);
    if (!match) {
        return []
    } else {
        return match[1].split("/")
    }
  }
  
/**
 * 读取 /posts 下所有markdowns，并解析
 * @returns 
 */
export const  readPosts = async () =>  {
  const targetDir = path.join(process.cwd(), "posts");
  try {
    const data = await readMarkdownFiles(targetDir)
    console.log("posts data>>",data)
    return data
  } catch(error) {
    console.log("error>>",error)
    return []
  }
}