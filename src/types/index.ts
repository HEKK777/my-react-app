export interface ArtworkImage {
  url: string;
  thumbnail?: string;
  prompt?: string; // 单张图片的生成提示词
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url?: string; // 保留用于向后兼容
  images?: ArtworkImage[]; // 多张图片
  thumbnail?: string;
  createdAt: string;
  tags: string[];
  techniques: string[];
  prompt?: string; // 图片生成提示词
  storyboardPrompt?: string; // 分镜文字提示词
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
  gpa?: string; // 绩点，如 "3.8/4.0" 或 "90/100"
  courses?: string[]; // 主修课程列表
  achievements?: string; // 学术成就或荣誉
}

export interface Honor {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  advantages: string;
  education: Education[];
  honors: Honor[];
  socialLinks: {
    email: string;
    github?: string;
  };
  gender?: string; // 性别
  age?: number; // 年龄
}
