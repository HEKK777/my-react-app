import { Artwork, UserProfile } from '@/types';

// DEV-INJECT-START
// 自动排序作品集：图片大类在前，视频大类在后，各自按ID中的数字排序
export const sortArtworks = (artworks: Artwork[]): Artwork[] => {
  return [...artworks].sort((a, b) => {
    // 首先按类型排序：image 在前，video 在后
    if (a.type !== b.type) {
      return a.type === 'image' ? -1 : 1;
    }

    // 提取 ID 中的数字部分进行比较
    const extractNumber = (id: string): number => {
      const match = id.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const aNumber = extractNumber(a.id);
    const bNumber = extractNumber(b.id);

    return aNumber - bNumber;
  });
};
// DEV-INJECT-END

export const mockUserProfile: UserProfile = {
  name: '何建桉',
  bio: '熟练使用ComfyUI进行具体的工作流搭建，配合各种开源或闭源的CheckPoint以及Lora进行文生图、图生图、高清修复等基础的操作。会运用各种平台进行视频或图片的生成，如即梦、LiblibAI、Nano Banana等。对提示词的生成有一定的基础，会借助大语言模型进行提示词的生成以及优化。会使用剪映进行基础的剪辑工作。',
  avatar: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/20260319002459_14_257.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzIwMjYwMzE5MDAyNDU5XzE0XzI1Ny5wbmciLCJpYXQiOjE3NzM4NTExNTQsImV4cCI6MTgwNTM4NzE1NH0.BaqJBJ-EnIHONyVK8DpFSMxoWqyM7y-Zve149Oxlek4',
  skills: [
    'Stable Diffusion',
    'ComfyUI',
    'Gemini',
    'Nano Banana',
    'WebUI',
    '即梦',
    'LiblibAI',
    '剪映',
    'Seedance 2.0',
    '文生图',
    '图生图',
    '图生视频',
    '高清修复',
  ],
  advantages: '会使用多种AI艺术生成工具，能够快速实现创意想法，擅长AI工具与传统设计软件的协同工作流程。热衷于探索人工智能与艺术的边界，致力于打造独特的视觉体验。对计算机知识熟悉，熟悉代码编程，对新的AI工具知识有着充分的好奇，具备出色的学习能力和快速掌握新知识的能力。在团队项目中，能做到有效沟通确保需求明确，协调资源，与团队成员紧密合作，完成项目。',
  education: [
    {
      school: '广东海洋大学',
      major: '计算机科学与技术',
      degree: '本科',
      period: '2021-2025',
      gpa: '3.76/5.0',
      courses: ['数据结构', '计算机组成原理', '操作系统', '高等数学', '概率论', '数据库原理'],
      achievements: '曾获得校级优秀毕业生称号，成功参与开发了基于STM32的遥控机器人系统V1.0、基于智能语音识别的农田灌溉系统V1.0以及基于STM32的智能平衡车系统V1.0等三项计算机软件著作',
    },
  ],
  honors: [
    {
      title: '优秀奖学金',
      issuer: '广东海洋大学',
      date: '2021-2023',
      description: '连续三年获得优秀奖学金，包括2021学年的二等奖，2022学年的三等奖，以及2023学年的二等奖',
    },
    {
      title: '第十五届蓝桥杯全国软件和信息技术专业人才大赛广东赛区单片机设计与开发大学组一等奖',
      issuer: '蓝桥杯大赛组委会',
      date: '2024年',
    },
    {
      title: '第十五届蓝桥杯全国软件和信息技术专业人才大赛全国总决赛单片机设计与开发大学组三等奖',
      issuer: '蓝桥杯大赛组委会',
      date: '2024年',
    },
  ],
  socialLinks: {
    email: 'hekk777@163.com',
    github: 'https://github.com/HEKK777',
  },
  gender: '男',
  age: 22,
  phone: '13924221113',
};

export const mockArtworks: Artwork[] = [
  {
    id: 'image-1',
    title: '角色集',
    description: '使用即梦平台进行角色设计生存主视线图，并使用Nano Banana AI图像生成工具生成包含角色的三视图、日常表情、日常动作',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/Rkw2PMkh/image.jpg',
        thumbnail: 'https://i.ibb.co/Rkw2PMkh/image.jpg',
        prompt: '物全身三视图（正面侧面背面），四种日常的不同脸部表情特写，四种日常的不同的姿势，2D 游戏CG 人物描述：皮肤质感：皮肤细腻，自然瑕疵。 背景：黑色背景。全身像，视觉冲击力，光影交错， 材质：细节复杂，质感细腻，高细节，2D 游戏CG 灯光：45度侧光，轮廓光，2D 游戏CG 排版：三等分排版，第一排，三视图，第二排 人物表情；第三排，人物动作',
      },
      {
        url: 'https://i.ibb.co/C57VF6c8/image.jpg',
        thumbnail: 'https://i.ibb.co/C57VF6c8/image.jpg',
        prompt: '物全身三视图（正面侧面背面），四种日常的不同脸部表情特写，四种日常的不同的姿势，2D 游戏CG 人物描述：皮肤质感：皮肤细腻，自然瑕疵。 背景：黑色背景。全身像，视觉冲击力，光影交错， 材质：细节复杂，质感细腻，高细节，2D 游戏CG 灯光：45度侧光，轮廓光，2D 游戏CG 排版：三等分排版，第一排，三视图，第二排 人物表情；第三排，人物动作',
      },
      {
        url: 'https://i.ibb.co/4nthBsXy/image.jpg',
        thumbnail: 'https://i.ibb.co/4nthBsXy/image.jpg',
        prompt: '镜头拍摄人物全身三视图（正面侧面背面），四种日常的不同脸部表情特写，四种日常的不同的姿势，3D 游戏CG OC渲染质感 人物描述：皮肤质感：皮肤细腻，自然瑕疵。 背景：黑色背景。全身像，视觉冲击力，光影交错， 材质：细节复杂，质感细腻，高细节，3D 游戏CG OC渲染质感 灯光：45度侧光，轮廓光，3D 游戏CG OC渲染质感 排版：三等分排版，第一排，三视图，第二排 人物表情；第三排，人物动作',
      },
    ],
    createdAt: '2026-03-13',
    tags: ['角色形象', '角色集'],
    techniques: ['Nano Banana', '即梦'],
    prompt: 'Anime character design, front view, standing pose, clean lines, professional character sheet, white background, high quality, detailed',
  },
  {
    id: 'image-2',
    title: '产品海报',
    description: 'Comfyui工作流生成产品海报，展现产品细节',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/YB08q1Qt/image.png',
        thumbnail: 'https://i.ibb.co/YB08q1Qt/image.png',
        prompt: 'Digital,A photograph of sleek,silver-gray over-ear headphones with an black cushioned interior,suspended mid-air against a vibrant gray background. The headphones are surrounded by dynamic,dust-like particles,giving a sense of motion and energy. The rugged,textured rock formation below contrasts with the smooth,modern design of the headphones,emphasizing their futuristic appeal. The image is strikingly detailed,with a rich color palette and dramatic lighting that highlights the contours and materials of both the headphones and the rock.,',
      },
      {
        url: 'https://i.ibb.co/BRHYFQZ/image.png',
        thumbnail: 'https://i.ibb.co/BRHYFQZ/image.png',
        prompt: 'Digital,This is a photograph featuring a modern,minimalist workspace. Central to the image is a sleek,black keyboard with black and pink keycaps,placed on a dark gray surface. To the right,there\'s a closed silver laptop with a black keyboard and trackpad. In the bottom right corner,a smartphone with a gradient pink and white screen is placed. The lighting is soft,casting subtle shadows,and the overall aesthetic is embodies cyberpunk.',
      },
      {
        url: 'https://i.ibb.co/0Vn5PD76/775425270-b6b9a0449bc99b77cad89fe7599b39625d17c28ebcd8d6b898319bc0e7516954.png',
        thumbnail: 'https://i.ibb.co/0Vn5PD76/775425270-b6b9a0449bc99b77cad89fe7599b39625d17c28ebcd8d6b898319bc0e7516954.png',
        prompt: 'Commercial photography,This is a picture of a cosmetics advertisement showing a bottle of skin care products with a gold lid in a white bottle,surrounded by a large number of white flowers and green leaves. The background is a clear blue sky,and the sun shines on the bottles through the leaves,creating a fresh and natural atmosphere. The overall composition is simple and elegant,and the colors are harmonious,giving people a high-end and pure feeling.,highly detailed,ultra-high resolutions,32K UHD,best quality,masterpiece,',
      },
    ],
    createdAt: '2026-03-04',
    tags: ['海报', '产品', '设计'],
    techniques: ['Flux.1', 'Lora', 'Nano Banana'],
    prompt: '作品级别的通用提示词',
  },
  {
    id: 'image-3',
    title: '毛绒玩偶设计',
    description: 'Comfyui生成毛绒玩偶的表现力，可爱或者圆鼓鼓的毛绒玩偶谁不喜欢呢',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/N2shMJGj/3.png',
        thumbnail: 'https://i.ibb.co/N2shMJGj/3.png',
        prompt: 'A whimsical plush bunny in Jellycat style,with extra long ears and a chubby,fluffy body,sitting with a playful smile and big,shiny eyes. The bunny has soft,pastel pink fur and is surrounded by tiny plush carrots. The background is a gradient from soft lavender to pale peach,enhancing the cozy and dreamy feel -- cartoon style,high detail,warm lighting,HD quality,',
      },
      {
        url: 'https://i.ibb.co/rf06c5Pm/2.png',
        thumbnail: 'https://i.ibb.co/rf06c5Pm/2.png',
        prompt: 'A plump lion plush toy with an oversized fluffy mane and a short rounded muzzle. Its body is round and soft, made with pastel honey yellow and creamy white fur, and the lion has a gentle, sleepy expression. The toy sits with its chubby legs spread slightly, giving it a relaxed and huggable appearance. The background is a warm pastel orange, enhancing the sense of comfort and warmth. Lighting: Warm and soft light to emphasize the plush softness. Background: Solid pastel pink or soft cream for a soothing effect.',
      },
      {
        url: 'https://i.ibb.co/PvNvP29N/1.png',
        thumbnail: 'https://i.ibb.co/PvNvP29N/1.png',
        prompt: 'A super cute chubby 3D cartoon bear, centered in the frame, sitting upright facing the camera. The bear has warm brown matte soft clay texture, a large round cream-white belly, and cream-white inner ears. There are two small curly tufts of hair on the top of its head. It has big round shiny black eyes, a small round black nose, round pink blush on both cheeks, and a cheerful open smile showing a tiny pink tongue. It has short stubby arms naturally placed on both sides of its body, short round feet with subtle toe lines, sitting steadily. The background is a solid soft warm orange gradient, clean and without any extra elements. The lighting is soft and even diffused light, with a gentle soft shadow under the bear, the whole picture has a warm healing tone, smooth rounded edges, no sharp corners, full body shot, no cropping.',
      },
    ],
    createdAt: '2026-03-04',
    tags: ['玩偶', '卡通', '设计'],
    techniques: ['Flux.1', 'Lora'],
    prompt: '作品级别的通用提示词',
  },
  {
    id: 'image-4',
    title: '建筑设计系列',
    description: '基于Flux.1基础模型配合不同风格的Lora生成的建筑设计系列。包含不同风格的室内室外建筑作品。',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/yBq3KSPP/1.png',
        thumbnail: 'https://i.ibb.co/yBq3KSPP/1.png',
        prompt: 'This photograph captures a modern, two-story house at dusk, featuring a blend of traditional and contemporary architectural elementsThe house has a sloped, dark-tiled roof with a curved edge, reminiscent of traditional East Asian designThe ground floor is dominated by large, floor-to-ceiling glass windows, warmly illuminated from within, revealing a spacious interiorIn the foreground, a wooden bridge with a simple, elegant design extends from the right side of the image towards the center, leading to the house\'s entranceThe bridge is surrounded by a meticulously maintained garden, filled with vibrant, multicolored flowers, including red, white, and pink bloomsSmall, neatly trimmed shrubs and a few larger, more mature trees add greenery to the sceneA prominent, natural rock sculpture sits to the left of the bridge, adding a touch of traditional artistry to the modern settingA small, reflective pond is visible to the right, bordered by more rocks and lush greeneryThe house\'s exterior walls are a combination of glass and dark wood, providing a sleek, modern contrast to the more traditional elementsThe overall composition blends natural beauty with modern elegance, creating a serene and inviting atmosphere.',
      },
      {
        url: 'https://i.ibb.co/qM0hWMYS/F-1-Lora-Hiresfix-00026.png',
        thumbnail: 'https://i.ibb.co/qM0hWMYS/F-1-Lora-Hiresfix-00026.png',
        prompt: 'a well-decorated bedroom with a warm and inviting atmosphereThe room features a large bed with a brown leather headboard, adorned with various pillows in shades of brown, cream, and redThe bedspread is a combination of cream and red floral patterns. On either side of the bed, there are wooden nightstands with drawersEach nightstand has a lamp with a classic design, providing soft lightingThe lamps have cream-colored shades that match the room\'s overall color scheme. Above the bed, there are two framed pictures hanging on the wallThe left picture appears to be a black-and-white photograph of a cityscape, while the right one is a color photograph featuring a person holding a red object. The room has a wooden floor with a patterned rug that has red and cream flowersThe walls are painted in a light beige color, and there are decorative elements such as paneling and a ceiling fan with a chandelier above the bed. The room is well-lit with natural light coming through a large window, which is partially covered by brown curtainsThe overall design of the room is elegant and cozy, making it a comfortable and aesthetically pleasing space.',
      },
      {
        url: 'https://i.ibb.co/8LB1d14h/F-1-Lora-Hiresfix-00025.png',
        thumbnail: 'https://i.ibb.co/8LB1d14h/F-1-Lora-Hiresfix-00025.png',
        prompt: 'This photograph captures a modern urban architectural scene at dusk, featuring a contemporary building with a distinctive curved, multi-story facade.The building\'s top levels are clad in deep navy blue and black glass panels, with an expansive, lush green living wall clearly visible across the upper facade.The frame is oriented directly toward the building, positioning it as the central focal point of the shot.In the background, additional tall, glass-clad high-rise buildings stand in view, their windows glowing with warm interior light.At ground level, there is a wide, open public plaza, with a large circular water feature on its left side, and lush greenery including mature trees and manicured shrubs lining both sides of the space.\nThe sky is a deep, rich navy blue, clearly indicating the dusk hour.The structure is illuminated by warm artificial lighting, which accentuates the building\'s unique architectural features and creates crisp, luminous reflections across its glass surfaces.The overall aesthetic is sleek, contemporary and fluid, defined by clean, minimalist lines, with a sharp focus on modern architectural design.',
      },
    ],
    createdAt: '2026-03-05',
    tags: ['建筑', '现代', '设计'],
    techniques: ['Flux.1', 'Lora'],
    prompt: '建筑设计的通用提示词模板',
  },
  {
    id: 'image-5',
    title: '崩坏：星穹铁道卡芙卡Lora训练',
    description: '基于Flux.1基础模型为基底，训练的崩坏：星穹铁道卡芙卡Lora模型，在以Flux.1为大模型使用下配合该Lora可直接生成的卡芙卡外貌风格，不需过多的解释词描述，效果优良',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/FkqyzwMN/776985536-a18c5e52434ee985797fbf407561ed8a51b09cd7afb402b9fa20248256573ce5.png',
        thumbnail: 'https://i.ibb.co/FkqyzwMN/776985536-a18c5e52434ee985797fbf407561ed8a51b09cd7afb402b9fa20248256573ce5.png',
      },
      {
        url: 'https://i.ibb.co/VYsgrQjy/F-1-Lora-Hiresfix-00022.png',
        thumbnail: 'https://i.ibb.co/VYsgrQjy/F-1-Lora-Hiresfix-00022.png',
      },
      {
        url: 'https://i.ibb.co/fGNrmNsC/776983948-f9eebdfe577e1acaffc45a6776d3128ce43c599eb9b62d59efb6b61c4407e61d.png',
        thumbnail: 'https://i.ibb.co/fGNrmNsC/776983948-f9eebdfe577e1acaffc45a6776d3128ce43c599eb9b62d59efb6b61c4407e61d.png',
      },
      {
        url: 'https://i.ibb.co/6J41YKbk/775459238-af4943a36532a78ad4a788e61828b18f673f3e261ee36b85f74e5305eddbd409.png',
        thumbnail: 'https://i.ibb.co/6J41YKbk/775459238-af4943a36532a78ad4a788e61828b18f673f3e261ee36b85f74e5305eddbd409.png',
      },
      {
        url: 'https://i.ibb.co/MynNKqWS/775458805-28383ed6b0d88840d0e92bf41310fe289fcd60f71b29819de295de610b2f1f42.png',
        thumbnail: 'https://i.ibb.co/MynNKqWS/775458805-28383ed6b0d88840d0e92bf41310fe289fcd60f71b29819de295de610b2f1f42.png',
      },
      {
        url: 'https://i.ibb.co/v4v53vKj/775459502-2922d12293dbbc1fbd7e3d6a7837c73d119673004545d35042e2d356ee173bc3.png',
        thumbnail: 'https://i.ibb.co/v4v53vKj/775459502-2922d12293dbbc1fbd7e3d6a7837c73d119673004545d35042e2d356ee173bc3.png',
      },
      {
        url: 'https://i.ibb.co/tMCndpwL/775458806-2aff52409cdad3eccd1d686c52fd6aa0fcc2f1f60d9fe955a85394c29d311c37.png',
        thumbnail: 'https://i.ibb.co/tMCndpwL/775458806-2aff52409cdad3eccd1d686c52fd6aa0fcc2f1f60d9fe955a85394c29d311c37.png',
      },
      {
        url: 'https://i.ibb.co/N2kLC9ds/775459501-e10cdd6efc64d4918f1fa9b3bbce56966c1052688ff8687a7147e5072fc32da6.png',
        thumbnail: 'https://i.ibb.co/N2kLC9ds/775459501-e10cdd6efc64d4918f1fa9b3bbce56966c1052688ff8687a7147e5072fc32da6.png',
      },
      {
        url: 'https://i.ibb.co/VcZVLjWs/776983949-311c68dc0102d3f9bab88b98e0e3effd27b7f27dc1626df0d59229ffecb10189.png',
        thumbnail: 'https://i.ibb.co/VcZVLjWs/776983949-311c68dc0102d3f9bab88b98e0e3effd27b7f27dc1626df0d59229ffecb10189.png',
      },
      {
        url: 'https://i.ibb.co/mrc6sh5y/4.png',
        thumbnail: 'https://i.ibb.co/mrc6sh5y/4.png',
      },
      {
        url: 'https://i.ibb.co/b5NV6Nh7/421412124124.png',
        thumbnail: 'https://i.ibb.co/b5NV6Nh7/421412124124.png',
      },
      {
        url: 'https://i.ibb.co/bY9W4nZ/212321.png',
        thumbnail: 'https://i.ibb.co/bY9W4nZ/212321.png',
      },
      {
        url: 'https://i.ibb.co/s9kbqHDS/4214124214.png',
        thumbnail: 'https://i.ibb.co/s9kbqHDS/4214124214.png',
      },
    ],
    createdAt: '2026-03-04',
    tags: ['卡通', '动画', '角色形象'],
    techniques: ['Flux.1', 'Lora训练'],
  },
  {
    id: 'image-6',
    title: '文旅海报',
    description: '文生图，生成以清晰实景地标建筑照片为主体，配合简洁留白的排版和中英文字体结合，突出城市名与文化地标，目的是传递出城市形象与文化自信，兼具信息传达与艺术美感',
    type: 'image',
    url: 'https://i.ibb.co/zhDCLtY3/image.png',
    thumbnail: 'https://i.ibb.co/zhDCLtY3/image.png',
    createdAt: '2026-03-10',
    tags: ['人文', '城市', '海报', '文生图'],
    techniques: ['Qwen-image', 'Lora'],
    prompt: '画面以广州珠江新城为主视觉,珠江水面映照着夜色下的城市天际线,广州塔与周大福金融中心,广州国际金融中心在霓虹与云光中交相辉映,呈现出金属般冷峻的现代质感与广府文化的温润底蕴,建筑的轮廓被精确地描摹,灯光勾勒出羊城的节奏与脉搏,海报上方以大气的中文书法字体写着 "广州",笔锋洒脱如珠江江水流动,下方以细腻的无衬线英文字母 "GUANGZHOU" 横向排布,与建筑的垂直线条形成强烈对比,画面底部的副标题以极简排版呈现:"珠江・广州塔・羊城的光影",整体色调以深蓝与金橙对比,突出城市夜色的高级氛围,画面兼具摄影写实与平面构成美感,展现出岭南千年商都的力量与艺术张力,',
  },
  {
    id: 'video-1',
    title: '圣骑士AI动画短片',
    description: '使用Gemini编写分镜描述，通过即梦平台使用Seedance 2.0模型进行分镜画面生成',
    type: 'video',
    url: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/hq.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLL2hxLm1wNCIsImlhdCI6MTc3MzY1NTIwNCwiZXhwIjoxODA1MTkxMjA0fQ.Lf583R8z6vErcVMYr7q_MOMyjXSnC0MdB5flHh1inZ8',
    thumbnail: 'https://i.ibb.co/3mzswkfN/image.png',
    storyboardPrompt: '核心统一基准：全程严格还原参考图角色设定与画风，线条干净利落，上色细腻，8K 动画电影级画质，角色造型、配色、光影全程与参考图 100% 匹配，无多余元素，动作自然流畅不崩人设。 镜头一（0s–3s） 固定机位慢推镜头，画面以参考图的全身立绘为起始，角色保持双手持剑竖于身前的姿态，金色长发与裙摆随微风轻柔飘动，紫色眼眸温柔注视镜头，嘴角带浅淡笑意，暖金色轮廓光在人物边缘缓慢流动，画面聚焦人物神态，全程画风造型完全贴合参考图；搭配轻柔衣料摩擦声、微风拂动的细碎环境音。 镜头二（3s–6s） 机位随人物动作平稳横移，始终保持人物在画面中心；角色身姿微微侧转，双手稳握剑柄，将蓝银圣剑缓缓横于身前，金色长发随转身动作自然扬起，裙摆同步轻摆，眼神从温柔笑意转为坚定专注，暖金色轮廓光随动作勾勒出流畅的身体线条，画风、造型、配色严格还原参考图；搭配剑身轻鸣、衣料摆动的清脆音效。 镜头三（6s–10s） 机位缓慢拉远，从人物上半身平稳拉回完整全身画面；角色双手持剑向前轻送，剑尖微向下，做出神官持剑致意的礼仪动作，紫色眼眸重新弯起，露出治愈温柔的笑容，长发与裙摆缓缓回落，暖金色高光在剑身与发丝上柔和流转，最终画面定格在与参考图高度一致的全身立绘姿态，全程画风造型无偏差；搭配剑身清透颤响、轻柔治愈风铃声收尾。',
    createdAt: '2024-02-01',
    tags: ['动画', '图生视频', '分镜'],
    techniques: ['Gemini', 'Seedance 2.0'],
    prompt: 'Epic holy paladin fantasy animation, divine power, heroic journey',
  },
  {
    id: 'video-2',
    title: '香水广告',
    description: '基于Gemini3和Nano Banana生成香水广告的分镜生成词以及分镜图，导入分镜图使用即梦以及小云雀的Seedance 2.0模型进行香水广告分镜的生成',
    type: 'video',
    url: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/6c06f552beec18d5ba2b5462bb667b93.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzZjMDZmNTUyYmVlYzE4ZDViYTJiNTQ2MmJiNjY3YjkzLm1wNCIsImlhdCI6MTc3Mzc3MDcyNiwiZXhwIjoxODA1MzA2NzI2fQ.U8tmnirY2UwyXdn83gF5_xB14Lw6oobAPG3Gf8jaoqY',
    thumbnail: 'https://i.ibb.co/Y4V0yqmx/40ae69a4-8265-4602-b5d5-8cec39f4a617.png',
    images: [
      {
        url: 'https://i.ibb.co/Y4V0yqmx/40ae69a4-8265-4602-b5d5-8cec39f4a617.png',
        thumbnail: 'https://i.ibb.co/Y4V0yqmx/40ae69a4-8265-4602-b5d5-8cec39f4a617.png',
        prompt: '3x3网格分镜故事板 - 完整香水广告分镜概览',
      },
      {
        url: 'https://i.ibb.co/gLJf5bR0/1.png',
        thumbnail: 'https://i.ibb.co/gLJf5bR0/1.png',
        prompt: '景别: 特写 (Close-up)\n主体物: 香奈儿香水瓶的方形银色瓶盖与金色颈部。\n动态: 晨光刚刚照射在瓶盖上，金属折射出耀眼而柔和的星芒。\n环境: 纯净的白色大理石梳妆台，背景是柔和虚化的晨曦光斑。\n提示词: 特写，香奈儿香水瓶的方形银色瓶盖与金色颈部，晨光照射在瓶盖上，金属折射出耀眼而柔和的星芒，纯净的白色大理石梳妆台，背景是柔和虚化的晨曦光斑，电影级光影，高级质感，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/vCdsPJmQ/2.png',
        thumbnail: 'https://i.ibb.co/vCdsPJmQ/2.png',
        prompt: '景别: 中近景 (Medium Close-up)\n主体物: 一位气质优雅的女性（穿着真丝睡袍）的手。\n动态: 女性修长白皙的手指轻轻握住圆润的香水瓶身，正准备将其拿起。\n环境: 晨光透过薄纱窗帘洒入室内，室内光线呈现出梦幻的浅紫色调，氛围静谧。\n转场思考：从瓶身局部自然过渡到人物与产品的互动\n提示词: 中近景，一位气质优雅女性的手，修长白皙的手指轻轻握住圆润的香奈儿香水瓶身正准备拿起，晨光透过薄纱窗帘洒入，室内光线呈现出梦幻的浅紫色调，氛围静谧，柔和电影光，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/Zzy5Sj1h/3.png',
        thumbnail: 'https://i.ibb.co/Zzy5Sj1h/3.png',
        prompt: '景别: 特写 (Extreme Close-up)\n主体物: 香水喷头与喷出的细腻水雾。\n动态: 喷头被按下，香水化作极其细腻的雾气喷涌而出，在逆光下仿佛无数颗闪耀的紫金色钻石飞舞。\n环境: 背景被完全虚化为深邃的暗调，以极度凸显水雾的璀璨和轻盈。\n转场思考：水雾弥漫整个屏幕，作为无缝转场（Match Cut）进入下一个主观感受的画面\n提示词: 微距特写，香水喷头被按下，极其细腻的香水雾气喷涌而出，在逆光下仿佛无数颗闪耀的紫金色钻石飞舞，背景完全虚化为深邃的暗调以凸显水雾的璀璨，高速摄影质感，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/Y9KHwX2/4.png',
        thumbnail: 'https://i.ibb.co/Y9KHwX2/4.png',
        prompt: '景别: 近景 (Close Shot)\n主体物: 女性美丽的颈部与锁骨。\n动态: 香水雾气如轻纱般落在她的肌肤上，她微微仰起头，闭着眼睛感受香气。\n环境: 画面充满柔和的紫色柔光（Bokeh），仿佛空气中都弥漫着花香，画面边缘微虚。\n提示词: 近景，女性美丽的颈部与锁骨特写，香水雾气如轻纱般落在肌肤上，女性微微仰起头闭着眼睛感受香气，画面充满柔和的紫色光斑，空气中弥漫着梦幻感，电影级柔光，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/RGWQ4bzS/5.png',
        thumbnail: 'https://i.ibb.co/RGWQ4bzS/5.png',
        prompt: '景别: 特写 (Close-up)\n主体物: 香水瓶内部通透的薰衣草紫色液体。\n动态: 液体在瓶内优雅地微微流转、晃动，光线穿透液体，折射出波光粼粼的高级光影。\n环境: 画面剔除杂乱背景，纯粹展现产品液体的澄澈、神秘与光泽。\n转场思考：液体的波光粼粼与下一帧女性睁开眼睛的眼波流转形成意象上的呼应\n提示词: 特写，香水瓶内部通透的薰衣草紫色液体，液体在瓶内优雅地微微流转晃动，光线穿透液体折射出波光粼粼的高级光影，纯粹的微距质感，极致通透，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/k28dcQFz/6.png',
        thumbnail: 'https://i.ibb.co/k28dcQFz/6.png',
        prompt: '景别: 特写 (Close-up)\n主体物: 女性的面部，尤其是眼睛。\n动态: 女性缓缓睁开双眼，眼神中充满了自信、力量与迷人的光彩，嘴角带着一抹似有若无的微笑。\n环境: 她的眼眸中反射出微弱的紫金色光芒，背景是明亮而现代的室内环境，虚化处理。\n提示词: 特写，女性美丽的脸庞，缓缓睁开双眼，眼神中充满自信力量与迷人光彩，嘴角带着自信微笑，眼眸中反射出微弱的紫金色光芒，背景明亮且虚化，情绪饱满，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/7JTCmDKJ/7.png',
        thumbnail: 'https://i.ibb.co/7JTCmDKJ/7.png',
        prompt: '景别: 全景 (Wide Shot)\n主体物: 换上了一袭高级质感长裙（淡紫色或香槟色）的女性。\n动态: 她步伐轻盈、自信地走过一条充满阳光的现代玻璃艺术连廊，裙摆随风飘逸。\n环境: 阳光穿透玻璃，在地上投下几何光影，整体空间通透、大气、充满都市高级感。\n转场思考：从内在的唤醒直接切换到外在的自信展现，用宽阔的视野提升广告的调性\n提示词: 全景，穿着高级质感淡紫色长裙的女性，步伐轻盈自信地走过充满阳光的现代玻璃艺术连廊，裙摆飘逸，阳光穿透玻璃投下几何光影，空间通透大气，顶级时尚大片质感，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/ZzL8PS97/8.png',
        thumbnail: 'https://i.ibb.co/ZzL8PS97/8.png',
        prompt: '景别: 中景 (Medium Shot)\n主体物: 女性回眸看镜头。\n动态: 她走动中优雅地回过头，对着镜头留下一个极具魅力和感染力的笑容，发丝在风中飞扬。\n环境: 背后是强烈的逆光（暖阳），为她镀上了一层金色的轮廓光，画面充满生命力。\n转场思考：人物看向镜头，与观众产生互动，随后人物在光芒中淡出，引出最后的英雄产品镜头\n提示词: 中景，女性优雅地回眸看向镜头，留下极具魅力和感染力的笑容，发丝在风中飞扬，背后是强烈的逆光暖阳，为她镀上一层金色的轮廓光，画面充满生命力，电影级构图，16:9画幅。',
      },
      {
        url: 'https://i.ibb.co/kV9L0rSx/9.png',
        thumbnail: 'https://i.ibb.co/kV9L0rSx/9.png',
        prompt: '景别: 特写 (Close-up / Hero Shot)\n主体物: CHANCE CHANEL EAU SPLENDIDE 香水。\n动态: 香水瓶静静地矗立在画面中央，高贵而夺目，瓶身的"CHANCE CHANEL"字样清晰可见。\n环境: 置于一片泛着微光的浅紫罗兰色水波纹镜面之上，底部有轻微的倒影，周围环绕着极淡的金色光晕。\n提示词: 产品特写，CHANCE CHANEL EAU SPLENDIDE香水静静矗立在画面中央，瓶身字样清晰，置于泛着微光的浅紫罗兰色水波纹镜面之上，带有轻微倒影，周围环绕极淡的金色光晕，顶级商业摄影，光影完美，16:9画幅。',
      },
    ],
    storyboardPrompt: '香水广告分镜脚本：\n\n第一行：邂逅与触碰 (0-5秒)\n镜头一：特写香水瓶的银色瓶盖与金色颈部，晨光照射产生星芒效果\n镜头二：中近景女性手部握住香水瓶，晨光透过薄纱窗帘营造梦幻紫色调\n镜头三：微距特写香水喷雾，逆光下呈现紫金色钻石飞舞效果\n\n第二行：沉浸与唤醒 (5-10秒)\n镜头四：近景女性颈部锁骨，香水雾气落在肌肤上，紫色柔光氛围\n镜头五：特写香水瓶内紫色液体流转，光线折射波光粼粼\n镜头六：特写女性面部，缓缓睁眼，眼神自信迷人\n\n第三行：绽放与铭记 (10-15秒)\n镜头七：全景女性身着淡紫色长裙走过玻璃艺术连廊\n镜头八：中景女性回眸看镜头，金色轮廓光，充满生命力\n镜头九：产品特写，CHANCE CHANEL香水置于浅紫罗兰色水波纹镜面',
    createdAt: '2026-03-17',
    tags: ['广告', '宣传', '分镜'],
    techniques: ['Gemini', 'Nano Banana', 'Seedance 2.0'],
    prompt: '香水广告分镜创作，展现高级奢侈品广告的完美视觉',
  },
  {
    id: 'image-7',
    title: '模特服装换装',
    description: '使用Flux.1大模型配合各种风格模型Lora生成模型任务图，然后使用Qwen_Image_Edit_2511大模型搭建ComfyUI双图工作流，配合换装迁移Lora实现服装换装',
    type: 'image',
    images: [
      {
        url: 'https://i.ibb.co/fVX6fZNK/1773741701409.png',
        thumbnail: 'https://i.ibb.co/fVX6fZNK/1773741701409.png',
        prompt: '男装换装迁移',
      },
      {
        url: 'https://i.ibb.co/Rkm992h3/1773741954118.png',
        thumbnail: 'https://i.ibb.co/Rkm992h3/1773741954118.png',
        prompt: '女装换装迁移',
      },
      {
        url: 'https://i.ibb.co/6Rdhd74n/1773745016698.jpg',
        thumbnail: 'https://i.ibb.co/6Rdhd74n/1773745016698.jpg',
        prompt: '童装换装迁移',
      },
      {
        url: 'https://i.ibb.co/Kcm1jC2D/2026-03-18-16-02-21.png',
        thumbnail: 'https://i.ibb.co/Kcm1jC2D/2026-03-18-16-02-21.png',
        prompt: '在LiblibAI搭建ComfyUI工作流实现模特换装',
      },
    ],
    createdAt: '2026-03-17',
    tags: ['模特', '服装', '换装'],
    techniques: ['Flux.1', 'Qwen-Edit', 'ComfyUI'],
  },
  {
    id: 'video-3',
    title: '樱花狐妖IP设计',
    description: '使用即梦平台Agent生成了一个IP形象，并生产它的三视图、多种动作，表情、多种服饰参考图和相关周边产品图,然后使用Seedance2.0首帧率生成产品周边动态视频',
    type: 'video',
    url: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/6b9a06435e3cef3fd1c423f0c661aae6_raw%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzZiOWEwNjQzNWUzY2VmM2ZkMWM0MjNmMGM2NjFhYWU2X3JhdyAoMSkubXA0IiwiaWF0IjoxNzczODI2MTc0LCJleHAiOjE4MDUzNjIxNzR9.0qVNHHJIJa9dSNEy9Q2MJmAp_QeIhtaGRaSwkc4quaI',
    thumbnail: 'https://i.ibb.co/6JctpDK6/image.png',
    images: [
      {
        url: 'https://i.ibb.co/FQc1Rkp/image.png',
        thumbnail: 'https://i.ibb.co/FQc1Rkp/image.png',
        prompt: '狐妖·胭脂雾款，OC渲染器渲染，泡泡马特风格，3D立体，q版可爱，哑光树脂(表面呈烟粉胭脂哑光，纹路处嵌浅金细闪，触感略带细腻颗粒)，纹路显层次阴影，面部颊边叠胭脂色反光，，OC渲染器，潮玩风格，浅色背景，超现实主义。绢丝肌理面部染胭脂晕，水墨晕染山茶枝，极简主义，大留白，明制披风(绣山茶团花)，全身，中式留白'
      },
      {
        url: 'https://i.ibb.co/5XcSg91B/image.png',
        thumbnail: 'https://i.ibb.co/5XcSg91B/image.png',
        prompt: '生成角色白色背景图'
      },
      {
        url: 'https://i.ibb.co/qYw76fQ1/image.png',
        thumbnail: 'https://i.ibb.co/qYw76fQ1/image.png',
        prompt: '将这个ip生成三视图(分别是:正面，侧面，背面)，整合在一张图上'
      },
      {
        url: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/20260318234420_13_257.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzIwMjYwMzE4MjM0NDIwXzEzXzI1Ny5wbmciLCJpYXQiOjE3NzM4NDg5NjAsImV4cCI6MTgwNTM4NDk2MH0.1LMer0-dnHKvUKBN2OeJdFlF4x8OT7AHBWg3YasZ8XI',
        thumbnail: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/20260318234420_13_257.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzIwMjYwMzE4MjM0NDIwXzEzXzI1Ny5wbmciLCJpYXQiOjE3NzM4NDg5NjAsImV4cCI6MTgwNTM4NDk2MH0.1LMer0-dnHKvUKBN2OeJdFlF4x8OT7AHBWg3YasZ8XI',
        prompt: 'IP形象动作延展，生成一套8张不同表情和动态的设计延展。表情和动作幅度大,活泼夸张，尺寸3:4'
      },
      {
        url: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/20260318234415_12_257.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzIwMjYwMzE4MjM0NDE1XzEyXzI1Ny5wbmciLCJpYXQiOjE3NzM4NDg3ODIsImV4cCI6MTgwNTM4NDc4Mn0.HdsSCe9jR2VqXsPx4ZaMB4enDZSb2dUIfozvo9Z95NQ',
        thumbnail: 'https://vdapqfpvimuynuebchuz.supabase.co/storage/v1/object/sign/HEKK/20260318234415_12_257.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80Y2M3MjVmNi1iZmQ2LTRmMWYtOTU3ZS1iZGQyOTZiMGUxZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIRUtLLzIwMjYwMzE4MjM0NDE1XzEyXzI1Ny5wbmciLCJpYXQiOjE3NzM4NDg3ODIsImV4cCI6MTgwNTM4NDc4Mn0.HdsSCe9jR2VqXsPx4ZaMB4enDZSb2dUIfozvo9Z95NQ',
        prompt: '生成角色8种不同现代/古风风格衣服搭配，配饰，造型，可爱、甜酷、软萌等，保持角色一致性(原图发型不变)，白色背景'
      },
      {
        url: 'https://i.ibb.co/6JctpDK6/image.png',
        thumbnail: 'https://i.ibb.co/6JctpDK6/image.png',
        prompt: 'IP形象周边产品设计，风格可爱童趣，专业布光，专业产品摄影。物品有:异形名片、多个徽章、咖啡提手架、包装袋、多个贴纸、咖啡杯及杯套、围巾、袜子、手套等配饰、线圈笔记本、毛绒抱枕、手机壳、手提袋、钥匙链、眼罩等物品。每个物品里的元素都是用参考图里的ip去延展的，把整批物料在一个画面的展示每个产品有秩序的陈列在一起。下方有着一个毛绒展台，背景是白色，呈现统一的品牌标受与风格专业的品牌视觉氛围突出产品多样性与品牌一致性，背景干净，契合可爱品牌包装设定定位实景拍摄'
      },
    ],
    createdAt: '2026-03-15',
    tags: ['IP形象', '图片', '视频'],
    techniques: ['即梦', 'Seedance 2.0'],
  },
];
