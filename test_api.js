#!/usr/bin/env node

const https = require('https');

// 测试API Key
const API_KEY = 'dk_test_1234567890abcdef1234567890abcdef';

// 模拟测试函数
async function testAPI(baseUrl) {
    console.log('🧪 开始测试API功能...');
    console.log('📍 API地址:', baseUrl);
    console.log('🔑 API Key:', API_KEY);
    console.log('='.repeat(60));

    // 测试获取狗狗品种信息
    console.log('\n🔍 测试获取金毛信息...');
    try {
        const url = `${baseUrl}/.netlify/functions/dog-breeds?breed=金毛&api_key=${API_KEY}`;
        const response = await makeRequest(url);
        
        if (response.success) {
            console.log('✅ 成功获取金毛信息');
            console.log('📝 品种名称:', response.data.name);
            console.log('🌍 原产地:', response.data.origin);
            console.log('📏 体型:', response.data.size);
            console.log('⏰ 寿命:', response.data.lifespan);
            console.log('💡 特点数量:', response.data.characteristics.length);
        } else {
            console.log('❌ 获取失败:', response.error);
        }
    } catch (error) {
        console.log('❌ 请求失败:', error.message);
    }

    // 测试申请API Key
    console.log('\n🔑 测试申请API Key...');
    try {
        const url = `${baseUrl}/.netlify/functions/apply-api-key`;
        const postData = JSON.stringify({ email: 'test@example.com' });
        const response = await makeRequest(url, 'POST', postData);
        
        if (response.success) {
            console.log('✅ API Key申请成功');
            console.log('🔑 返回的API Key:', response.apiKey);
            console.log('📧 邮箱:', response.email);
        } else {
            console.log('❌ 申请失败:', response.error);
        }
    } catch (error) {
        console.log('❌ 请求失败:', error.message);
    }

    // 测试无效API Key
    console.log('\n🚫 测试无效API Key...');
    try {
        const url = `${baseUrl}/.netlify/functions/dog-breeds?breed=金毛&api_key=invalid_key`;
        const response = await makeRequest(url);
        
        if (!response.success) {
            console.log('✅ 正确返回错误:', response.error);
        } else {
            console.log('❌ 应该返回错误但成功了');
        }
    } catch (error) {
        console.log('❌ 请求失败:', error.message);
    }

    console.log('\n🎉 测试完成！');
}

// 发送HTTP请求的辅助函数
function makeRequest(url, method = 'GET', postData = null) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'API-Tester/1.0'
            }
        };

        if (postData) {
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    resolve({ error: 'Invalid JSON response', raw: data });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (postData) {
            req.write(postData);
        }
        
        req.end();
    });
}

// 主函数
function main() {
    const baseUrl = process.argv[2];
    
    if (!baseUrl) {
        console.log('使用方法: node test_api.js <API_BASE_URL>');
        console.log('示例: node test_api.js https://your-site.netlify.app');
        return;
    }

    testAPI(baseUrl);
}

main(); 