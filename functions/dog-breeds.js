// 狗狗品种数据库
const dogBreeds = {
  "金毛": {
    name: "金毛寻回犬",
    description: "金毛寻回犬是一种大型犬，性格温顺友善，非常适合家庭饲养。它们聪明、忠诚，是优秀的导盲犬和治疗犬。",
    characteristics: [
      "性格温顺友善",
      "智商很高，容易训练",
      "对儿童特别友好",
      "需要大量运动",
      "毛发需要定期梳理"
    ],
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    origin: "苏格兰",
    lifespan: "10-12年",
    size: "大型犬"
  },
  "拉布拉多": {
    name: "拉布拉多寻回犬",
    description: "拉布拉多寻回犬是最受欢迎的犬种之一，性格活泼开朗，工作能力强，是优秀的导盲犬、搜救犬和家庭伴侣犬。",
    characteristics: [
      "性格活泼开朗",
      "工作能力强",
      "对主人忠诚",
      "喜欢游泳",
      "需要充足运动"
    ],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    origin: "加拿大纽芬兰",
    lifespan: "10-14年",
    size: "大型犬"
  },
  "哈士奇": {
    name: "西伯利亚哈士奇",
    description: "哈士奇是一种中型犬，以其独特的蓝眼睛和狼般的外表而闻名。它们精力充沛，喜欢奔跑，但有时比较固执。",
    characteristics: [
      "精力充沛",
      "喜欢奔跑",
      "有时比较固执",
      "需要大量运动",
      "不适合新手饲养"
    ],
    image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop",
    origin: "西伯利亚",
    lifespan: "12-15年",
    size: "中型犬"
  },
  "柴犬": {
    name: "柴犬",
    description: "柴犬是日本最古老的犬种之一，性格独立，忠诚勇敢。它们体型小巧，适合城市生活，但需要适当的训练。",
    characteristics: [
      "性格独立",
      "忠诚勇敢",
      "体型小巧",
      "适合城市生活",
      "需要适当训练"
    ],
    image: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=300&fit=crop",
    origin: "日本",
    lifespan: "12-15年",
    size: "小型犬"
  },
  "柯基": {
    name: "威尔士柯基犬",
    description: "柯基犬以其短腿长身和可爱的外表而闻名，性格活泼，聪明机警。它们是英国女王的最爱，也是优秀的家庭犬。",
    characteristics: [
      "短腿长身",
      "性格活泼",
      "聪明机警",
      "适合家庭饲养",
      "需要适度运动"
    ],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop",
    origin: "威尔士",
    lifespan: "12-14年",
    size: "小型犬"
  },
  "边牧": {
    name: "边境牧羊犬",
    description: "边境牧羊犬被认为是世界上最聪明的犬种，工作能力强，学习能力出色。它们需要大量的精神和体力活动。",
    characteristics: [
      "世界最聪明犬种",
      "工作能力强",
      "学习能力出色",
      "需要大量活动",
      "适合有经验的饲养者"
    ],
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400&h=300&fit=crop",
    origin: "苏格兰边境",
    lifespan: "12-15年",
    size: "中型犬"
  },
  "泰迪": {
    name: "贵宾犬",
    description: "贵宾犬是一种优雅的犬种，智商很高，不掉毛，是过敏人士的理想选择。它们有多种体型，适应性强。",
    characteristics: [
      "智商很高",
      "不掉毛",
      "适合过敏人士",
      "优雅高贵",
      "适应性强"
    ],
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop",
    origin: "德国",
    lifespan: "12-15年",
    size: "小型犬"
  },
  "萨摩耶": {
    name: "萨摩耶犬",
    description: "萨摩耶犬以其雪白的毛发和'微笑'表情而闻名，性格友善，喜欢与人互动。它们是优秀的家庭伴侣犬。",
    characteristics: [
      "雪白毛发",
      "'微笑'表情",
      "性格友善",
      "喜欢与人互动",
      "需要定期梳理"
    ],
    image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop",
    origin: "西伯利亚",
    lifespan: "12-14年",
    size: "大型犬"
  }
};



exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // 处理OPTIONS请求（预检请求）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // 获取API Key
    const apiKey = event.headers['x-api-key'] || event.queryStringParameters?.api_key;
    
    // 构建有效的API Key列表（包括默认的和已申请的）
    const validApiKeys = [
      'dk_test_1234567890abcdef1234567890abcdef',
      'dk_demo_abcdef1234567890abcdef1234567890',
      ...apiKeys // 添加已申请的API Key
    ];
    
    // 使用文件系统来保存API Key使用次数和申请的API Key
    const fs = require('fs');
    const path = require('path');
    
    // 文件路径
    const usageFile = '/tmp/api_usage.json';
    const apiKeysFile = '/tmp/api_keys.json';
    
    // 读取当前使用次数
    let apiKeyUsage = {};
    try {
      if (fs.existsSync(usageFile)) {
        const data = fs.readFileSync(usageFile, 'utf8');
        apiKeyUsage = JSON.parse(data);
      }
    } catch (error) {
      console.log('读取使用次数文件失败，使用默认值');
    }
    
    // 读取已申请的API Key
    let apiKeys = [];
    try {
      if (fs.existsSync(apiKeysFile)) {
        const data = fs.readFileSync(apiKeysFile, 'utf8');
        apiKeys = JSON.parse(data);
      }
    } catch (error) {
      console.log('读取API Key文件失败，使用默认值');
    }
    
    // 初始化默认API Key使用次数
    if (!apiKeyUsage['dk_test_1234567890abcdef1234567890abcdef']) {
      apiKeyUsage['dk_test_1234567890abcdef1234567890abcdef'] = 0;
    }
    if (!apiKeyUsage['dk_demo_abcdef1234567890abcdef1234567890']) {
      apiKeyUsage['dk_demo_abcdef1234567890abcdef1234567890'] = 0;
    }
    
    // 为已申请的API Key初始化使用次数
    apiKeys.forEach(key => {
      if (!apiKeyUsage[key]) {
        apiKeyUsage[key] = 0;
      }
    });
    
    // 如果是申请API Key的请求
    if (event.path.endsWith('/apply-key') || event.queryStringParameters?.action === 'apply') {
      // 生成新的API Key
      const newApiKey = 'dk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const email = event.queryStringParameters?.email || 'anonymous@example.com';
      
      // 保存新的API Key到文件
      apiKeys.push(newApiKey);
      try {
        fs.writeFileSync(apiKeysFile, JSON.stringify(apiKeys, null, 2));
        console.log('新API Key已保存:', newApiKey);
      } catch (error) {
        console.log('保存API Key文件失败:', error.message);
      }
      
      // 初始化新API Key的使用次数
      apiKeyUsage[newApiKey] = 0;
      try {
        fs.writeFileSync(usageFile, JSON.stringify(apiKeyUsage, null, 2));
      } catch (error) {
        console.log('保存使用次数文件失败:', error.message);
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'API Key申请成功',
          apiKey: newApiKey,
          email: email,
          usage: {
            apiKey: newApiKey.substring(0, 8) + '...',
            usageCount: 0
          }
        })
      };
    }
    
    // 验证API Key
    if (!validApiKeys.includes(apiKey)) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: '无效的API Key',
          message: '请提供有效的API Key。您可以通过申请功能获取API Key。',
          availableBreeds: Object.keys(dogBreeds),
          hint: '演示环境可以使用: dk_test_1234567890abcdef1234567890abcdef'
        })
      };
    }
    
    // 增加API Key使用次数
    if (apiKeyUsage[apiKey] !== undefined) {
      apiKeyUsage[apiKey]++;
      
      // 保存更新后的使用次数到文件
      try {
        fs.writeFileSync(usageFile, JSON.stringify(apiKeyUsage, null, 2));
      } catch (error) {
        console.log('保存使用次数文件失败:', error.message);
      }
    }

    // 获取请求参数
    const { breed } = event.queryStringParameters || {};
    
    if (!breed) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: '请提供狗狗品种参数',
          availableBreeds: Object.keys(dogBreeds)
        })
      };
    }

    // 查找狗狗品种信息
    const breedInfo = dogBreeds[breed];
    
    if (!breedInfo) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: `未找到品种"${breed}"的信息`,
          availableBreeds: Object.keys(dogBreeds)
        })
      };
    }

    // 返回狗狗品种信息
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: breedInfo,
        usage: {
          apiKey: apiKey.substring(0, 8) + '...',
          usageCount: apiKeyUsage[apiKey] || 0
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: '服务器内部错误',
        message: error.message
      })
    };
  }
}; 