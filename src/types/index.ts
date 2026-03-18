/**
 * 作品图片接口
 *
 * 表示单个作品图片的信息
 */
export interface ArtworkImage {
  /** 图片 URL 地址 */
  url: string;
  /** 缩略图 URL 地址（可选） */
  thumbnail?: string;
  /** 该图片的 AI 生成提示词（可选） */
  prompt?: string;
}

/**
 * 作品接口
 *
 * 表示一个 AI 创作作品的完整信息
 */
export interface Artwork {
  /** 作品唯一标识符 */
  id: string;
  /** 作品标题 */
  title: string;
  /** 作品描述 */
  description: string;
  /** 作品类型：图片或视频 */
  type: 'image' | 'video';
  /** 作品 URL（保留用于向后兼容） */
  url?: string;
  /** 多张图片集合（用于图片作品） */
  images?: ArtworkImage[];
  /** 缩略图 URL */
  thumbnail?: string;
  /** 创建时间 */
  createdAt: string;
  /** 作品标签列表 */
  tags: string[];
  /** 使用的技术/工具列表 */
  techniques: string[];
  /** 图片生成提示词 */
  prompt?: string;
  /** 分镜文字提示词（用于视频作品） */
  storyboardPrompt?: string;
}

/**
 * 教育经历接口
 *
 * 表示一段教育经历信息
 */
export interface Education {
  /** 学校名称 */
  school: string;
  /** 专业名称 */
  major: string;
  /** 学位 */
  degree: string;
  /** 学习时间段 */
  period: string;
  /** 绩点（如 "3.8/4.0" 或 "90/100"） */
  gpa?: string;
  /** 主修课程列表 */
  courses?: string[];
  /** 学术成就或荣誉 */
  achievements?: string;
}

/**
 * 荣誉奖项接口
 *
 * 表示一项荣誉或奖项
 */
export interface Honor {
  /** 奖项标题 */
  title: string;
  /** 颁发机构 */
  issuer: string;
  /** 获奖时间 */
  date: string;
  /** 奖项描述（可选） */
  description?: string;
}

/**
 * 用户个人资料接口
 *
 * 表示用户的完整个人信息
 */
export interface UserProfile {
  /** 姓名 */
  name: string;
  /** 个人简介/个人技术介绍 */
  bio: string;
  /** 头像 URL */
  avatar: string;
  /** 专业技能列表 */
  skills: string[];
  /** 个人优势 */
  advantages: string;
  /** 教育经历列表 */
  education: Education[];
  /** 荣誉奖项列表 */
  honors: Honor[];
  /** 社交媒体链接 */
  socialLinks: {
    /** 邮箱地址 */
    email: string;
    /** GitHub 主页（可选） */
    github?: string;
  };
  /** 性别（可选） */
  gender?: string;
  /** 年龄（可选） */
  age?: number;
  /** 电话号码（可选） */
  phone?: string;
}
