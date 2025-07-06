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

    // 生成演示用的API Key
    const newApiKey = 'dk_test_1234567890abcdef1234567890abcdef';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'API Key申请成功',
        apiKey: newApiKey,
        email: email,
        note: '这是演示用的API Key，可以重复使用',
        usage: {
          createdAt: new Date().toISOString(),
          usageCount: '演示环境'
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