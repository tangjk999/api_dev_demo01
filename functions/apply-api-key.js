// 模拟API Key存储（实际项目中应该使用数据库）
const apiKeys = new Map();

// 生成API Key的函数
function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'dk_';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    let email = 'anonymous@example.com';
    
    // 如果是POST请求，尝试从body中获取email
    if (event.httpMethod === 'POST' && event.body) {
      try {
        const body = JSON.parse(event.body);
        email = body.email || email;
      } catch (e) {
        // 如果解析失败，使用默认email
      }
    }
    
    // 如果是GET请求，从查询参数中获取email
    if (event.httpMethod === 'GET') {
      email = event.queryStringParameters?.email || email;
    }

    // 验证email格式（简单验证）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: '无效的邮箱地址',
          message: '请提供有效的邮箱地址'
        })
      };
    }

    // 生成新的API Key
    const newApiKey = generateApiKey();
    
    // 存储API Key信息（实际项目中应该存储到数据库）
    apiKeys.set(newApiKey, {
      email: email,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'API Key申请成功',
        apiKey: newApiKey,
        email: email,
        note: '请妥善保管您的API Key，它不会再次显示',
        usage: {
          createdAt: new Date().toISOString(),
          usageCount: 0
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