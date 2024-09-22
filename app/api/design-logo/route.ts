import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});
const gradients = [
  '蓝色(#3498db)到绿色(#2ecc71)',
  '紫色(#9b59b6)到粉色(#e91e63)',
  '橙色(#e67e22)到黄色(#f1c40f)',
  '深蓝(#2c3e50)到浅蓝(#3498db)',
  '红色(#e74c3c)到橙色(#e67e22)',
  '绿色(#27ae60)到青色(#1abc9c)',
  '粉色(#e91e63)到紫色(#9b59b6)',
  '灰色(#95a5a6)到白色(#ecf0f1)',
  '深紫(#8e44ad)到浅紫(#9b59b6)',
  '棕色(#d35400)到米色(#f39c12)'
];

const shapes = [
  '圆形与三角形的交叉',
  '正方形内嵌圆形',
  '六边形与星形的结合',
  '波浪线围绕圆形',
  '菱形与矩形的叠加',
  '半圆与直线的组合',
  '螺旋形与点的配合',
  '椭圆与十字线的交织',
  '多边形与圆弧的融合',
  '心形与方形的结合'
];

const contrastColors = [
  '深蓝底色配浅黄细节',
  '深绿背景配浅粉描边',
  '紫色主体配明黄点缀',
  '褐色底色配浅蓝轮廓',
  '黑色背景配亮绿细节',
  '深红主色配浅青勾勒',
  '灰色底色配白色线条',
  '墨绿背景配浅橙描绘',
  '深紫底色配浅绿装饰',
  '藏青主色配浅粉点缀'
];

const darkAccents = [
  '深蓝(#34495e)阴影效果',
  '墨绿(#1e272e)边框线条',
  '深紫(#4a148c)装饰点',
  '深棕(#6d4c41)细节勾勒',
  '深灰(#37474f)背景衬托',
  '深红(#b71c1c)强调重点',
  '深青(#006064)点缀效果',
  '深橙(#e65100)局部填充',
  '深粉(#880e4f)轮廓描绘',
  '深绿(#1b5e20)装饰线条'
];

const roundedDesigns = [
  '圆角矩形框',
  '半圆角三角形',
  '圆角梯形设计',
  '波浪边缘圆角效果',
  '不规则圆角多边形',
  '圆角心形图案',
  '圆角星形设计',
  '圆角螺旋线条',
  '圆角箭头指示',
  '圆角云朵形状'
];

const symbolicDesigns = [
  '茶叶形状代表自然',
  '蒸汽曲线象征温暖',
  '珍珠圆点暗示多样',
  '吸管图案代表享受',
  '杯子轮廓象征容器',
  '冰块形状暗示清凉',
  '波浪线条代表液体',
  '花朵图案象征芳香',
  '旋涡设计暗示混合',
  '气泡元素代表活力'
];

const colorSchemes = [
  '蓝绿配淡粉',
  '青蓝搭配米黄',
  '湖蓝配柔橙',
  '薄荷绿配浅紫',
  '孔雀蓝配珊瑚色',
  '碧绿配淡蓝',
  '青碧色配奶白',
  '蔚蓝配杏色',
  '翠绿配天蓝',
  '靛青配淡黄'
];

const balancedDesigns = [
  '中心对称设计',
  '左右镜像排列',
  '环形均匀分布',
  '黄金比例划分',
  '对角线平衡',
  '重心稳定构图',
  '螺旋均衡排列',
  '放射状平衡设计',
  '三角形稳定结构',
  '网格化均衡布局'
];

const scalabilityTips = [
  '使用清晰的线条',
  '避免过于复杂的细节',
  '保持足够的留白',
  '选择易识别的字体',
  '确保颜色对比度',
  '使用矢量图形',
  '测试不同尺寸效果',
  '简化小尺寸版本',
  '保持主要元素突出',
  '考虑单色版本设计'
];

function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const logoDesignPrompt = `请设计一个SVG格式的logo，遵循以下设计原则和特点：

1. 视口大小：使用200x200的视口大小。

2. 渐变色背景：使用线性渐变作为背景或主要元素的填充色。可以考虑以下渐变色：
   ${getRandomElements(gradients, 3).join('\n   ')}

4. 对比色细节：考虑使用一下颜色${getRandomElements(contrastColors, 3).join('\n   ')}来绘制内部细节和轮廓。可以考虑以下对比色搭配：
   
5. 深色点缀：适当使用深色来强调某些元素。可以考虑以下深色点缀：
   ${getRandomElements(darkAccents, 3).join('\n   ')}

6. 圆角设计：对于矩形元素，考虑使用圆角（rx属性）。可以考虑以下圆角应用：
   ${getRandomElements(roundedDesigns, 3).join('\n   ')}

7. 象征性设计：通过简化的图形元素来象征特定的概念。

9. 图形平衡：确保logo的各个元素在视觉上保持平衡。可以考虑以下平衡设计：
   ${getRandomElements(balancedDesigns, 3).join('\n   ')}

10. 可扩展性：设计时考虑logo在不同尺寸下的表现。可以考虑以下可扩展设计技巧：
    ${getRandomElements(scalabilityTips, 3).join('\n    ')}

请基于以上原则和随机元素，创作一个独特、现代、富有寓意的SVG logo。logo应该简洁明了，易于识别，不包含任何文字！

在返回SVG代码之前，请先用<Design></Design>标签包裹一段简短的设计理念说明。`;

export async function POST(req: NextRequest) {
  try {
    const { logoName } = await req.json();

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: logoDesignPrompt },
        { role: 'user', content: `请为"${logoName}"设计一个logo` }
      ],
    });

    const content = response.choices[0].message.content;
    const designMatch = content.match(/<Design>([\s\S]*?)<\/Design>/);
    const designConcept = designMatch ? designMatch[1].trim() : '';
    const svgMatch = content.match(/<svg[\s\S]*<\/svg>/);
    const svgCode = svgMatch ? svgMatch[0] : '';

    if (!svgCode) {
      throw new Error('无法生成有效的 SVG');
    }

    return NextResponse.json({ svgCode, designConcept });
  } catch (error) {
    console.error('Logo design error:', error);
    return NextResponse.json({ error: 'Logo 设计失败' }, { status: 500 });
  }
}